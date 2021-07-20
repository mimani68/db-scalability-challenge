import md5 from 'md5';

export function stringToUniqeKey(userId: any, time: any): string {
  return md5(`user-${ userId }/${ time }`);
}