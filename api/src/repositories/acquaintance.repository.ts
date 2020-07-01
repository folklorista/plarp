import {DefaultCrudRepository} from '@loopback/repository';
import {Acquaintance, AcquaintanceRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AcquaintanceRepository extends DefaultCrudRepository<
  Acquaintance,
  typeof Acquaintance.prototype.id,
  AcquaintanceRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(Acquaintance, dataSource);
  }
}
