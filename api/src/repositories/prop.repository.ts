import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Prop, PropRelations, CharacterXProp} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CharacterXPropRepository} from './character-x-prop.repository';

export class PropRepository extends DefaultCrudRepository<
  Prop,
  typeof Prop.prototype.id,
  PropRelations
> {

  public readonly characterXPropArray: HasManyRepositoryFactory<CharacterXProp, typeof Prop.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('CharacterXPropRepository') protected characterXPropRepositoryGetter: Getter<CharacterXPropRepository>,
  ) {
    super(Prop, dataSource);
    this.characterXPropArray = this.createHasManyRepositoryFactoryFor('characterXPropArray', characterXPropRepositoryGetter,);
    this.registerInclusionResolver('characterXPropArray', this.characterXPropArray.inclusionResolver);
  }
}
