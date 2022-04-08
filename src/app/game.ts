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
    helpPenalty: number = HangmanConstants.HELP_PENALTY;

    constructor() {
        this.helpsUsed = 0;
        this.mistakes = 0;
        this.points = 0;
        this.remainingMistakes = HangmanConstants.ALLOWED_MISTAKES;
        this.remainingHelp = HangmanConstants.ALLOWED_HELPS;
    }

    isOver(): boolean {
        this.mistakes += 1;
        this.remainingMistakes -= 1;
        if (this.mistakes == HangmanConstants.ALLOWED_MISTAKES) {
            return true;
        }
        return false;
    }

    help() {
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

    senteceGuessedCorrectly(sentence: Sentence) {
        this.mistakes = 0;
        this.remainingMistakes = HangmanConstants.ALLOWED_MISTAKES;
        this.correctSentences.push(sentence);
        this.points += HangmanConstants.POINTS_FOR_SENTENCE;
    }
};