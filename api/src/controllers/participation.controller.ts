import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Participation} from '../models';
import {ParticipationRepository} from '../repositories';

export class ParticipationController {
  constructor(
    @repository(ParticipationRepository)
    public participationRepository: ParticipationRepository,
  ) {}

  @post('/participations', {
    responses: {
      '200': {
        description: 'Participation model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Participation)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participation, {
            title: 'NewParticipation',
            exclude: ['id'],
          }),
        },
      },
    })
    participation: Omit<Participation, 'id'>,
  ): Promise<Participation> {
    return this.participationRepository.create(participation);
  }

  @get('/participations/count', {
    responses: {
      '200': {
        description: 'Participation model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Participation) where?: Where<Participation>,
  ): Promise<Count> {
    return this.participationRepository.count(where);
  }

  @get('/participations', {
    responses: {
      '200': {
        description: 'Array of Participation model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Participation, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Participation) filter?: Filter<Participation>,
  ): Promise<Participation[]> {
    return this.participationRepository.find(filter);
  }

  @patch('/participations', {
    responses: {
      '200': {
        description: 'Participation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participation, {partial: true}),
        },
      },
    })
    participation: Participation,
    @param.where(Participation) where?: Where<Participation>,
  ): Promise<Count> {
    return this.participationRepository.updateAll(participation, where);
  }

  @get('/participations/{id}', {
    responses: {
      '200': {
        description: 'Participation model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Participation, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Participation, {exclude: 'where'})
    filter?: FilterExcludingWhere<Participation>,
  ): Promise<Participation> {
    return this.participationRepository.findById(id, filter);
  }

  @patch('/participations/{id}', {
    responses: {
      '204': {
        description: 'Participation PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participation, {partial: true}),
        },
      },
    })
    participation: Participation,
  ): Promise<void> {
    await this.participationRepository.updateById(id, participation);
  }

  @put('/participations/{id}', {
    responses: {
      '204': {
        description: 'Participation PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() participation: Participation,
  ): Promise<void> {
    await this.participationRepository.replaceById(id, participation);
  }

  @del('/participations/{id}', {
    responses: {
      '204': {
        description: 'Participation DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.participationRepository.deleteById(id);
  }
}
