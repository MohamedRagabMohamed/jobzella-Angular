import { Role } from './role';

export class User {
  id?: number;
  username?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  token?: string;
  tokenType?: string;
  roles?: Role[]; // TODO: add privilege for every user to be able to control his/her role in the system
}
