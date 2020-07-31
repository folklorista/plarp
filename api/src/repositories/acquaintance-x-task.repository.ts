import {DefaultCrudRepository} from '@loopback/repository';
import {AcquaintanceXTask, AcquaintanceXTaskRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AcquaintanceXTaskRepository extends DefaultCrudRepository<
  AcquaintanceXTask,
  typeof AcquaintanceXTask.prototype.id,
  AcquaintanceXTaskRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(AcquaintanceXTask, dataSource);
  }
}
