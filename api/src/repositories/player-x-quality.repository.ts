import {DefaultCrudRepository} from '@loopback/repository';
import {PlayerXQuality, PlayerXQualityRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlayerXQualityRepository extends DefaultCrudRepository<
  PlayerXQuality,
  typeof PlayerXQuality.prototype.id,
  PlayerXQualityRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(PlayerXQuality, dataSource);
  }
}
