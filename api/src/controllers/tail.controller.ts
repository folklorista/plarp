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
import {Tail} from '../models';
import {TailRepository} from '../repositories';

export class TailController {
  constructor(
    @repository(TailRepository)
    public tailRepository: TailRepository,
  ) {}

  @post('/tails', {
    responses: {
      '200': {
        description: 'Tail model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tail)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tail, {
            title: 'NewTail',
            exclude: ['id'],
          }),
        },
      },
    })
    tail: Omit<Tail, 'id'>,
  ): Promise<Tail> {
    return this.tailRepository.create(tail);
  }

  @get('/tails/count', {
    responses: {
      '200': {
        description: 'Tail model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Tail) where?: Where<Tail>): Promise<Count> {
    return this.tailRepository.count(where);
  }

  @get('/tails', {
    responses: {
      '200': {
        description: 'Array of Tail model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Tail, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Tail) filter?: Filter<Tail>): Promise<Tail[]> {
    return this.tailRepository.find(filter);
  }

  @patch('/tails', {
    responses: {
      '200': {
        description: 'Tail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tail, {partial: true}),
        },
      },
    })
    tail: Tail,
    @param.where(Tail) where?: Where<Tail>,
  ): Promise<Count> {
    return this.tailRepository.updateAll(tail, where);
  }

  @get('/tails/{id}', {
    responses: {
      '200': {
        description: 'Tail model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tail, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tail, {exclude: 'where'}) filter?: FilterExcludingWhere<Tail>,
  ): Promise<Tail> {
    return this.tailRepository.findById(id, filter);
  }

  @patch('/tails/{id}', {
    responses: {
      '204': {
        description: 'Tail PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tail, {partial: true}),
        },
      },
    })
    tail: Tail,
  ): Promise<void> {
    await this.tailRepository.updateById(id, tail);
  }

  @put('/tails/{id}', {
    responses: {
      '204': {
        description: 'Tail PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tail: Tail,
  ): Promise<void> {
    await this.tailRepository.replaceById(id, tail);
  }

  @del('/tails/{id}', {
    responses: {
      '204': {
        description: 'Tail DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tailRepository.deleteById(id);
  }
}
