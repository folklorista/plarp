import { Acquaintance } from './acquaintance';
import { BaseExtended } from './base-extended';
import { Involvement } from './involvement';
import { Player } from './player';
import { User } from './user';

export interface Character extends BaseExtended {
  sorting?: string;
  name?: string;
  summaryShort?: string;
  summaryLong?: string;
  equipment?: string;
  acquaintances?: Acquaintance[];
  acquaintancesAsObject?: Acquaintance[];
  involvements?: Involvement[];
  user?: User;
  player?: Player;
}
