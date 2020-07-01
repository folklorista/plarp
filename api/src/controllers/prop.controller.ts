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
import {Prop} from '../models';
import {PropRepository} from '../repositories';

export class PropController {
  constructor(
    @repository(PropRepository)
    public propRepository: PropRepository,
  ) {}

  @post('/props', {
    responses: {
      '200': {
        description: 'Prop model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prop)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prop, {
            title: 'NewProp',
            exclude: ['id'],
          }),
        },
      },
    })
    prop: Omit<Prop, 'id'>,
  ): Promise<Prop> {
    return this.propRepository.create(prop);
  }

  @get('/props/count', {
    responses: {
      '200': {
        description: 'Prop model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Prop) where?: Where<Prop>): Promise<Count> {
    return this.propRepository.count(where);
  }

  @get('/props', {
    responses: {
      '200': {
        description: 'Array of Prop model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Prop, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Prop) filter?: Filter<Prop>): Promise<Prop[]> {
    return this.propRepository.find(filter);
  }

  @patch('/props', {
    responses: {
      '200': {
        description: 'Prop PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prop, {partial: true}),
        },
      },
    })
    prop: Prop,
    @param.where(Prop) where?: Where<Prop>,
  ): Promise<Count> {
    return this.propRepository.updateAll(prop, where);
  }

  @get('/props/{id}', {
    responses: {
      '200': {
        description: 'Prop model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prop, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Prop, {exclude: 'where'}) filter?: FilterExcludingWhere<Prop>,
  ): Promise<Prop> {
    return this.propRepository.findById(id, filter);
  }

  @patch('/props/{id}', {
    responses: {
      '204': {
        description: 'Prop PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prop, {partial: true}),
        },
      },
    })
    prop: Prop,
  ): Promise<void> {
    await this.propRepository.updateById(id, prop);
  }

  @put('/props/{id}', {
    responses: {
      '204': {
        description: 'Prop PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() prop: Prop,
  ): Promise<void> {
    await this.propRepository.replaceById(id, prop);
  }

  @del('/props/{id}', {
    responses: {
      '204': {
        description: 'Prop DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.propRepository.deleteById(id);
  }
}
