import {DefaultCrudRepository} from '@loopback/repository';
import {Prop, PropRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PropRepository extends DefaultCrudRepository<
  Prop,
  typeof Prop.prototype.id,
  PropRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(Prop, dataSource);
  }
}
