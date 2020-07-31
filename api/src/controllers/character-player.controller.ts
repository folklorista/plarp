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
  Player,
} from '../models';
import {CharacterRepository} from '../repositories';

export class CharacterPlayerController {
  constructor(
    @repository(CharacterRepository) protected characterRepository: CharacterRepository,
  ) { }

  @get('/characters/{id}/player', {
    responses: {
      '200': {
        description: 'Character has one Player',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Player),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Player>,
  ): Promise<Player> {
    return this.characterRepository.player(id).get(filter);
  }

  @post('/characters/{id}/player', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: getModelSchemaRef(Player)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Character.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayerInCharacter',
            exclude: ['id'],
            optional: ['idCharacter']
          }),
        },
      },
    }) player: Omit<Player, 'id'>,
  ): Promise<Player> {
    return this.characterRepository.player(id).create(player);
  }

  @patch('/characters/{id}/player', {
    responses: {
      '200': {
        description: 'Character.Player PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Partial<Player>,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.characterRepository.player(id).patch(player, where);
  }

  @del('/characters/{id}/player', {
    responses: {
      '200': {
        description: 'Character.Player DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.characterRepository.player(id).delete(where);
  }
}
