import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Prop} from './prop.model';
import {Character} from './character.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'game', table: 'character_x_prop'},
  },
})
export class CharacterXProp extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id: number;
  @property({
    type: 'date',
    postgresql: {
      columnName: 'created_at',
      dataType: 'timestamp without time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  createdAt?: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'updated_at',
      dataType: 'timestamp without time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  updatedAt?: string;

  @belongsTo(() => Prop, {name: 'prop'},{
    type: 'number',
    scale: 0,
    postgresql: {
      columnName: 'id_prop',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  idProp: number;

  @belongsTo(() => Character, {name: 'character'},{
    type: 'number',
    scale: 0,
    postgresql: {
      columnName: 'id_character',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  idCharacter: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CharacterXProp>) {
    super(data);
  }
}

export interface CharacterXPropRelations {
  // describe navigational properties here
}

export type CharacterXPropWithRelations = CharacterXProp &
  CharacterXPropRelations;
