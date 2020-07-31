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
  Tail,
} from '../models';
import {InvolvementRepository} from '../repositories';

export class InvolvementTailController {
  constructor(
    @repository(InvolvementRepository)
    public involvementRepository: InvolvementRepository,
  ) { }

  @get('/involvements/{id}/tail', {
    responses: {
      '200': {
        description: 'Tail belonging to Involvement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tail)},
          },
        },
      },
    },
  })
  async getTail(
    @param.path.number('id') id: typeof Involvement.prototype.id,
  ): Promise<Tail> {
    return this.involvementRepository.tail(id);
  }
}
