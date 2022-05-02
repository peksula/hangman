import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { FirestoreService } from '../services/firestore.service';
import { firestoreServiceStub, FakeData } from './firestore.stub.service';
import { GameService } from './game.service';
import { GameState } from '../models/state';
import { SentenceService } from './sentence.service';

describe('GameService', () => {
  let service: GameService;
  let sentenceService: SentenceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ { provide: FirestoreService, useValue: firestoreServiceStub } ]
    })
    .compileComponents();
    service = TestBed.inject(GameService);
    sentenceService = TestBed.inject(SentenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns currect sentence', () => {
    expect(service.currentSentence()).toBeUndefined();
    service.game.currentSentence = FakeData.MY_STRUGGLE_1;
    expect(service.currentSentence()).toEqual(FakeData.MY_STRUGGLE_1);
  });

  it('provides help', (done) => {
    service.help().pipe(first()).subscribe(help => {
      expect(help.text).toEqual(FakeData.MY_STRUGGLE_1.help);
      done();
    });
    service.game.currentSentence = FakeData.MY_STRUGGLE_1;
    service.requestHelp();
  });

  it('provides score', (done) => {
    service.score().pipe(first()).subscribe(score => {
      expect(score.score).toEqual(35); // completed
      done();
    });
    service.game.scoring.score = 30;
    service.registerGuess('x');
  });

  it('provides mistakes', (done) => {
    service.mistake().pipe(first()).subscribe(mistake => {
      expect(mistake.mistakesMade).toEqual(1);
      done();
    });
    service.registerGuess('x');
  });

  it('provides game state', (done) => {
    service.gameState().pipe(first()).subscribe(state => {
      expect(state).toEqual(GameState.COMPLETED);
      done();
    });
    service.stateSubject.next(GameState.COMPLETED);
  });

  it('new game resets everything', (done) => {
    service.gameState().pipe(first()).subscribe(state => {
      expect(state).toEqual(GameState.STARTED);
      expect(service.game.correctSentences).toEqual([]);
      expect(service.game.mistake.mistakesMade).toEqual(0);
      expect(service.game.scoring.score).toEqual(0);
        done();
    });
    service.newGame();
  });

  it('switches to complete state when game is done', (done) => {
    service.gameState().pipe(first()).subscribe(state => {
      expect(state).toEqual(GameState.COMPLETED);
      done();
    });
    service.game.correctSentences = [FakeData.MY_STRUGGLE_1];
    service.game.totalSentences = 1;
    service.registerGuess('x');
  });

  it('switches to failed state when game is over', (done) => {
    service.gameState().pipe(first()).subscribe(state => {
      expect(state).toEqual(GameState.FAILED);
      done();
    });
    service.game.mistake.remaining = 0;
    service.registerGuess('x');
  });

  it('updates score immediately', (done) => {
    service.score().pipe(first()).subscribe(scoring => {
      expect(scoring.score).toEqual(10);
      done();
    });
    service.game.scoring.score = 5;
    service.registerGuess('x');
  });


});
