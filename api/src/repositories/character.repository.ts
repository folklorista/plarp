import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {Character, CharacterRelations, CharacterXProp, User, Player, Acquaintance, Involvement} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CharacterXPropRepository} from './character-x-prop.repository';
import {UserRepository} from './user.repository';
import {PlayerRepository} from './player.repository';
import {AcquaintanceRepository} from './acquaintance.repository';
import {InvolvementRepository} from './involvement.repository';

export class CharacterRepository extends DefaultCrudRepository<
  Character,
  typeof Character.prototype.id,
  CharacterRelations
> {

  public readonly characterXPropArray: HasManyRepositoryFactory<CharacterXProp, typeof Character.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Character.prototype.id>;

  public readonly player: HasOneRepositoryFactory<Player, typeof Character.prototype.id>;

  public readonly acquaintances: HasManyRepositoryFactory<Acquaintance, typeof Character.prototype.id>;

  public readonly acquaintancesAsObject: HasManyRepositoryFactory<Acquaintance, typeof Character.prototype.id>;

  public readonly involvements: HasManyRepositoryFactory<Involvement, typeof Character.prototype.id>;

  public readonly xProps: HasManyRepositoryFactory<CharacterXProp, typeof Character.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('CharacterXPropRepository') protected characterXPropRepositoryGetter: Getter<CharacterXPropRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>, @repository.getter('AcquaintanceRepository') protected acquaintanceRepositoryGetter: Getter<AcquaintanceRepository>, @repository.getter('InvolvementRepository') protected involvementRepositoryGetter: Getter<InvolvementRepository>,
  ) {
    super(Character, dataSource);
    this.xProps = this.createHasManyRepositoryFactoryFor('xProps', characterXPropRepositoryGetter,);
    this.registerInclusionResolver('xProps', this.xProps.inclusionResolver);
    this.involvements = this.createHasManyRepositoryFactoryFor('involvements', involvementRepositoryGetter,);
    this.registerInclusionResolver('involvements', this.involvements.inclusionResolver);
    this.acquaintancesAsObject = this.createHasManyRepositoryFactoryFor('acquaintancesAsObject', acquaintanceRepositoryGetter,);
    this.registerInclusionResolver('acquaintancesAsObject', this.acquaintancesAsObject.inclusionResolver);
    this.acquaintances = this.createHasManyRepositoryFactoryFor('acquaintances', acquaintanceRepositoryGetter,);
    this.registerInclusionResolver('acquaintances', this.acquaintances.inclusionResolver);
    this.player = this.createHasOneRepositoryFactoryFor('player', playerRepositoryGetter);
    this.registerInclusionResolver('player', this.player.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.characterXPropArray = this.createHasManyRepositoryFactoryFor('characterXPropArray', characterXPropRepositoryGetter,);
    this.registerInclusionResolver('characterXPropArray', this.characterXPropArray.inclusionResolver);
  }
}
