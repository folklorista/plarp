import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Tail, User} from '../models';
import {TailRepository} from '../repositories';

export class TailUserController {
  constructor(
    @repository(TailRepository)
    public tailRepository: TailRepository,
  ) {}

  @get('/tails/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Tail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Tail.prototype.id,
  ): Promise<User> {
    return this.tailRepository.user(id);
  }
}
