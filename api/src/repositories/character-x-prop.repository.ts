import {DefaultCrudRepository} from '@loopback/repository';
import {CharacterXProp, CharacterXPropRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CharacterXPropRepository extends DefaultCrudRepository<
  CharacterXProp,
  typeof CharacterXProp.prototype.id,
  CharacterXPropRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(CharacterXProp, dataSource);
  }
}
