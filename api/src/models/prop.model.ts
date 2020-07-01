import {Entity, model, property, hasMany} from '@loopback/repository';
import {CharacterXProp} from './character-x-prop.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'game', table: 'prop'}},
})
export class Prop extends Entity {
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
    type: 'string',
    required: true,
    length: 255,
    postgresql: {
      columnName: 'name',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  name: string;

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
    type: 'number',
    scale: 0,
    postgresql: {
      columnName: 'id_user',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  idUser?: number;

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

  @hasMany(() => CharacterXProp, {keyTo: 'idProp'})
  characterXPropArray: CharacterXProp[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Prop>) {
    super(data);
  }
}

export interface PropRelations {
  // describe navigational properties here
}

export type PropWithRelations = Prop & PropRelations;
