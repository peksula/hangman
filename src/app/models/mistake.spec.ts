import { Mistake } from './mistake';
import { HangmanConstants } from '../constants';

describe('Mistake', () => {
  let mistake: Mistake;

  beforeEach(() => {
    mistake = new Mistake()
  });

  it('should create', () => {
    expect(mistake).toBeTruthy();
    expect(mistake.mistakesMade).toEqual(0);
    expect(mistake.remaining).toEqual(HangmanConstants.ALLOWED_MISTAKES);
  });

  it('handles made mistake', () => {
    mistake.made();
    expect(mistake.mistakesMade).toEqual(1);
    expect(mistake.remaining).toEqual(HangmanConstants.ALLOWED_MISTAKES - 1);
  });

  it('handles help request correctly', () => {
    mistake.made();
    mistake.reset();
    expect(mistake.mistakesMade).toEqual(0);
    expect(mistake.remaining).toEqual(HangmanConstants.ALLOWED_MISTAKES);
  });

});
