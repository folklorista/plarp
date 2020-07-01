import {DefaultCrudRepository} from '@loopback/repository';
import {Participation, ParticipationRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParticipationRepository extends DefaultCrudRepository<
  Participation,
  typeof Participation.prototype.id,
  ParticipationRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(Participation, dataSource);
  }
}
