import { HangmanConstants } from './constants';
import { Sentence } from './models/sentence';

export class Help
{
    used: number = 0;
    remaining: number = HangmanConstants.ALLOWED_HELPS;
    max: number = HangmanConstants.ALLOWED_HELPS;
    text: string = '';

    constructor() {
    }

    requested(sentence: Sentence) {
        this.used++;
        this.remaining--;
        this.text = sentence.help;
    }

    clear() {
        this.text = '';
    }

};
