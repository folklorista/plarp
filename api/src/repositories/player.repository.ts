import {DefaultCrudRepository} from '@loopback/repository';
import {Player, PlayerRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(Player, dataSource);
  }
}
