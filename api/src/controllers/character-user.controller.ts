import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Character, User} from '../models';
import {CharacterRepository} from '../repositories';

export class CharacterUserController {
  constructor(
    @repository(CharacterRepository)
    public characterRepository: CharacterRepository,
  ) {}

  @get('/characters/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Character',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Character.prototype.id,
  ): Promise<User> {
    return this.characterRepository.user(id);
  }
}
