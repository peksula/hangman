import { HangmanConstants } from '../constants';
import { Sentence } from '../interfaces/sentence';

export class Help
{
    used: number = 0;
    remaining: number = HangmanConstants.ALLOWED_HELPS;
    max: number = HangmanConstants.ALLOWED_HELPS;
    text: string = '';

    constructor() {
    }

    requested(sentence: Sentence | null) {
    this.used++;
    this.remaining--;
    if (sentence) {
            this.text = sentence.help;
        } else {
            this.text = 'No help available.'    // should not happen
        }
    }

    clear() {
        this.text = '';
    }

};
