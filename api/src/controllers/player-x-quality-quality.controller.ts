import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PlayerXQuality,
  Quality,
} from '../models';
import {PlayerXQualityRepository} from '../repositories';

export class PlayerXQualityQualityController {
  constructor(
    @repository(PlayerXQualityRepository)
    public playerXQualityRepository: PlayerXQualityRepository,
  ) { }

  @get('/player-x-qualities/{id}/quality', {
    responses: {
      '200': {
        description: 'Quality belonging to PlayerXQuality',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Quality)},
          },
        },
      },
    },
  })
  async getQuality(
    @param.path.number('id') id: typeof PlayerXQuality.prototype.id,
  ): Promise<Quality> {
    return this.playerXQualityRepository.quality(id);
  }
}
