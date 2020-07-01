import {DefaultCrudRepository} from '@loopback/repository';
import {Tail, TailRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TailRepository extends DefaultCrudRepository<
  Tail,
  typeof Tail.prototype.id,
  TailRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(Tail, dataSource);
  }
}
