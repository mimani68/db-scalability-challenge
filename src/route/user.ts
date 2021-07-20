import { findUserById } from "../service/user.service";
import { UserRequestDto } from "../dto/user_detail.dto";

export function getUserDetails(call: any) {
  call.on('data', async function(req: UserRequestDto) {
    if ( !req.id ) {
      call.write({
        message: 'User details in necessory'
      })
    }
    if ( !req.time ) {
      call.write({
        message: 'Time peroid in necessory'
      })
    }
    let e = await findUserById(12);
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