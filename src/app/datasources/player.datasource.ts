import { Player } from '@/model/player';
import { PlayerService } from '@/services/player.service';
import { BaseDataSource } from './base.datasource';

export class PlayersDataSource extends BaseDataSource<Player> {
  constructor(protected apiService: PlayerService) {
    super(apiService);
  }
}
