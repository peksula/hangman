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
    expect(game.mistake.mistakesMade).toEqual(0);
    expect(game.mistake.remaining).toEqual(HangmanConstants.ALLOWED_MISTAKES);
    expect(game.scoring.score).toEqual(0);
  });


  it('calculates completion correctly', () => {
    game.newGame(2);
    expect(game.completed()).toBeFalse();
    game.registerCorrectSentence();
    expect(game.completed()).toBeFalse();
    game.registerCorrectSentence();
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

  it('reset state when new game started', () => {
    game.newGame(20);
    expect(game.correctSentences).toEqual([]);
    expect(game.totalSentences).toEqual(20);
    expect(game.mistake.mistakesMade).toEqual(0);
    expect(game.mistake.remaining).toEqual(HangmanConstants.ALLOWED_MISTAKES);
    expect(game.scoring.score).toEqual(0);
  });

  it('resets mistakes when new sentence is started', () => {
    game.mistake.mistakesMade = 3;
    game.newSentence(sentence);
    expect(game.mistake.mistakesMade).toBe(0);
  });

  it('adds points when letter is guessed correctly', () => {
    game.registerGuess(true)
    expect(game.scoring.score).toBe(HangmanConstants.POINTS_FOR_LETTER);
  });  

  it('adds a mistake when letter is guessed incorrectly', () => {
    game.registerGuess(false)
    expect(game.mistake.mistakesMade).toBe(1);
  });

  it('handles completing a sentence', () => {
    game.currentSentence = sentence;
    game.registerCorrectSentence();
    expect(game.correctSentences.length).toBe(1);
    expect(game.scoring.score).toBe(HangmanConstants.POINTS_FOR_SENTENCE);
  });
  
});
