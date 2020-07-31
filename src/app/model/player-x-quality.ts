import { Base } from './base';
import { Quality } from './quality';

export interface PlayerXQuality extends Base {
  idPlayer?: number;
  idQuality?: number;
  rate?: number;
  quality?: Quality;
}
