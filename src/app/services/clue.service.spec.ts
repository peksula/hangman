import { TestBed } from '@angular/core/testing';

import { ClueService } from './clue.service';
import { FakeData } from './firestore.stub.service';

describe('ClueService', () => {
  let service: ClueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('provides correct amount of clues', () => {
    expect(service.amountOfClues('')).toEqual(0);
    expect(service.amountOfClues('xyz')).toEqual(1);
    expect(service.amountOfClues('abcde')).toEqual(1);
    expect(service.amountOfClues('abcdefghi')).toEqual(1);
    expect(service.amountOfClues('abcdefghij')).toEqual(2);
  });

  it('trims the sentences', () => {
    expect(service.trimSentence(FakeData.MY_STRUGGLE_2)).toEqual('mystrugle2');
    expect(service.trimSentence(FakeData.THREE)).toEqual('3');
    expect(service.trimSentence(FakeData.CLYDE_BRUCKMAN)).toEqual('clydebrukmansfipo');
  });


});
