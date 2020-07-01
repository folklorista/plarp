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
import {PlayerXQuality} from '../models';
import {PlayerXQualityRepository} from '../repositories';

export class PlayerXQualityController {
  constructor(
    @repository(PlayerXQualityRepository)
    public playerXQualityRepository: PlayerXQualityRepository,
  ) {}

  @post('/player-x-qualities', {
    responses: {
      '200': {
        description: 'PlayerXQuality model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(PlayerXQuality)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlayerXQuality, {
            title: 'NewPlayerXQuality',
            exclude: ['id'],
          }),
        },
      },
    })
    playerXQuality: Omit<PlayerXQuality, 'id'>,
  ): Promise<PlayerXQuality> {
    return this.playerXQualityRepository.create(playerXQuality);
  }

  @get('/player-x-qualities/count', {
    responses: {
      '200': {
        description: 'PlayerXQuality model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PlayerXQuality) where?: Where<PlayerXQuality>,
  ): Promise<Count> {
    return this.playerXQualityRepository.count(where);
  }

  @get('/player-x-qualities', {
    responses: {
      '200': {
        description: 'Array of PlayerXQuality model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PlayerXQuality, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PlayerXQuality) filter?: Filter<PlayerXQuality>,
  ): Promise<PlayerXQuality[]> {
    return this.playerXQualityRepository.find(filter);
  }

  @patch('/player-x-qualities', {
    responses: {
      '200': {
        description: 'PlayerXQuality PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlayerXQuality, {partial: true}),
        },
      },
    })
    playerXQuality: PlayerXQuality,
    @param.where(PlayerXQuality) where?: Where<PlayerXQuality>,
  ): Promise<Count> {
    return this.playerXQualityRepository.updateAll(playerXQuality, where);
  }

  @get('/player-x-qualities/{id}', {
    responses: {
      '200': {
        description: 'PlayerXQuality model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PlayerXQuality, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PlayerXQuality, {exclude: 'where'})
    filter?: FilterExcludingWhere<PlayerXQuality>,
  ): Promise<PlayerXQuality> {
    return this.playerXQualityRepository.findById(id, filter);
  }

  @patch('/player-x-qualities/{id}', {
    responses: {
      '204': {
        description: 'PlayerXQuality PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlayerXQuality, {partial: true}),
        },
      },
    })
    playerXQuality: PlayerXQuality,
  ): Promise<void> {
    await this.playerXQualityRepository.updateById(id, playerXQuality);
  }

  @put('/player-x-qualities/{id}', {
    responses: {
      '204': {
        description: 'PlayerXQuality PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() playerXQuality: PlayerXQuality,
  ): Promise<void> {
    await this.playerXQualityRepository.replaceById(id, playerXQuality);
  }

  @del('/player-x-qualities/{id}', {
    responses: {
      '204': {
        description: 'PlayerXQuality DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.playerXQualityRepository.deleteById(id);
  }
}
