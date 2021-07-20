import md5 from 'md5';

export function stringToUniqeKey(tag: string, userId: any, time: any): string {
  return md5(`${ tag }-${ userId }/${ time }`);
}