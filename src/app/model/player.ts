import { Base } from './base';
import { Character } from './character';

export interface Player extends Base {
  firstName: string;
  surname: string;
  nickname: string;
  email: string;
  fb: string;
  kids: string;
  idCharacter: number;
  character: Character;
}
