import { findUserById } from "../service/user.service";
import { UserRequestDto } from "../dto/user_detail.dto";

export function getUserDetails(call: any) {
  call.on('data', async function(req: UserRequestDto) {
    /*
    | 
    | 01 Validating incoming request
    | 
    */
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
    // let e = await findUserById(req.id, req.time);
    call.write({
      data: {
        firstname: 'reza',
        lastname: 'imani',
        status: 'ACTIVE'
      },
      message: 'salam'
    });
  });
  call.on('end', function() {
    call.end();
  });
}