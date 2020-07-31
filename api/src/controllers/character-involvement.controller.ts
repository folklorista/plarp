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
  Involvement,
} from '../models';
import {CharacterRepository} from '../repositories';

export class CharacterInvolvementController {
  constructor(
    @repository(CharacterRepository) protected characterRepository: CharacterRepository,
  ) { }

  @get('/characters/{id}/involvements', {
    responses: {
      '200': {
        description: 'Array of Character has many Involvement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Involvement)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Involvement>,
  ): Promise<Involvement[]> {
    return this.characterRepository.involvements(id).find(filter);
  }

  @post('/characters/{id}/involvements', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: getModelSchemaRef(Involvement)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Character.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Involvement, {
            title: 'NewInvolvementInCharacter',
            exclude: ['id'],
            optional: ['idCharacter']
          }),
        },
      },
    }) involvement: Omit<Involvement, 'id'>,
  ): Promise<Involvement> {
    return this.characterRepository.involvements(id).create(involvement);
  }

  @patch('/characters/{id}/involvements', {
    responses: {
      '200': {
        description: 'Character.Involvement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Involvement, {partial: true}),
        },
      },
    })
    involvement: Partial<Involvement>,
    @param.query.object('where', getWhereSchemaFor(Involvement)) where?: Where<Involvement>,
  ): Promise<Count> {
    return this.characterRepository.involvements(id).patch(involvement, where);
  }

  @del('/characters/{id}/involvements', {
    responses: {
      '200': {
        description: 'Character.Involvement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Involvement)) where?: Where<Involvement>,
  ): Promise<Count> {
    return this.characterRepository.involvements(id).delete(where);
  }
}
