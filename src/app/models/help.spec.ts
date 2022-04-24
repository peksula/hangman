import { Help } from './help';
import { HangmanConstants } from '../constants';
import { Sentence } from './sentence';

describe('Help', () => {
  let help: Help;

  beforeEach(() => {
    help = new Help()
  });

  it('should create', () => {
    expect(help).toBeTruthy();
    expect(help.text).toEqual('');
    expect(help.used).toEqual(0);
    expect(help.remaining).toEqual(HangmanConstants.ALLOWED_HELPS);
    expect(help.max).toEqual(HangmanConstants.ALLOWED_HELPS);
  });

  it('clears help text', () => {
    help.text = 'the truth is out there';
    help.clear();
    expect(help.text).toEqual('');
  });

  it('handles help request correctly', () => {
    const sentence = {
        title: 'my title',
        help: 'my help'
      } as Sentence;
  
    help.requested(sentence);
    expect(help.text).toEqual('my help');
    expect(help.used).toEqual(1);
    expect(help.remaining).toEqual(HangmanConstants.ALLOWED_HELPS - 1);
  });

});
