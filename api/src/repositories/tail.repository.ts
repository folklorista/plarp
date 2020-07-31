import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Tail, TailRelations, Involvement} from '../models';
import {DevelopmentDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {InvolvementRepository} from './involvement.repository';

export class TailRepository extends DefaultCrudRepository<
  Tail,
  typeof Tail.prototype.id,
  TailRelations
> {

  public readonly involvements: HasManyRepositoryFactory<Involvement, typeof Tail.prototype.id>;

  constructor(
    @inject('datasources.development') dataSource: DevelopmentDataSource, @repository.getter('InvolvementRepository') protected involvementRepositoryGetter: Getter<InvolvementRepository>,
  ) {
    super(Tail, dataSource);
    this.involvements = this.createHasManyRepositoryFactoryFor('involvements', involvementRepositoryGetter,);
    this.registerInclusionResolver('involvements', this.involvements.inclusionResolver);
  }
}
