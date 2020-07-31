import {inject, Getter} from '@loopback/core';
import {repository, DefaultCrudRepository, HasManyRepositoryFactory} from '@loopback/repository';
import {DevelopmentDataSource} from '../datasources';
import {Player, PlayerRelations, PlayerXQuality} from '../models';
import {PlayerXQualityRepository} from './player-x-quality.repository';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {
  public readonly xQuality: HasManyRepositoryFactory<
    PlayerXQuality,
    typeof Player.prototype.id
  >;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource,
    @repository.getter('PlayerXQualityRepository')
    protected playerXQualityRepositoryGetter: Getter<PlayerXQualityRepository>,
  ) {
    super(Player, dataSource);
    this.xQuality = this.createHasManyRepositoryFactoryFor(
      'xQuality',
      playerXQualityRepositoryGetter,
    );
    this.registerInclusionResolver('xQuality', this.xQuality.inclusionResolver);
  }
}
