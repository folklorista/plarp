import {DefaultCrudRepository} from '@loopback/repository';
import {AcquintanceXTask, AcquintanceXTaskRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AcquintanceXTaskRepository extends DefaultCrudRepository<
  AcquintanceXTask,
  typeof AcquintanceXTask.prototype.id,
  AcquintanceXTaskRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(AcquintanceXTask, dataSource);
  }
}
