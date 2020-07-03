import { Character } from '@/model/character';
import { CharacterService } from '@/services/character.service';
import { BaseDataSource } from './base.datasource';

export class CharactersDataSource extends BaseDataSource<Character> {
  constructor(protected apiService: CharacterService) {
    super(apiService);
  }
}
