import { first } from 'rxjs/operators';

import { GameState } from '../models/state';
import { Game } from './game';
import { Sentence } from './sentence';
import { HangmanConstants } from '../constants';

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game()
  });

  it('should create', () => {
    expect(game).toBeTruthy();
    expect(game.correctSentences).toEqual([]);
    expect(game.totalSentences).toEqual(0);
    expect(game.state).toEqual(GameState.STARTED);
    expect(game.help.remaining).toEqual(HangmanConstants.ALLOWED_HELPS);
    expect(game.help.used).toEqual(0);
    expect(game.mistake.mistakesMade).toEqual(0);
    expect(game.mistake.remaining).toEqual(HangmanConstants.ALLOWED_MISTAKES);
    expect(game.scoring.score).toEqual(0);
  });

  it('reset state when new game started', () => {
    game.newGame(20);
    expect(game.correctSentences).toEqual([]);
    expect(game.totalSentences).toEqual(20);
    expect(game.state).toEqual(GameState.STARTED);
    expect(game.help.remaining).toEqual(HangmanConstants.ALLOWED_HELPS);
    expect(game.help.used).toEqual(0);
    expect(game.mistake.mistakesMade).toEqual(0);
    expect(game.mistake.remaining).toEqual(HangmanConstants.ALLOWED_MISTAKES);
    expect(game.scoring.score).toEqual(0);
  });

  it('changes to guessing state when a new sentence is started', (done) => {
    game.newGame(20);
    game.stateObservable().pipe(first()).subscribe(
      (state) => {
        if (state == GameState.GUESSING_SENTENCE) {
          done();
        }
    });
    const sentence = {
      title: 'my title',
      help:' my help'
    } as Sentence;
    game.newSentence(sentence);
    expect(game.completed()).toBeFalse();
    expect(game.state).toEqual(GameState.GUESSING_SENTENCE);
  });  

  it('changes to completed state when all sentences are played', (done) => {
    game.newGame(1);
    game.stateObservable().subscribe(
      (state) => {
        if (state == GameState.COMPLETED) {
          done();
        }
    });
    expect(game.completed()).toBeFalse();
    game.sentenceCompleted();
    expect(game.completed()).toBeTrue();
    expect(game.state).toEqual(GameState.COMPLETED);
  });  

  it('changes to failed state when max mistakes have been made', (done) => {
    game.newGame(20);
    game.mistake.remaining = 1;
    game.stateObservable().subscribe(
      (state) => {
        if (state == GameState.FAILED) {
          done();
        }
    });
    game.registerGuess('A', false);
    expect(game.failed()).toBeTrue();
    expect(game.state).toEqual(GameState.FAILED);
  });  

  it('requests help', () => {
    game.newGame(20);
    const sentence = {
      title: 'my title',
      help:' my help'
    } as Sentence;
    game.newSentence(sentence);
    game.helpRequested();
    expect(game.help.used).toEqual(1);
    expect(game.scoring.score).toEqual(0 - HangmanConstants.HELP_PENALTY);
  });

});
