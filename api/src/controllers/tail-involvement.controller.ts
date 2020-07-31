import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Tail,
  Involvement,
} from '../models';
import {TailRepository} from '../repositories';

export class TailInvolvementController {
  constructor(
    @repository(TailRepository) protected tailRepository: TailRepository,
  ) { }

  @get('/tails/{id}/involvements', {
    responses: {
      '200': {
        description: 'Array of Tail has many Involvement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Involvement)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Involvement>,
  ): Promise<Involvement[]> {
    return this.tailRepository.involvements(id).find(filter);
  }

  @post('/tails/{id}/involvements', {
    responses: {
      '200': {
        description: 'Tail model instance',
        content: {'application/json': {schema: getModelSchemaRef(Involvement)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tail.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Involvement, {
            title: 'NewInvolvementInTail',
            exclude: ['id'],
            optional: ['idTail']
          }),
        },
      },
    }) involvement: Omit<Involvement, 'id'>,
  ): Promise<Involvement> {
    return this.tailRepository.involvements(id).create(involvement);
  }

  @patch('/tails/{id}/involvements', {
    responses: {
      '200': {
        description: 'Tail.Involvement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Involvement, {partial: true}),
        },
      },
    })
    involvement: Partial<Involvement>,
    @param.query.object('where', getWhereSchemaFor(Involvement)) where?: Where<Involvement>,
  ): Promise<Count> {
    return this.tailRepository.involvements(id).patch(involvement, where);
  }

  @del('/tails/{id}/involvements', {
    responses: {
      '200': {
        description: 'Tail.Involvement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Involvement)) where?: Where<Involvement>,
  ): Promise<Count> {
    return this.tailRepository.involvements(id).delete(where);
  }
}
