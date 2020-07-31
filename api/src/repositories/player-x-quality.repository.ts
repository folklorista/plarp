import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PlayerXQuality, PlayerXQualityRelations, Player, Quality} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PlayerRepository} from './player.repository';
import {QualityRepository} from './quality.repository';

export class PlayerXQualityRepository extends DefaultCrudRepository<
  PlayerXQuality,
  typeof PlayerXQuality.prototype.id,
  PlayerXQualityRelations
> {

  public readonly player: BelongsToAccessor<Player, typeof PlayerXQuality.prototype.id>;

  public readonly quality: BelongsToAccessor<Quality, typeof PlayerXQuality.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>, @repository.getter('QualityRepository') protected qualityRepositoryGetter: Getter<QualityRepository>,
  ) {
    super(PlayerXQuality, dataSource);
    this.quality = this.createBelongsToAccessorFor('quality', qualityRepositoryGetter,);
    this.registerInclusionResolver('quality', this.quality.inclusionResolver);
    this.player = this.createBelongsToAccessorFor('player', playerRepositoryGetter,);
    this.registerInclusionResolver('player', this.player.inclusionResolver);
  }
}
