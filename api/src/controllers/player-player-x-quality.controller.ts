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
  Player,
  PlayerXQuality,
} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerPlayerXQualityController {
  constructor(
    @repository(PlayerRepository) protected playerRepository: PlayerRepository,
  ) { }

  @get('/players/{id}/player-x-qualities', {
    responses: {
      '200': {
        description: 'Array of Player has many PlayerXQuality',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PlayerXQuality)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PlayerXQuality>,
  ): Promise<PlayerXQuality[]> {
    return this.playerRepository.xQuality(id).find(filter);
  }

  @post('/players/{id}/player-x-qualities', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(PlayerXQuality)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Player.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlayerXQuality, {
            title: 'NewPlayerXQualityInPlayer',
            exclude: ['id'],
            optional: ['idPlayer']
          }),
        },
      },
    }) playerXQuality: Omit<PlayerXQuality, 'id'>,
  ): Promise<PlayerXQuality> {
    return this.playerRepository.xQuality(id).create(playerXQuality);
  }

  @patch('/players/{id}/player-x-qualities', {
    responses: {
      '200': {
        description: 'Player.PlayerXQuality PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlayerXQuality, {partial: true}),
        },
      },
    })
    playerXQuality: Partial<PlayerXQuality>,
    @param.query.object('where', getWhereSchemaFor(PlayerXQuality)) where?: Where<PlayerXQuality>,
  ): Promise<Count> {
    return this.playerRepository.xQuality(id).patch(playerXQuality, where);
  }

  @del('/players/{id}/player-x-qualities', {
    responses: {
      '200': {
        description: 'Player.PlayerXQuality DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PlayerXQuality)) where?: Where<PlayerXQuality>,
  ): Promise<Count> {
    return this.playerRepository.xQuality(id).delete(where);
  }
}
