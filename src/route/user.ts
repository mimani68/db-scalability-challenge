import { object, string } from "joi";

import { UserRequestDto } from "../dto/user_detail.dto";
import { findUserById   } from "../service/user.service";

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
    /*
    | 
    | 02 Validating request schema and minimum requirements
    | 
    */
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
    if ( !isRequestValid ) {
      call.write({
        message: 'Request data schema is invalid'
      })
    }
    /*
    | 
    | 03 Gathering data by service
    | 
    */
    let data = await findUserById(req.id, req.time);
    call.write({
      data,
      message: 'salam'
    });
  });
  call.on('end', function() {
    call.end();
  });
}