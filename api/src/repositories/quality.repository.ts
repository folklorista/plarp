import {DefaultCrudRepository} from '@loopback/repository';
import {Quality, QualityRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class QualityRepository extends DefaultCrudRepository<
  Quality,
  typeof Quality.prototype.id,
  QualityRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(Quality, dataSource);
  }
}
