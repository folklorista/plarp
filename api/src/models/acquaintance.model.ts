import {belongsTo, model, property} from '@loopback/repository';

import { BaseModel } from './base.model';
import {Character} from './character.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'game', table: 'acquaintance'},
  },
})
export class Acquaintance extends BaseModel {
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
    type: 'string',
    postgresql: {
      columnName: 'description',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  description?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sandbox',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  sandbox?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'org_note',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  orgNote?: string;

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

  @belongsTo(
    () => Character,
    {name: 'character'},
    {
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
    },
  )
  idCharacter: number;

  @belongsTo(
    () => Character,
    {name: 'object'},
    {
      type: 'number',
      scale: 0,
      postgresql: {
        columnName: 'id_object',
        dataType: 'integer',
        dataLength: null,
        dataPrecision: null,
        dataScale: 0,
        nullable: 'YES',
      },
    },
  )
  idObject: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Acquaintance>) {
    super(data);
  }
}

export interface AcquaintanceRelations {
  // describe navigational properties here
}

export type AcquaintanceWithRelations = Acquaintance & AcquaintanceRelations;
