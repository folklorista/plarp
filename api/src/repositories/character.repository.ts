import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Character, CharacterRelations, CharacterXProp} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CharacterXPropRepository} from './character-x-prop.repository';

export class CharacterRepository extends DefaultCrudRepository<
  Character,
  typeof Character.prototype.id,
  CharacterRelations
> {

  public readonly characterXPropArray: HasManyRepositoryFactory<CharacterXProp, typeof Character.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('CharacterXPropRepository') protected characterXPropRepositoryGetter: Getter<CharacterXPropRepository>,
  ) {
    super(Character, dataSource);
    this.characterXPropArray = this.createHasManyRepositoryFactoryFor('characterXPropArray', characterXPropRepositoryGetter,);
    this.registerInclusionResolver('characterXPropArray', this.characterXPropArray.inclusionResolver);
  }
}
