import {belongsTo, model, property} from '@loopback/repository';

import {BaseModel} from './base.model';
import {Player} from './player.model';
import {Quality} from './quality.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'player', table: 'player_x_quality'},
  },
})
export class PlayerXQuality extends BaseModel {
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
      columnName: 'rate',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  rate?: number;

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
    () => Player,
    {name: 'player'},
    {
      type: 'number',
      scale: 0,
      postgresql: {
        columnName: 'id_player',
        dataType: 'integer',
        dataLength: null,
        dataPrecision: null,
        dataScale: 0,
        nullable: 'YES',
      },
    },
  )
  idPlayer: number;

  @belongsTo(
    () => Quality,
    {name: 'quality'},
    {
      type: 'number',
      scale: 0,
      postgresql: {
        columnName: 'id_quality',
        dataType: 'integer',
        dataLength: null,
        dataPrecision: null,
        dataScale: 0,
        nullable: 'YES',
      },
    },
  )
  idQuality: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PlayerXQuality>) {
    super(data);
  }
}

export interface PlayerXQualityRelations {
  // describe navigational properties here
}

export type PlayerXQualityWithRelations = PlayerXQuality &
  PlayerXQualityRelations;
