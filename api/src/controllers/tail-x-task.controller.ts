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
import {TailXTask} from '../models';
import {TailXTaskRepository} from '../repositories';

export class TailXTaskController {
  constructor(
    @repository(TailXTaskRepository)
    public tailXTaskRepository: TailXTaskRepository,
  ) {}

  @post('/tail-x-tasks', {
    responses: {
      '200': {
        description: 'TailXTask model instance',
        content: {'application/json': {schema: getModelSchemaRef(TailXTask)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TailXTask, {
            title: 'NewTailXTask',
            exclude: ['id'],
          }),
        },
      },
    })
    tailXTask: Omit<TailXTask, 'id'>,
  ): Promise<TailXTask> {
    return this.tailXTaskRepository.create(tailXTask);
  }

  @get('/tail-x-tasks/count', {
    responses: {
      '200': {
        description: 'TailXTask model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TailXTask) where?: Where<TailXTask>,
  ): Promise<Count> {
    return this.tailXTaskRepository.count(where);
  }

  @get('/tail-x-tasks', {
    responses: {
      '200': {
        description: 'Array of TailXTask model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TailXTask, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TailXTask) filter?: Filter<TailXTask>,
  ): Promise<TailXTask[]> {
    return this.tailXTaskRepository.find(filter);
  }

  @patch('/tail-x-tasks', {
    responses: {
      '200': {
        description: 'TailXTask PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TailXTask, {partial: true}),
        },
      },
    })
    tailXTask: TailXTask,
    @param.where(TailXTask) where?: Where<TailXTask>,
  ): Promise<Count> {
    return this.tailXTaskRepository.updateAll(tailXTask, where);
  }

  @get('/tail-x-tasks/{id}', {
    responses: {
      '200': {
        description: 'TailXTask model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TailXTask, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TailXTask, {exclude: 'where'})
    filter?: FilterExcludingWhere<TailXTask>,
  ): Promise<TailXTask> {
    return this.tailXTaskRepository.findById(id, filter);
  }

  @patch('/tail-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'TailXTask PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TailXTask, {partial: true}),
        },
      },
    })
    tailXTask: TailXTask,
  ): Promise<void> {
    await this.tailXTaskRepository.updateById(id, tailXTask);
  }

  @put('/tail-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'TailXTask PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tailXTask: TailXTask,
  ): Promise<void> {
    await this.tailXTaskRepository.replaceById(id, tailXTask);
  }

  @del('/tail-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'TailXTask DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tailXTaskRepository.deleteById(id);
  }
}
