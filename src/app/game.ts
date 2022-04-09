import { HangmanConstants } from './constants';
import { Sentence } from './models/sentence';

export class Game
{
    correctSentences: Sentence[] = [];
    mistakes: number;
    points: number;
    remainingMistakes: number;
    helpsUsed: number;
    remainingHelp: number;
    helpCanBeUsed: number = HangmanConstants.ALLOWED_HELPS; 
    helpPenalty: number = HangmanConstants.HELP_PENALTY;
    pointsPerLetter: number =HangmanConstants.POINTS_FOR_LETTER;
    pointsPerSentence: number =HangmanConstants.POINTS_FOR_SENTENCE;

    constructor() {
        this.helpsUsed = 0;
        this.mistakes = 0;
        this.points = 0;
        this.remainingMistakes = HangmanConstants.ALLOWED_MISTAKES;
        this.remainingHelp = HangmanConstants.ALLOWED_HELPS;
    }

    isOver(): boolean {
        // Returns true if game is over
        if (this.mistakes == HangmanConstants.ALLOWED_MISTAKES) {
            return true;
        }
        return false;
    }

    helpRequested() {
        this.helpsUsed++;
        this.remainingHelp--;
        this.points -= HangmanConstants.HELP_PENALTY;
    }

    canHelp(): boolean {
        return this.remainingHelp > 0;
    }

    letterGuessedCorrectly(letter: string) {
        this.points += HangmanConstants.POINTS_FOR_LETTER;
    }

    letterGuessedIncorrectly() {
        this.mistakes += 1;
        this.remainingMistakes -= 1;
    }

    senteceGuessedCorrectly(sentence: Sentence) {
        this.mistakes = 0;
        this.remainingMistakes = HangmanConstants.ALLOWED_MISTAKES;
        this.correctSentences.push(sentence);
        this.points += HangmanConstants.POINTS_FOR_SENTENCE;
    }
};