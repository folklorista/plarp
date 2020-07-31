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
  Player,
} from '../models';
import {PlayerXQualityRepository} from '../repositories';

export class PlayerXQualityPlayerController {
  constructor(
    @repository(PlayerXQualityRepository)
    public playerXQualityRepository: PlayerXQualityRepository,
  ) { }

  @get('/player-x-qualities/{id}/player', {
    responses: {
      '200': {
        description: 'Player belonging to PlayerXQuality',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Player)},
          },
        },
      },
    },
  })
  async getPlayer(
    @param.path.number('id') id: typeof PlayerXQuality.prototype.id,
  ): Promise<Player> {
    return this.playerXQualityRepository.player(id);
  }
}
