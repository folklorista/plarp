import {DefaultCrudRepository} from '@loopback/repository';
import {CharacterXTask, CharacterXTaskRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CharacterXTaskRepository extends DefaultCrudRepository<
  CharacterXTask,
  typeof CharacterXTask.prototype.id,
  CharacterXTaskRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(CharacterXTask, dataSource);
  }
}
