import { TestBed } from '@angular/core/testing';

import { FakeData } from './firestore.stub.service';
import { GuessService } from './guess.service';

describe('GuessService', () => {
  let service: GuessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.sentence).toBeUndefined();
    expect(service.guesses).toEqual([]);
  });
  
  it('resets guesses when new sentence is set', () => {
    service.guesses = ['x'];
    service.setSentence(FakeData.MY_STRUGGLE_2);
    expect(service.sentence).toEqual(FakeData.MY_STRUGGLE_2);
    expect(service.guesses).toEqual([]);
  });

  it('evalutes the guess correctly', () => {
    service.setSentence(FakeData.MY_STRUGGLE_2);
    expect(service.guess('X')).toBeFalse();
    expect(service.guesses).toEqual(['X']);
    
    expect(service.guess('M')).toBeTrue();
    expect(service.guesses).toEqual(['X', 'M']);
  });

  it('formats sentence properly upon guesses and completes when done', (done) => {
    let expected: string[] = [
      'M Y   S T R U G G L E   2 ',
      'M Y   S T R U G G _ E   2 ',
      'M Y   S T R _ G G _ E   2 ',
      'M _   S T R _ G G _ E   2 ',
      'M _   S T R _ G G _ _   2 ',
      'M _   S T _ _ G G _ _   2 ',
      'M _   S _ _ _ G G _ _   2 ',
      'M _   S _ _ _ G G _ _   _ ',
      'M _   _ _ _ _ G G _ _   _ ',
      'M _   _ _ _ _ _ _ _ _   _ ',
      '_ _   _ _ _ _ _ _ _ _   _ ',
      '_ _   _ _ _ _ _ _ _ _   _ ',
    ];
    service.formattedSentence().pipe().subscribe(formatted => {
      const next = expected.pop() || '';
      expect(formatted).toEqual(next);
      if (expected.length == 0) {
        done();
      }
    });
    service.setSentence(FakeData.MY_STRUGGLE_2);
    expect(service.completed()).toBeFalse();
    expect(service.guess('X')).toBeFalse();

    expect(service.guess('M')).toBeTrue();
    expect(service.completed()).toBeFalse();

    expect(service.guess('G')).toBeTrue();
    expect(service.completed()).toBeFalse();

    expect(service.guess('S')).toBeTrue();
    expect(service.completed()).toBeFalse();

    expect(service.guess('2')).toBeTrue();
    expect(service.completed()).toBeFalse();

    expect(service.guess('T')).toBeTrue();
    expect(service.completed()).toBeFalse();

    expect(service.guess('R')).toBeTrue();
    expect(service.completed()).toBeFalse();

    expect(service.guess('E')).toBeTrue();
    expect(service.completed()).toBeFalse();

    expect(service.guess('Y')).toBeTrue();
    expect(service.completed()).toBeFalse();

    expect(service.guess('U')).toBeTrue();
    expect(service.completed()).toBeFalse();

    expect(service.guess('L')).toBeTrue();
    expect(service.completed()).toBeTrue();
  });


});
