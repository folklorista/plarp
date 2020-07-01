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
import {Quality} from '../models';
import {QualityRepository} from '../repositories';

export class QualityController {
  constructor(
    @repository(QualityRepository)
    public qualityRepository: QualityRepository,
  ) {}

  @post('/qualities', {
    responses: {
      '200': {
        description: 'Quality model instance',
        content: {'application/json': {schema: getModelSchemaRef(Quality)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quality, {
            title: 'NewQuality',
            exclude: ['id'],
          }),
        },
      },
    })
    quality: Omit<Quality, 'id'>,
  ): Promise<Quality> {
    return this.qualityRepository.create(quality);
  }

  @get('/qualities/count', {
    responses: {
      '200': {
        description: 'Quality model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Quality) where?: Where<Quality>): Promise<Count> {
    return this.qualityRepository.count(where);
  }

  @get('/qualities', {
    responses: {
      '200': {
        description: 'Array of Quality model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Quality, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Quality) filter?: Filter<Quality>,
  ): Promise<Quality[]> {
    return this.qualityRepository.find(filter);
  }

  @patch('/qualities', {
    responses: {
      '200': {
        description: 'Quality PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quality, {partial: true}),
        },
      },
    })
    quality: Quality,
    @param.where(Quality) where?: Where<Quality>,
  ): Promise<Count> {
    return this.qualityRepository.updateAll(quality, where);
  }

  @get('/qualities/{id}', {
    responses: {
      '200': {
        description: 'Quality model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Quality, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Quality, {exclude: 'where'})
    filter?: FilterExcludingWhere<Quality>,
  ): Promise<Quality> {
    return this.qualityRepository.findById(id, filter);
  }

  @patch('/qualities/{id}', {
    responses: {
      '204': {
        description: 'Quality PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quality, {partial: true}),
        },
      },
    })
    quality: Quality,
  ): Promise<void> {
    await this.qualityRepository.updateById(id, quality);
  }

  @put('/qualities/{id}', {
    responses: {
      '204': {
        description: 'Quality PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() quality: Quality,
  ): Promise<void> {
    await this.qualityRepository.replaceById(id, quality);
  }

  @del('/qualities/{id}', {
    responses: {
      '204': {
        description: 'Quality DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.qualityRepository.deleteById(id);
  }
}
