import { BaseExtended } from './base-extended';
import { Involvement } from './involvement';

export interface Tail extends BaseExtended {
  name?: string;
  involvements?: Involvement[];
}
