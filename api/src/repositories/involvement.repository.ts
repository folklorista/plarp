import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Involvement, InvolvementRelations, Character, Tail} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CharacterRepository} from './character.repository';
import {TailRepository} from './tail.repository';

export class InvolvementRepository extends DefaultCrudRepository<
  Involvement,
  typeof Involvement.prototype.id,
  InvolvementRelations
> {

  public readonly character: BelongsToAccessor<Character, typeof Involvement.prototype.id>;

  public readonly tail: BelongsToAccessor<Tail, typeof Involvement.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('CharacterRepository') protected characterRepositoryGetter: Getter<CharacterRepository>, @repository.getter('TailRepository') protected tailRepositoryGetter: Getter<TailRepository>,
  ) {
    super(Involvement, dataSource);
    this.tail = this.createBelongsToAccessorFor('tail', tailRepositoryGetter,);
    this.registerInclusionResolver('tail', this.tail.inclusionResolver);
    this.character = this.createBelongsToAccessorFor('character', characterRepositoryGetter,);
    this.registerInclusionResolver('character', this.character.inclusionResolver);
  }
}
