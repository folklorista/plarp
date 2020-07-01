import {DefaultCrudRepository} from '@loopback/repository';
import {Involvement, InvolvementRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InvolvementRepository extends DefaultCrudRepository<
  Involvement,
  typeof Involvement.prototype.id,
  InvolvementRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(Involvement, dataSource);
  }
}
