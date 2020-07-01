import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {CharacterXProp, Character} from '../models';
import {CharacterXPropRepository} from '../repositories';

export class CharacterXPropCharacterController {
  constructor(
    @repository(CharacterXPropRepository)
    public characterXPropRepository: CharacterXPropRepository,
  ) {}

  @get('/character-x-props/{id}/character', {
    responses: {
      '200': {
        description: 'Character belonging to CharacterXProp',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Character)},
          },
        },
      },
    },
  })
  async getCharacter(
    @param.path.number('id') id: typeof CharacterXProp.prototype.id,
  ): Promise<Character> {
    return this.characterXPropRepository.character(id);
  }
}
