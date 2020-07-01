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
import {EventXTask} from '../models';
import {EventXTaskRepository} from '../repositories';

export class EventXTaskController {
  constructor(
    @repository(EventXTaskRepository)
    public eventXTaskRepository: EventXTaskRepository,
  ) {}

  @post('/event-x-tasks', {
    responses: {
      '200': {
        description: 'EventXTask model instance',
        content: {'application/json': {schema: getModelSchemaRef(EventXTask)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventXTask, {
            title: 'NewEventXTask',
            exclude: ['id'],
          }),
        },
      },
    })
    eventXTask: Omit<EventXTask, 'id'>,
  ): Promise<EventXTask> {
    return this.eventXTaskRepository.create(eventXTask);
  }

  @get('/event-x-tasks/count', {
    responses: {
      '200': {
        description: 'EventXTask model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(EventXTask) where?: Where<EventXTask>,
  ): Promise<Count> {
    return this.eventXTaskRepository.count(where);
  }

  @get('/event-x-tasks', {
    responses: {
      '200': {
        description: 'Array of EventXTask model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EventXTask, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(EventXTask) filter?: Filter<EventXTask>,
  ): Promise<EventXTask[]> {
    return this.eventXTaskRepository.find(filter);
  }

  @patch('/event-x-tasks', {
    responses: {
      '200': {
        description: 'EventXTask PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventXTask, {partial: true}),
        },
      },
    })
    eventXTask: EventXTask,
    @param.where(EventXTask) where?: Where<EventXTask>,
  ): Promise<Count> {
    return this.eventXTaskRepository.updateAll(eventXTask, where);
  }

  @get('/event-x-tasks/{id}', {
    responses: {
      '200': {
        description: 'EventXTask model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EventXTask, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EventXTask, {exclude: 'where'})
    filter?: FilterExcludingWhere<EventXTask>,
  ): Promise<EventXTask> {
    return this.eventXTaskRepository.findById(id, filter);
  }

  @patch('/event-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'EventXTask PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventXTask, {partial: true}),
        },
      },
    })
    eventXTask: EventXTask,
  ): Promise<void> {
    await this.eventXTaskRepository.updateById(id, eventXTask);
  }

  @put('/event-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'EventXTask PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() eventXTask: EventXTask,
  ): Promise<void> {
    await this.eventXTaskRepository.replaceById(id, eventXTask);
  }

  @del('/event-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'EventXTask DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.eventXTaskRepository.deleteById(id);
  }
}
