import { db } from "../db/psql";
import { User } from "../entity/users";

export function getUserDetails(call: any) {
  call.on('data', async function(note: any) {
    let e = await db.getRepository(User).find();
    console.log('[debug]', e)
    call.write({
      location: {
        latitude: 12,
        longitude: 12
      },
      message: 'salam'
    });
  });
  call.on('end', function() {
    call.end();
  });
}