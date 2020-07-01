import {DefaultCrudRepository} from '@loopback/repository';
import {TailXProp, TailXPropRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TailXPropRepository extends DefaultCrudRepository<
  TailXProp,
  typeof TailXProp.prototype.id,
  TailXPropRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(TailXProp, dataSource);
  }
}
