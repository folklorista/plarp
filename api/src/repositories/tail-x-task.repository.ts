import {DefaultCrudRepository} from '@loopback/repository';
import {TailXTask, TailXTaskRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TailXTaskRepository extends DefaultCrudRepository<
  TailXTask,
  typeof TailXTask.prototype.id,
  TailXTaskRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(TailXTask, dataSource);
  }
}
