import {DefaultCrudRepository} from '@loopback/repository';
import {Character, CharacterRelations} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CharacterRepository extends DefaultCrudRepository<
  Character,
  typeof Character.prototype.id,
  CharacterRelations
> {
  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
  ) {
    super(Character, dataSource);
  }
}
