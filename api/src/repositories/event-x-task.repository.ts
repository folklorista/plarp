import {DefaultCrudRepository} from '@loopback/repository';
import {EventXTask, EventXTaskRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EventXTaskRepository extends DefaultCrudRepository<
  EventXTask,
  typeof EventXTask.prototype.id,
  EventXTaskRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(EventXTask, dataSource);
  }
}
