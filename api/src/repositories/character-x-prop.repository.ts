import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {
  CharacterXProp,
  CharacterXPropRelations,
  Prop,
  Character,
} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PropRepository} from './prop.repository';
import {CharacterRepository} from './character.repository';

export class CharacterXPropRepository extends DefaultCrudRepository<
  CharacterXProp,
  typeof CharacterXProp.prototype.id,
  CharacterXPropRelations
> {
  public readonly prop: BelongsToAccessor<
    Prop,
    typeof CharacterXProp.prototype.id
  >;

  public readonly character: BelongsToAccessor<
    Character,
    typeof CharacterXProp.prototype.id
  >;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
    @repository.getter('PropRepository')
    protected propRepositoryGetter: Getter<PropRepository>,
    @repository.getter('CharacterRepository')
    protected characterRepositoryGetter: Getter<CharacterRepository>,
  ) {
    super(CharacterXProp, dataSource);
    this.character = this.createBelongsToAccessorFor(
      'character',
      characterRepositoryGetter,
    );
    this.registerInclusionResolver(
      'character',
      this.character.inclusionResolver,
    );
    this.prop = this.createBelongsToAccessorFor('prop', propRepositoryGetter);
    this.registerInclusionResolver('prop', this.prop.inclusionResolver);
  }
}
