import { db } from "../db/psql";
import { object, string } from 'joi'
import { User } from "../entity/users";
import { FindOneOptions } from "typeorm";

/**
 * @param  {string|number} userId
 * @param  {string} time
 * @returns Promise
 */
export async function findUserById(userId: string | number, time: string): Promise<User|null|undefined>{
  if ( !userId ) {
    return null;
  }
  if ( !time ) {
    return null;
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
  if ( !isRequestValid ) return null
  let options: FindOneOptions<User> = {
    select: ['lastName']
  }
  return await db.getRepository(User).findOne(userId, options);
}