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
  Prop,
  CharacterXProp,
} from '../models';
import {PropRepository} from '../repositories';

export class PropCharacterXPropController {
  constructor(
    @repository(PropRepository) protected propRepository: PropRepository,
  ) { }

  @get('/props/{id}/character-x-props', {
    responses: {
      '200': {
        description: 'Array of Prop has many CharacterXProp',
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
    return this.propRepository.characterXPropArray(id).find(filter);
  }

  @post('/props/{id}/character-x-props', {
    responses: {
      '200': {
        description: 'Prop model instance',
        content: {'application/json': {schema: getModelSchemaRef(CharacterXProp)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Prop.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CharacterXProp, {
            title: 'NewCharacterXPropInProp',
            exclude: ['id'],
            optional: ['idProp']
          }),
        },
      },
    }) characterXProp: Omit<CharacterXProp, 'id'>,
  ): Promise<CharacterXProp> {
    return this.propRepository.characterXPropArray(id).create(characterXProp);
  }

  @patch('/props/{id}/character-x-props', {
    responses: {
      '200': {
        description: 'Prop.CharacterXProp PATCH success count',
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
    return this.propRepository.characterXPropArray(id).patch(characterXProp, where);
  }

  @del('/props/{id}/character-x-props', {
    responses: {
      '200': {
        description: 'Prop.CharacterXProp DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CharacterXProp)) where?: Where<CharacterXProp>,
  ): Promise<Count> {
    return this.propRepository.characterXPropArray(id).delete(where);
  }
}
