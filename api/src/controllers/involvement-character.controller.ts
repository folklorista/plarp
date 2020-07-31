import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Involvement,
  Character,
} from '../models';
import {InvolvementRepository} from '../repositories';

export class InvolvementCharacterController {
  constructor(
    @repository(InvolvementRepository)
    public involvementRepository: InvolvementRepository,
  ) { }

  @get('/involvements/{id}/character', {
    responses: {
      '200': {
        description: 'Character belonging to Involvement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Character)},
          },
        },
      },
    },
  })
  async getCharacter(
    @param.path.number('id') id: typeof Involvement.prototype.id,
  ): Promise<Character> {
    return this.involvementRepository.character(id);
  }
}
