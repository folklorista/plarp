import {DefaultCrudRepository} from '@loopback/repository';
import {Event, EventRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(Event, dataSource);
  }
}
