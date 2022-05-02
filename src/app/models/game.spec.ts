import { Game } from './game';
import { HangmanConstants } from '../constants';
import { Sentence } from './sentence';

describe('Game', () => {
  let game: Game;

  const sentence = {
    title: 'my title',
    help:' my help'
  } as Sentence;

  beforeEach(() => {
    game = new Game()
  });

  it('should create', () => {
    expect(game).toBeTruthy();
    expect(game.correctSentences).toEqual([]);
    expect(game.totalSentences).toEqual(0);
    expect(game.help.remaining).toEqual(HangmanConstants.ALLOWED_HELPS);
    expect(game.help.used).toEqual(0);
    expect(game.mistake.mistakesMade).toEqual(0);
    expect(game.mistake.remaining).toEqual(HangmanConstants.ALLOWED_MISTAKES);
    expect(game.scoring.score).toEqual(0);
  });


  it('calculates completion correctly', () => {
    game.newGame(2);
    expect(game.completed()).toBeFalse();
    game.sentenceCompleted();
    expect(game.completed()).toBeFalse();
    game.sentenceCompleted();
    expect(game.completed()).toBeTrue();

    game.newGame(0);
    expect(game.completed()).toBeFalse();
  });

  it('calculates game failure correctly', () => {
    game.newGame(2);
    expect(game.failed()).toBeFalse();
    game.mistake.remaining = 1;
    expect(game.failed()).toBeFalse();
    game.mistake.remaining = 0;
    expect(game.failed()).toBeTrue();
  });

  it('requesting help is handled correctly', () => {
    game.helpRequested();
    expect(game.help.used).toBe(1);
    expect(game.scoring.score).toBe(0 - HangmanConstants.HELP_PENALTY);
  });
  
  it('reset state when new game started', () => {
    game.newGame(20);
    expect(game.correctSentences).toEqual([]);
    expect(game.totalSentences).toEqual(20);
    expect(game.help.remaining).toEqual(HangmanConstants.ALLOWED_HELPS);
    expect(game.help.used).toEqual(0);
    expect(game.mistake.mistakesMade).toEqual(0);
    expect(game.mistake.remaining).toEqual(HangmanConstants.ALLOWED_MISTAKES);
    expect(game.scoring.score).toEqual(0);
  });

  it('resets mistakes when new sentence is started', () => {
    game.mistake.mistakesMade = 3;
    game.newSentence(sentence);
    expect(game.mistake.mistakesMade).toBe(0);
  });

  it('clears help text when new sentence is started', () => {
    game.help.text = 'my help text';
    game.newSentence(sentence);
    expect(game.help.text).toBe('');
  });

  it('adds points when letter is guessed correctly', () => {
    game.registerGuess('x', true)
    expect(game.scoring.score).toBe(HangmanConstants.POINTS_FOR_LETTER);
  });  

  it('adds a mistake when letter is guessed incorrectly', () => {
    game.registerGuess('x', false)
    expect(game.mistake.mistakesMade).toBe(1);
  });

  it('handles completing a sentence', () => {
    game.currentSentence = sentence;
    game.sentenceCompleted();
    expect(game.correctSentences.length).toBe(1);
    expect(game.scoring.score).toBe(HangmanConstants.POINTS_FOR_SENTENCE);
  });
  
});
