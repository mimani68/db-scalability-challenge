import { Between, FindManyOptions, getConnection } from 'typeorm';

import config from '../config';
import { db               } from '../db/psql';
import { ErrorHandler     } from '../utils/error/custom.error';
import { log              } from '../utils/log';
import { stringToUniqeKey } from '../utils/rnd_number';
import { Merchant         } from '../entity/merchants';
import { expireatAsync, getAsync, setAsync } from '../utils/redis';
import { Transaction } from '../entity/tx';

/**
 * @param  {string|number} userId
 * @param  {string} time
 * @returns Promise
 */
export async function findMerchantsListInPeriod(userId: string | number, start: string, end: string): Promise<Merchant|ErrorHandler>{
  /*
  | 
  | 01 Retrive data from cache
  | 
  */  
  let key: string = stringToUniqeKey('mer', userId, start + '/' + end)
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
  | 02 The percentile ranking against all other users over that same time period
  | 
  */
  let percentileValueRanking = await getConnection()
      .getRepository(Transaction)
      .createQueryBuilder('typeOne')
      .addSelect('sum (amount) as total')
      .where('typeOne.user_id= :id', { id: userId })
      .getOne();

  /*
  | 
  | 03 Retrive data from db
  | 
  */
  let optionAllMerchantList: FindManyOptions<Merchant> = {
    where: {
      transactions: {
        user_id: userId,
        date: Between(start, end)
      }
    },
    lock: { mode: "optimistic", version: 1 }
  }
  return await db.getRepository(Merchant).find(optionAllMerchantList)
    .then( (value: any) => {
      if ( !value ) {
        return Promise.reject()
      }
      /*
      | 
      | 04 Percentile ranking
      | 
      */
      value.rank = percentileValueRanking;
      /*
      | 
      | 05 Store cache for db
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