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
import {TailXProp} from '../models';
import {TailXPropRepository} from '../repositories';

export class TailXPropController {
  constructor(
    @repository(TailXPropRepository)
    public tailXPropRepository: TailXPropRepository,
  ) {}

  @post('/tail-x-props', {
    responses: {
      '200': {
        description: 'TailXProp model instance',
        content: {'application/json': {schema: getModelSchemaRef(TailXProp)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TailXProp, {
            title: 'NewTailXProp',
            exclude: ['id'],
          }),
        },
      },
    })
    tailXProp: Omit<TailXProp, 'id'>,
  ): Promise<TailXProp> {
    return this.tailXPropRepository.create(tailXProp);
  }

  @get('/tail-x-props/count', {
    responses: {
      '200': {
        description: 'TailXProp model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TailXProp) where?: Where<TailXProp>,
  ): Promise<Count> {
    return this.tailXPropRepository.count(where);
  }

  @get('/tail-x-props', {
    responses: {
      '200': {
        description: 'Array of TailXProp model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TailXProp, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TailXProp) filter?: Filter<TailXProp>,
  ): Promise<TailXProp[]> {
    return this.tailXPropRepository.find(filter);
  }

  @patch('/tail-x-props', {
    responses: {
      '200': {
        description: 'TailXProp PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TailXProp, {partial: true}),
        },
      },
    })
    tailXProp: TailXProp,
    @param.where(TailXProp) where?: Where<TailXProp>,
  ): Promise<Count> {
    return this.tailXPropRepository.updateAll(tailXProp, where);
  }

  @get('/tail-x-props/{id}', {
    responses: {
      '200': {
        description: 'TailXProp model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TailXProp, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TailXProp, {exclude: 'where'})
    filter?: FilterExcludingWhere<TailXProp>,
  ): Promise<TailXProp> {
    return this.tailXPropRepository.findById(id, filter);
  }

  @patch('/tail-x-props/{id}', {
    responses: {
      '204': {
        description: 'TailXProp PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TailXProp, {partial: true}),
        },
      },
    })
    tailXProp: TailXProp,
  ): Promise<void> {
    await this.tailXPropRepository.updateById(id, tailXProp);
  }

  @put('/tail-x-props/{id}', {
    responses: {
      '204': {
        description: 'TailXProp PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tailXProp: TailXProp,
  ): Promise<void> {
    await this.tailXPropRepository.replaceById(id, tailXProp);
  }

  @del('/tail-x-props/{id}', {
    responses: {
      '204': {
        description: 'TailXProp DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tailXPropRepository.deleteById(id);
  }
}
