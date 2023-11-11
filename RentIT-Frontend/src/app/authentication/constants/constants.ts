import {User} from "src/model/user";

export interface UserContent extends User {
  repeatPassword: string,
}

export const defaultUserContent = (): UserContent => {
  return {
    email: '',
    phoneNumber: '',
    password: '',
    repeatPassword: '',
    lastName: '',
    firstName: '',
    location: '',
  }
}

