import {DefaultCrudRepository} from '@loopback/repository';
import {PropXTask, PropXTaskRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PropXTaskRepository extends DefaultCrudRepository<
  PropXTask,
  typeof PropXTask.prototype.id,
  PropXTaskRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(PropXTask, dataSource);
  }
}
