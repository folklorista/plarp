import { User } from '@/model/user';
import { UserService } from '@/services/user.service';
import { BaseDataSource } from './base.datasource';

export class UsersDataSource extends BaseDataSource<User> {
  constructor(protected apiService: UserService) {
    super(apiService);
  }
}
