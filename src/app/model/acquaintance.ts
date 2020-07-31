import { BaseExtended } from './base-extended';
import { Character } from './character';

export interface Acquaintance extends BaseExtended {
  idCharacter?: number;
  character?: Character;
  idObject?: number;
  object?: Character;
}
