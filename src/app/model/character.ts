import { Acquaintance } from './acquaintance';
import { BaseExtended } from './base-extended';
import { Involvement } from './involvement';

export interface Character extends BaseExtended {
  name?: string;
  summaryShort?: string;
  summaryLong?: string;
  equipment?: string;
  acquintanceArray?: Acquaintance[];
  acquintanceAsObjectArray?: Acquaintance[];
  involvementArray?: Involvement[];
}
