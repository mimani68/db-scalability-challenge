export function getUserDetails(call: any) {
  call.on('data', function(note: any) {
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