import { object, string } from 'joi'
import { FindOneOptions } from "typeorm";

import { db } from "../db/psql";
import { User } from "../entity/users";
import { ErrorHandler } from "../utils/error/custom.error";
import { log } from '../utils/log';

/**
 * @param  {string|number} userId
 * @param  {string} time
 * @returns Promise
 */
export async function findUserById(userId: string | number, time: string): Promise<User|ErrorHandler>{
  /*
  | 
  | 01 Validating incoming request
  | 
  */
  if ( !userId ) {
    return new ErrorHandler('UserId is empty');
  }
  if ( !time ) {
    return new ErrorHandler('Time period is empty');
  }
  const schema = object({
    id: string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    time: string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
  })
  let isRequestValid = schema.valid()
  if ( !isRequestValid ) return new ErrorHandler('Schema is invalid');

  /*
  | 
  | 02 Validation process
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
      return value
    })
    .catch(err=>{
      log(err)
      return new ErrorHandler('Unable to find value or the table is empty in database')
    });
}