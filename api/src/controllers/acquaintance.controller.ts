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
import {Acquaintance} from '../models';
import {AcquaintanceRepository} from '../repositories';

export class AcquaintanceController {
  constructor(
    @repository(AcquaintanceRepository)
    public acquaintanceRepository: AcquaintanceRepository,
  ) {}

  @post('/acquaintances', {
    responses: {
      '200': {
        description: 'Acquaintance model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Acquaintance)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acquaintance, {
            title: 'NewAcquaintance',
            exclude: ['id'],
          }),
        },
      },
    })
    acquaintance: Omit<Acquaintance, 'id'>,
  ): Promise<Acquaintance> {
    return this.acquaintanceRepository.create(acquaintance);
  }

  @get('/acquaintances/count', {
    responses: {
      '200': {
        description: 'Acquaintance model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Acquaintance) where?: Where<Acquaintance>,
  ): Promise<Count> {
    return this.acquaintanceRepository.count(where);
  }

  @get('/acquaintances', {
    responses: {
      '200': {
        description: 'Array of Acquaintance model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Acquaintance, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Acquaintance) filter?: Filter<Acquaintance>,
  ): Promise<Acquaintance[]> {
    return this.acquaintanceRepository.find(filter);
  }

  @patch('/acquaintances', {
    responses: {
      '200': {
        description: 'Acquaintance PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acquaintance, {partial: true}),
        },
      },
    })
    acquaintance: Acquaintance,
    @param.where(Acquaintance) where?: Where<Acquaintance>,
  ): Promise<Count> {
    return this.acquaintanceRepository.updateAll(acquaintance, where);
  }

  @get('/acquaintances/{id}', {
    responses: {
      '200': {
        description: 'Acquaintance model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Acquaintance, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Acquaintance, {exclude: 'where'})
    filter?: FilterExcludingWhere<Acquaintance>,
  ): Promise<Acquaintance> {
    return this.acquaintanceRepository.findById(id, filter);
  }

  @patch('/acquaintances/{id}', {
    responses: {
      '204': {
        description: 'Acquaintance PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acquaintance, {partial: true}),
        },
      },
    })
    acquaintance: Acquaintance,
  ): Promise<void> {
    await this.acquaintanceRepository.updateById(id, acquaintance);
  }

  @put('/acquaintances/{id}', {
    responses: {
      '204': {
        description: 'Acquaintance PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() acquaintance: Acquaintance,
  ): Promise<void> {
    await this.acquaintanceRepository.replaceById(id, acquaintance);
  }

  @del('/acquaintances/{id}', {
    responses: {
      '204': {
        description: 'Acquaintance DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.acquaintanceRepository.deleteById(id);
  }
}
