import { Base } from './base';

export interface User extends Base {
  firstName: string;
  surname: string;
  username: string;
  password: string;
  adminLevel: string;
}
