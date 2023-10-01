import {User} from "src/model/user";

export interface UserContent extends User {
  repeatPassword: string,
}

export const defaultUserContent = () : UserContent => {
  return {
    email: '',
    password: '',
    repeatPassword: '',
    lastName: '',
    firstName: '',
    location: '',
  }
}
