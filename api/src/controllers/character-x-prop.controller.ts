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
import {CharacterXProp} from '../models';
import {CharacterXPropRepository} from '../repositories';

export class CharacterXPropController {
  constructor(
    @repository(CharacterXPropRepository)
    public characterXPropRepository: CharacterXPropRepository,
  ) {}

  @post('/character-x-props', {
    responses: {
      '200': {
        description: 'CharacterXProp model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(CharacterXProp)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CharacterXProp, {
            title: 'NewCharacterXProp',
            exclude: ['id'],
          }),
        },
      },
    })
    characterXProp: Omit<CharacterXProp, 'id'>,
  ): Promise<CharacterXProp> {
    return this.characterXPropRepository.create(characterXProp);
  }

  @get('/character-x-props/count', {
    responses: {
      '200': {
        description: 'CharacterXProp model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CharacterXProp) where?: Where<CharacterXProp>,
  ): Promise<Count> {
    return this.characterXPropRepository.count(where);
  }

  @get('/character-x-props', {
    responses: {
      '200': {
        description: 'Array of CharacterXProp model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CharacterXProp, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CharacterXProp) filter?: Filter<CharacterXProp>,
  ): Promise<CharacterXProp[]> {
    return this.characterXPropRepository.find(filter);
  }

  @patch('/character-x-props', {
    responses: {
      '200': {
        description: 'CharacterXProp PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CharacterXProp, {partial: true}),
        },
      },
    })
    characterXProp: CharacterXProp,
    @param.where(CharacterXProp) where?: Where<CharacterXProp>,
  ): Promise<Count> {
    return this.characterXPropRepository.updateAll(characterXProp, where);
  }

  @get('/character-x-props/{id}', {
    responses: {
      '200': {
        description: 'CharacterXProp model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CharacterXProp, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CharacterXProp, {exclude: 'where'})
    filter?: FilterExcludingWhere<CharacterXProp>,
  ): Promise<CharacterXProp> {
    return this.characterXPropRepository.findById(id, filter);
  }

  @patch('/character-x-props/{id}', {
    responses: {
      '204': {
        description: 'CharacterXProp PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CharacterXProp, {partial: true}),
        },
      },
    })
    characterXProp: CharacterXProp,
  ): Promise<void> {
    await this.characterXPropRepository.updateById(id, characterXProp);
  }

  @put('/character-x-props/{id}', {
    responses: {
      '204': {
        description: 'CharacterXProp PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() characterXProp: CharacterXProp,
  ): Promise<void> {
    await this.characterXPropRepository.replaceById(id, characterXProp);
  }

  @del('/character-x-props/{id}', {
    responses: {
      '204': {
        description: 'CharacterXProp DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.characterXPropRepository.deleteById(id);
  }
}
