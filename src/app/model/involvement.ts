import { BaseExtended } from './base-extended';
import { Character } from './character';
import { Tail } from './tail';

export interface Involvement extends BaseExtended {
  idTail: number;
  tail: Tail;
  idCharacter: number;
  character: Character;
}
