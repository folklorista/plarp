import {model, property} from '@loopback/repository';

import {BaseModel} from './base.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'game', table: 'tail_x_prop'},
  },
})
export class TailXProp extends BaseModel {
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
      columnName: 'id_tail',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  idTail?: number;

  @property({
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
  idProp?: number;

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

  constructor(data?: Partial<TailXProp>) {
    super(data);
  }
}

export interface TailXPropRelations {
  // describe navigational properties here
}

export type TailXPropWithRelations = TailXProp & TailXPropRelations;
