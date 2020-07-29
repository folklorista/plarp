import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Acquaintance,
  Character,
} from '../models';
import {AcquaintanceRepository} from '../repositories';

export class AcquaintanceCharacterController {
  constructor(
    @repository(AcquaintanceRepository)
    public acquaintanceRepository: AcquaintanceRepository,
  ) { }

  @get('/acquaintances/{id}/character', {
    responses: {
      '200': {
        description: 'Character belonging to Acquaintance',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Character)},
          },
        },
      },
    },
  })
  async getCharacter(
    @param.path.number('id') id: typeof Acquaintance.prototype.id,
  ): Promise<Character> {
    return this.acquaintanceRepository.character(id);
  }
}
