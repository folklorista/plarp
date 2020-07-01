import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Character,
  CharacterXProp,
} from '../models';
import {CharacterRepository} from '../repositories';

export class CharacterCharacterXPropController {
  constructor(
    @repository(CharacterRepository) protected characterRepository: CharacterRepository,
  ) { }

  @get('/characters/{id}/character-x-props', {
    responses: {
      '200': {
        description: 'Array of Character has many CharacterXProp',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CharacterXProp)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CharacterXProp>,
  ): Promise<CharacterXProp[]> {
    return this.characterRepository.characterXPropArray(id).find(filter);
  }

  @post('/characters/{id}/character-x-props', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: getModelSchemaRef(CharacterXProp)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Character.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CharacterXProp, {
            title: 'NewCharacterXPropInCharacter',
            exclude: ['id'],
            optional: ['idCharacter']
          }),
        },
      },
    }) characterXProp: Omit<CharacterXProp, 'id'>,
  ): Promise<CharacterXProp> {
    return this.characterRepository.characterXPropArray(id).create(characterXProp);
  }

  @patch('/characters/{id}/character-x-props', {
    responses: {
      '200': {
        description: 'Character.CharacterXProp PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CharacterXProp, {partial: true}),
        },
      },
    })
    characterXProp: Partial<CharacterXProp>,
    @param.query.object('where', getWhereSchemaFor(CharacterXProp)) where?: Where<CharacterXProp>,
  ): Promise<Count> {
    return this.characterRepository.characterXPropArray(id).patch(characterXProp, where);
  }

  @del('/characters/{id}/character-x-props', {
    responses: {
      '200': {
        description: 'Character.CharacterXProp DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CharacterXProp)) where?: Where<CharacterXProp>,
  ): Promise<Count> {
    return this.characterRepository.characterXPropArray(id).delete(where);
  }
}
