export class UserRequestDto {
  id: string | number;
  time: string;
  constructor(id: string | number, time: string) {
    this.id = id;
    this.time = time;
  }
}

export class UserResponseDto {
  id?: string;
  first_name?: string;
  last_name?: string;
}