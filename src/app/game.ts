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
    totalSentences: number = 0;

    constructor(totalSentences: number) {
        this.helpsUsed = 0;
        this.mistakes = 0;
        this.points = 0;
        this.remainingMistakes = HangmanConstants.ALLOWED_MISTAKES;
        this.remainingHelp = HangmanConstants.ALLOWED_HELPS;
        this.totalSentences = totalSentences;
        this.correctSentences = [];
    }

    completed(): boolean {
        if ((this.correctSentences.length == this.totalSentences) && this.totalSentences != 0) {
            return true;
        }
        return false;
    }

    failed(): boolean {
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