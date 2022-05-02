import { HangmanConstants } from '../constants';
import { Mistake } from './mistake';

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

  it('reducts remaining mistakes', () => {
    mistake.made();
    expect(mistake.mistakesMade).toEqual(1);
    expect(mistake.remaining).toEqual(HangmanConstants.ALLOWED_MISTAKES - 1);
  });

  it('resets variables when requested', () => {
    mistake.made();
    mistake.reset();
    expect(mistake.mistakesMade).toEqual(0);
    expect(mistake.remaining).toEqual(HangmanConstants.ALLOWED_MISTAKES);
  });

});
