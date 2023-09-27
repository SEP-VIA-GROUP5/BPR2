import {User} from "src/model/user";

export const defaultUserContent = () : User => {
  return {
    username: '',
    email: undefined,
    password: '',
    fullName: undefined,
    location: undefined
  }
}
