import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Prop, User} from '../models';
import {PropRepository} from '../repositories';

export class PropUserController {
  constructor(
    @repository(PropRepository)
    public propRepository: PropRepository,
  ) {}

  @get('/props/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Prop',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Prop.prototype.id,
  ): Promise<User> {
    return this.propRepository.user(id);
  }
}
