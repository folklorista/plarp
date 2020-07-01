import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Involvement} from '../models';
import {InvolvementRepository} from '../repositories';

export class InvolvementController {
  constructor(
    @repository(InvolvementRepository)
    public involvementRepository: InvolvementRepository,
  ) {}

  @post('/involvements', {
    responses: {
      '200': {
        description: 'Involvement model instance',
        content: {'application/json': {schema: getModelSchemaRef(Involvement)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Involvement, {
            title: 'NewInvolvement',
            exclude: ['id'],
          }),
        },
      },
    })
    involvement: Omit<Involvement, 'id'>,
  ): Promise<Involvement> {
    return this.involvementRepository.create(involvement);
  }

  @get('/involvements/count', {
    responses: {
      '200': {
        description: 'Involvement model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Involvement) where?: Where<Involvement>,
  ): Promise<Count> {
    return this.involvementRepository.count(where);
  }

  @get('/involvements', {
    responses: {
      '200': {
        description: 'Array of Involvement model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Involvement, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Involvement) filter?: Filter<Involvement>,
  ): Promise<Involvement[]> {
    return this.involvementRepository.find(filter);
  }

  @patch('/involvements', {
    responses: {
      '200': {
        description: 'Involvement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Involvement, {partial: true}),
        },
      },
    })
    involvement: Involvement,
    @param.where(Involvement) where?: Where<Involvement>,
  ): Promise<Count> {
    return this.involvementRepository.updateAll(involvement, where);
  }

  @get('/involvements/{id}', {
    responses: {
      '200': {
        description: 'Involvement model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Involvement, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Involvement, {exclude: 'where'})
    filter?: FilterExcludingWhere<Involvement>,
  ): Promise<Involvement> {
    return this.involvementRepository.findById(id, filter);
  }

  @patch('/involvements/{id}', {
    responses: {
      '204': {
        description: 'Involvement PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Involvement, {partial: true}),
        },
      },
    })
    involvement: Involvement,
  ): Promise<void> {
    await this.involvementRepository.updateById(id, involvement);
  }

  @put('/involvements/{id}', {
    responses: {
      '204': {
        description: 'Involvement PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() involvement: Involvement,
  ): Promise<void> {
    await this.involvementRepository.replaceById(id, involvement);
  }

  @del('/involvements/{id}', {
    responses: {
      '204': {
        description: 'Involvement DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.involvementRepository.deleteById(id);
  }
}
