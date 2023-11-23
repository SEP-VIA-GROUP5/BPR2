import {User} from "src/model/user";
import {UserContent} from "src/app/authentication/constants/constants";

export function convertToUserFromUserContent(userContent: UserContent): User {
  return {
    email: userContent.email,
    firstName: userContent.firstName,
    lastName: userContent.lastName,
    location: userContent.location,
    password: userContent.password,
    phoneNumber: userContent.phoneNumber,
  }
}
