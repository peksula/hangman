import { Scoring } from './scoring';
import { HangmanConstants } from '../constants';

describe('Scoring', () => {
  let scoring: Scoring;

  beforeEach(() => {
    scoring = new Scoring()
  });

  it('should create', () => {
    expect(scoring).toBeTruthy();
    expect(scoring.helpPenalty).toEqual(HangmanConstants.HELP_PENALTY);
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
    scoring.correctSentence();
    expect(scoring.score).toEqual(HangmanConstants.POINTS_FOR_SENTENCE);
  });

  it('reducts the score when help used', () => {
    scoring.helpUsed();
    expect(scoring.score).toEqual(-HangmanConstants.HELP_PENALTY);
  });

});
