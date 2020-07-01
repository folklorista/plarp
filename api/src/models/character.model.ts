import {Entity, model, property, hasMany} from '@loopback/repository';
import {CharacterXProp} from './character-x-prop.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'game', table: 'character'},
  },
})
export class Character extends Entity {
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
    type: 'string',
    postgresql: {
      columnName: 'summary_short',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  summaryShort?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'summary_long',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  summaryLong?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'equipment',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  equipment?: string;

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

  @hasMany(() => CharacterXProp, {keyTo: 'idCharacter'})
  characterXPropArray: CharacterXProp[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Character>) {
    super(data);
  }
}

export interface CharacterRelations {
  // describe navigational properties here
}

export type CharacterWithRelations = Character & CharacterRelations;
