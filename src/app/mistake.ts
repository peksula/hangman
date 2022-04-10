import { HangmanConstants } from './constants';

export class Mistake
{
    mistakesMade: number = 0;
    remaining: number = HangmanConstants.ALLOWED_MISTAKES;

    constructor() {
    }

    made() {
        this.mistakesMade++;
        this.remaining--;
    }

    reset() {
        this.mistakesMade = 0;
        this.remaining = HangmanConstants.ALLOWED_MISTAKES;
    }

};