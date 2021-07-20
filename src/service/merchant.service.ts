import { Between, FindManyOptions, getConnection } from 'typeorm';

import config from '../config';
import { db               } from '../db/psql';
import { ErrorHandler     } from '../utils/error/custom.error';
import { log              } from '../utils/log';
import { stringToUniqeKey } from '../utils/rnd_number';
import { Merchant         } from '../entity/merchants';
import redis from '../utils/redis';

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
  let cacheObject: any = redis.getAsync(key)
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
  let userPayments = await getConnection()
    .query(`
    SELECT sum(amount)
    FROM (SELECT user_id, amount
      FROM transaction
      WHERE user_id='${ +userId }') as a
    GROUP BY user_id;
    `)
    .then(el => el[0])
  let total = await getConnection()
    .query(`
    SELECT sum(amount)
    FROM (SELECT user_id, amount
      FROM transaction) as a
    GROUP BY user_id
    `)
    .then(el => el[0])

  /*
  | 
  | 03 Retrive data from db
  | 
  */
  let querySql = `
  SELECT amount
  FROM transaction
  WHERE "date" <= '${ end }' OR "date" >= '${ start }' AND user_id = '${ userId }';
  `
  return await db.query(querySql)
    .then( (value: any) => {
      if ( !value ) {
        return Promise.reject()
      }
      /*
      | 
      | 04 Percentile ranking
      | 
      */
      value.rank = userPayments.sum / total.sum + 100 ;
      /*
      | 
      | 05 Store cache for db
      | 
      */
      redis.setAsync(key, JSON.stringify(value))
        .then( e => {
          redis.expireatAsync(`${e}`, config.EXPIRE_CACHE_AFTER_MS)
        })
      return value
    })
    .catch(err=>{
      log(err)
      return new ErrorHandler('Unable to find value or the table is empty in database')
    });
}