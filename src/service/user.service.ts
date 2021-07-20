import { FindOneOptions } from 'typeorm';

import config from '../config';
import { db               } from '../db/psql';
import { User             } from '../entity/users';
import { ErrorHandler     } from '../utils/error/custom.error';
import { log              } from '../utils/log';
import { stringToUniqeKey } from '../utils/rnd_number';
import { expireatAsync, getAsync, setAsync } from '../utils/redis';

/**
 * @param  {string|number} userId
 * @param  {string} time
 * @returns Promise
 */
export async function findUserById(userId: string | number, time: string): Promise<User|ErrorHandler>{
  /*
  | 
  | 01 Retrive data from cache
  | 
  */  
  let key: string = stringToUniqeKey(userId, time)
  let cacheObject: any = getAsync(key)
  try {
    let value = JSON.parse(cacheObject)
    log('Loading cache value with key [' + key + ']')
    log(value)
    return value
  } catch (error) {
    log('The key with value [' + key + '] is not exists in cache')
  }

  /*
  | 
  | 02 Retrive data from db
  | 
  */
  let options: FindOneOptions<User> = {
    select: ['lastName']
  }
  return await db.getRepository(User).findOne(userId, options)
    .then( (value: any) => {
      if ( !value ) {
        return Promise.reject()
      }
      /*
      | 
      | 03 Store cache for db
      | 
      */
      setAsync(key, JSON.stringify(value))
        .then( e => {
          expireatAsync(`${e}`, config.EXPIRE_CACHE_AFTER_MS)
        })
      return value
    })
    .catch(err=>{
      log(err)
      return new ErrorHandler('Unable to find value or the table is empty in database')
    });
}