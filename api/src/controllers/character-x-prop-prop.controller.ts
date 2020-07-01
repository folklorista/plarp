import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {CharacterXProp, Prop} from '../models';
import {CharacterXPropRepository} from '../repositories';

export class CharacterXPropPropController {
  constructor(
    @repository(CharacterXPropRepository)
    public characterXPropRepository: CharacterXPropRepository,
  ) {}

  @get('/character-x-props/{id}/prop', {
    responses: {
      '200': {
        description: 'Prop belonging to CharacterXProp',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Prop)},
          },
        },
      },
    },
  })
  async getProp(
    @param.path.number('id') id: typeof CharacterXProp.prototype.id,
  ): Promise<Prop> {
    return this.characterXPropRepository.prop(id);
  }
}
