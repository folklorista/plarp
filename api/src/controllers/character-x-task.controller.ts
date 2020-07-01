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
import {CharacterXTask} from '../models';
import {CharacterXTaskRepository} from '../repositories';

export class CharacterXTaskController {
  constructor(
    @repository(CharacterXTaskRepository)
    public characterXTaskRepository: CharacterXTaskRepository,
  ) {}

  @post('/character-x-tasks', {
    responses: {
      '200': {
        description: 'CharacterXTask model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(CharacterXTask)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CharacterXTask, {
            title: 'NewCharacterXTask',
            exclude: ['id'],
          }),
        },
      },
    })
    characterXTask: Omit<CharacterXTask, 'id'>,
  ): Promise<CharacterXTask> {
    return this.characterXTaskRepository.create(characterXTask);
  }

  @get('/character-x-tasks/count', {
    responses: {
      '200': {
        description: 'CharacterXTask model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CharacterXTask) where?: Where<CharacterXTask>,
  ): Promise<Count> {
    return this.characterXTaskRepository.count(where);
  }

  @get('/character-x-tasks', {
    responses: {
      '200': {
        description: 'Array of CharacterXTask model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CharacterXTask, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CharacterXTask) filter?: Filter<CharacterXTask>,
  ): Promise<CharacterXTask[]> {
    return this.characterXTaskRepository.find(filter);
  }

  @patch('/character-x-tasks', {
    responses: {
      '200': {
        description: 'CharacterXTask PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CharacterXTask, {partial: true}),
        },
      },
    })
    characterXTask: CharacterXTask,
    @param.where(CharacterXTask) where?: Where<CharacterXTask>,
  ): Promise<Count> {
    return this.characterXTaskRepository.updateAll(characterXTask, where);
  }

  @get('/character-x-tasks/{id}', {
    responses: {
      '200': {
        description: 'CharacterXTask model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CharacterXTask, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CharacterXTask, {exclude: 'where'})
    filter?: FilterExcludingWhere<CharacterXTask>,
  ): Promise<CharacterXTask> {
    return this.characterXTaskRepository.findById(id, filter);
  }

  @patch('/character-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'CharacterXTask PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CharacterXTask, {partial: true}),
        },
      },
    })
    characterXTask: CharacterXTask,
  ): Promise<void> {
    await this.characterXTaskRepository.updateById(id, characterXTask);
  }

  @put('/character-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'CharacterXTask PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() characterXTask: CharacterXTask,
  ): Promise<void> {
    await this.characterXTaskRepository.replaceById(id, characterXTask);
  }

  @del('/character-x-tasks/{id}', {
    responses: {
      '204': {
        description: 'CharacterXTask DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.characterXTaskRepository.deleteById(id);
  }
}
