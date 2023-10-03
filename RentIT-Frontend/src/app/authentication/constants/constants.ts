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

export const isEmail = (email: string): boolean => {
  let regexp = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
  return regexp.test(email);
}

export const isPassword = (password: string): boolean => {
  let regexp = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
  return regexp.test(password);
}
