import {User} from "src/model/user";

export interface UserContent extends User {
  repeatPassword: string,
}

export const defaultUserContent = () : UserContent => {
  return {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    fullName: '',
    location: '',
  }
}
