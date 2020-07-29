import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Acquaintance, AcquaintanceRelations, Character} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CharacterRepository} from './character.repository';

export class AcquaintanceRepository extends DefaultCrudRepository<
  Acquaintance,
  typeof Acquaintance.prototype.id,
  AcquaintanceRelations
> {

  public readonly character: BelongsToAccessor<Character, typeof Acquaintance.prototype.id>;

  public readonly object: BelongsToAccessor<Character, typeof Acquaintance.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('CharacterRepository') protected characterRepositoryGetter: Getter<CharacterRepository>,
  ) {
    super(Acquaintance, dataSource);
    this.object = this.createBelongsToAccessorFor('object', characterRepositoryGetter,);
    this.registerInclusionResolver('object', this.object.inclusionResolver);
    this.character = this.createBelongsToAccessorFor('character', characterRepositoryGetter,);
    this.registerInclusionResolver('character', this.character.inclusionResolver);
  }
}
