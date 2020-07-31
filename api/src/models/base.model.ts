import {Entity} from '@loopback/repository';

export abstract class BaseModel extends Entity {
  static hiddenProps = [];
  static hiddenRelations = [];
}
