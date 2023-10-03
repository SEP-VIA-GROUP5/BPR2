export interface User {
  id?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  hashedPassword?: string;
  password?: string;
}
