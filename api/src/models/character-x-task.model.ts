import {model, property} from '@loopback/repository';

import {BaseModel} from './base.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'organizing', table: 'character_x_task'},
  },
})
export class CharacterXTask extends BaseModel {
  @property({
    type: 'number',
    required: false,
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
  idCharacter?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {
      columnName: 'id_task',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  idTask?: number;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CharacterXTask>) {
    super(data);
  }
}

export interface CharacterXTaskRelations {
  // describe navigational properties here
}

export type CharacterXTaskWithRelations = CharacterXTask &
  CharacterXTaskRelations;
