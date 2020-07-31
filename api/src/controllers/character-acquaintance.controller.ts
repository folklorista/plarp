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
  Acquaintance,
} from '../models';
import {CharacterRepository} from '../repositories';

export class CharacterAcquaintanceController {
  constructor(
    @repository(CharacterRepository) protected characterRepository: CharacterRepository,
  ) { }

  @get('/characters/{id}/acquaintances', {
    responses: {
      '200': {
        description: 'Array of Character has many Acquaintance',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Acquaintance)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Acquaintance>,
  ): Promise<Acquaintance[]> {
    return this.characterRepository.acquaintances(id).find(filter);
  }

  @post('/characters/{id}/acquaintances', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: getModelSchemaRef(Acquaintance)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Character.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acquaintance, {
            title: 'NewAcquaintanceInCharacter',
            exclude: ['id'],
            optional: ['idCharacter']
          }),
        },
      },
    }) acquaintance: Omit<Acquaintance, 'id'>,
  ): Promise<Acquaintance> {
    return this.characterRepository.acquaintances(id).create(acquaintance);
  }

  @patch('/characters/{id}/acquaintances', {
    responses: {
      '200': {
        description: 'Character.Acquaintance PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acquaintance, {partial: true}),
        },
      },
    })
    acquaintance: Partial<Acquaintance>,
    @param.query.object('where', getWhereSchemaFor(Acquaintance)) where?: Where<Acquaintance>,
  ): Promise<Count> {
    return this.characterRepository.acquaintances(id).patch(acquaintance, where);
  }

  @del('/characters/{id}/acquaintances', {
    responses: {
      '200': {
        description: 'Character.Acquaintance DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Acquaintance)) where?: Where<Acquaintance>,
  ): Promise<Count> {
    return this.characterRepository.acquaintances(id).delete(where);
  }
}
