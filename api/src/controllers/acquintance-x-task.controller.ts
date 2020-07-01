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
import {AcquintanceXTask} from '../models';
import {AcquintanceXTaskRepository} from '../repositories';

export class AcquintanceXTaskController {
  constructor(
    @repository(AcquintanceXTaskRepository)
    public acquintanceXTaskRepository: AcquintanceXTaskRepository,
  ) {}

  @post('/acquintance-x-tasks', {
    responses: {
      '200': {
        description: 'AcquintanceXTask model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(AcquintanceXTask)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AcquintanceXTask, {
            title: 'NewAcquintanceXTask',
            exclude: ['id'],
          }),
        },
      },
    })
    acquintanceXTask: Omit<AcquintanceXTask, 'id'>,
  ): Promise<AcquintanceXTask> {
    return this.acquintanceXTaskRepository.create(acquintanceXTask);
  }

  @get('/acquintance-x-tasks/count', {
    responses: {
      '200': {
        description: 'AcquintanceXTask model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(AcquintanceXTask) where?: Where<AcquintanceXTask>,
  ): Promise<Count> {
    return this.acquintanceXTaskRepository.count(where);
  }

  @get('/acquintance-x-tasks', {
    responses: {
      '200': {
        description: 'Array of AcquintanceXTask model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AcquintanceXTask, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(AcquintanceXTask) filter?: Filter<AcquintanceXTask>,
  ): Promise<AcquintanceXTask[]> {
    return this.acquintanceXTaskRepository.find(filter);
  }

  @patch('/acquintance-x-tasks', {
    responses: {
      '200': {
        description: 'AcquintanceXTask PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AcquintanceXTask, {partial: true}),
        },
      },
    })
    acquintanceXTask: AcquintanceXTask,
    @param.where(AcquintanceXTask) where?: Where<AcquintanceXTask>,
  ): Promise<Count> {
    return this.acquintanceXTaskRepository.updateAll(acquintanceXTask, where);
  }

  @get('/acquintance-x-tasks/{id}', {
    responses: {
      '200': {
        description: 'AcquintanceXTask model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AcquintanceXTask, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AcquintanceXTask, {exclude: 'where'})
    filter?: FilterExcludingWhere<AcquintanceXTask>,
  ): Promise<AcquintanceXTask> {
    return this.acquintanceXTaskRepository.findById(id, filter);
  }

  @patch('/acquintance-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'AcquintanceXTask PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AcquintanceXTask, {partial: true}),
        },
      },
    })
    acquintanceXTask: AcquintanceXTask,
  ): Promise<void> {
    await this.acquintanceXTaskRepository.updateById(id, acquintanceXTask);
  }

  @put('/acquintance-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'AcquintanceXTask PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() acquintanceXTask: AcquintanceXTask,
  ): Promise<void> {
    await this.acquintanceXTaskRepository.replaceById(id, acquintanceXTask);
  }

  @del('/acquintance-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'AcquintanceXTask DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.acquintanceXTaskRepository.deleteById(id);
  }
}
