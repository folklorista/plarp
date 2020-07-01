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
import {PropXTask} from '../models';
import {PropXTaskRepository} from '../repositories';

export class PropXTaskController {
  constructor(
    @repository(PropXTaskRepository)
    public propXTaskRepository: PropXTaskRepository,
  ) {}

  @post('/prop-x-tasks', {
    responses: {
      '200': {
        description: 'PropXTask model instance',
        content: {'application/json': {schema: getModelSchemaRef(PropXTask)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PropXTask, {
            title: 'NewPropXTask',
            exclude: ['id'],
          }),
        },
      },
    })
    propXTask: Omit<PropXTask, 'id'>,
  ): Promise<PropXTask> {
    return this.propXTaskRepository.create(propXTask);
  }

  @get('/prop-x-tasks/count', {
    responses: {
      '200': {
        description: 'PropXTask model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PropXTask) where?: Where<PropXTask>,
  ): Promise<Count> {
    return this.propXTaskRepository.count(where);
  }

  @get('/prop-x-tasks', {
    responses: {
      '200': {
        description: 'Array of PropXTask model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PropXTask, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PropXTask) filter?: Filter<PropXTask>,
  ): Promise<PropXTask[]> {
    return this.propXTaskRepository.find(filter);
  }

  @patch('/prop-x-tasks', {
    responses: {
      '200': {
        description: 'PropXTask PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PropXTask, {partial: true}),
        },
      },
    })
    propXTask: PropXTask,
    @param.where(PropXTask) where?: Where<PropXTask>,
  ): Promise<Count> {
    return this.propXTaskRepository.updateAll(propXTask, where);
  }

  @get('/prop-x-tasks/{id}', {
    responses: {
      '200': {
        description: 'PropXTask model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PropXTask, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PropXTask, {exclude: 'where'})
    filter?: FilterExcludingWhere<PropXTask>,
  ): Promise<PropXTask> {
    return this.propXTaskRepository.findById(id, filter);
  }

  @patch('/prop-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'PropXTask PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PropXTask, {partial: true}),
        },
      },
    })
    propXTask: PropXTask,
  ): Promise<void> {
    await this.propXTaskRepository.updateById(id, propXTask);
  }

  @put('/prop-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'PropXTask PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() propXTask: PropXTask,
  ): Promise<void> {
    await this.propXTaskRepository.replaceById(id, propXTask);
  }

  @del('/prop-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'PropXTask DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.propXTaskRepository.deleteById(id);
  }
}
