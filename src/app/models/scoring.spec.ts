import { HangmanConstants } from '../constants';
import { Scoring } from './scoring';
import { Sentence } from './sentence';

describe('Scoring', () => {
  let scoring: Scoring;

  beforeEach(() => {
    scoring = new Scoring()
  });

  it('should create', () => {
    expect(scoring).toBeTruthy();
    expect(scoring.pointsPerLetter).toEqual(HangmanConstants.POINTS_FOR_LETTER);
    expect(scoring.pointsPerSentence).toEqual(HangmanConstants.POINTS_FOR_SENTENCE);
    expect(scoring.score).toEqual(0);
  });

  it('adds to the score when correct letter guessed', () => {
    scoring.correctLetter();
    expect(scoring.score).toEqual(HangmanConstants.POINTS_FOR_LETTER);
    scoring.correctLetter();
    expect(scoring.score).toEqual(HangmanConstants.POINTS_FOR_LETTER*2);
  });

  it('adds to the score when correct sentence guessed', () => {
    const sentence = {
      title: 'my title',
      help:' my help'
    } as Sentence;
    scoring.correctSentence(sentence);
    expect(scoring.score).toEqual(HangmanConstants.POINTS_FOR_SENTENCE);
  });

});
