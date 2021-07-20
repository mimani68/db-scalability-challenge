export function getUserDetails(call: any) {
  call.on('data', function(note: any) {
    call.write(note);
  });
  call.on('end', function() {
    call.end();
  });
}