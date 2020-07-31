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
import {AcquaintanceXTask} from '../models';
import {AcquaintanceXTaskRepository} from '../repositories';

export class AcquaintanceXTaskController {
  constructor(
    @repository(AcquaintanceXTaskRepository)
    public acquaintanceXTaskRepository: AcquaintanceXTaskRepository,
  ) {}

  @post('/acquaintance-x-tasks', {
    responses: {
      '200': {
        description: 'AcquaintanceXTask model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(AcquaintanceXTask)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AcquaintanceXTask, {
            title: 'NewAcquaintanceXTask',
            exclude: ['id'],
          }),
        },
      },
    })
    acquaintanceXTask: Omit<AcquaintanceXTask, 'id'>,
  ): Promise<AcquaintanceXTask> {
    return this.acquaintanceXTaskRepository.create(acquaintanceXTask);
  }

  @get('/acquaintance-x-tasks/count', {
    responses: {
      '200': {
        description: 'AcquaintanceXTask model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(AcquaintanceXTask) where?: Where<AcquaintanceXTask>,
  ): Promise<Count> {
    return this.acquaintanceXTaskRepository.count(where);
  }

  @get('/acquaintance-x-tasks', {
    responses: {
      '200': {
        description: 'Array of AcquaintanceXTask model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AcquaintanceXTask, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(AcquaintanceXTask) filter?: Filter<AcquaintanceXTask>,
  ): Promise<AcquaintanceXTask[]> {
    return this.acquaintanceXTaskRepository.find(filter);
  }

  @patch('/acquaintance-x-tasks', {
    responses: {
      '200': {
        description: 'AcquaintanceXTask PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AcquaintanceXTask, {partial: true}),
        },
      },
    })
    acquaintanceXTask: AcquaintanceXTask,
    @param.where(AcquaintanceXTask) where?: Where<AcquaintanceXTask>,
  ): Promise<Count> {
    return this.acquaintanceXTaskRepository.updateAll(acquaintanceXTask, where);
  }

  @get('/acquaintance-x-tasks/{id}', {
    responses: {
      '200': {
        description: 'AcquaintanceXTask model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AcquaintanceXTask, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AcquaintanceXTask, {exclude: 'where'})
    filter?: FilterExcludingWhere<AcquaintanceXTask>,
  ): Promise<AcquaintanceXTask> {
    return this.acquaintanceXTaskRepository.findById(id, filter);
  }

  @patch('/acquaintance-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'AcquaintanceXTask PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AcquaintanceXTask, {partial: true}),
        },
      },
    })
    acquaintanceXTask: AcquaintanceXTask,
  ): Promise<void> {
    await this.acquaintanceXTaskRepository.updateById(id, acquaintanceXTask);
  }

  @put('/acquaintance-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'AcquaintanceXTask PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() acquaintanceXTask: AcquaintanceXTask,
  ): Promise<void> {
    await this.acquaintanceXTaskRepository.replaceById(id, acquaintanceXTask);
  }

  @del('/acquaintance-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'AcquaintanceXTask DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.acquaintanceXTaskRepository.deleteById(id);
  }
}
