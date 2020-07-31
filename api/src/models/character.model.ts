import {belongsTo, hasMany, hasOne, model, property} from '@loopback/repository';

import {Acquaintance} from './acquaintance.model';
import {BaseModel} from './base.model';
import {CharacterXProp} from './character-x-prop.model';
import {Involvement} from './involvement.model';
import {Player} from './player.model';
import {User} from './user.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'game', table: 'character'},
  },
})
export class Character extends BaseModel {
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
    required: false,
    length: 32,
    postgresql: {
      columnName: 'sorting',
      dataType: 'character varying',
      dataLength: 32,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  sorting: string;

  @property({
    type: 'string',
    required: true,
    default: '',
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
    required: false,
    postgresql: {
      columnName: 'description',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  description: string;

  @property({
    type: 'string',
    required: false,
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
    required: false,
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
    required: false,
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
    required: false,
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
    required: false,
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

  @belongsTo(
    () => User,
    {name: 'user'},
    {
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
    },
  )
  idUser: number;

  @hasOne(() => Player, {keyTo: 'idCharacter'})
  player: Player;

  @hasMany(() => Acquaintance, {keyTo: 'idCharacter'})
  acquaintances: Acquaintance[];

  @hasMany(() => Acquaintance, {keyTo: 'idObject'})
  acquaintancesAsObject: Acquaintance[];

  @hasMany(() => Involvement, {keyTo: 'idCharacter'})
  involvements: Involvement[];

  @hasMany(() => CharacterXProp, {keyTo: 'idCharacter'})
  xProps: CharacterXProp[];
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
