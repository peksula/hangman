import { HangmanConstants } from './constants';
import { Sentence } from './models/sentence';

export class Game
{
    correctSentences: Sentence[] = [];
    mistakes: number;
    points: number;
    remainingMistakes: number;
    
    constructor() {
        this.mistakes = 0;
        this.points = 0;
        this.remainingMistakes = HangmanConstants.ALLOWED_MISTAKES;
    }

    isOver(): boolean {
        this.mistakes += 1;
        this.remainingMistakes -= 1;
        if (this.mistakes == HangmanConstants.ALLOWED_MISTAKES) {
            return true;
        }
        return false;
    }

    letterGuessedCorrectly(letter: string) {
        this.points += HangmanConstants.POINTS_FOR_LETTER;
    }

    senteceGuessedCorrectly(sentence: Sentence) {
        this.mistakes = 0;
        this.remainingMistakes = HangmanConstants.ALLOWED_MISTAKES;
        this.correctSentences.push(sentence);
        this.points += HangmanConstants.POINTS_FOR_SENTENCE;
    }
};