import { GameState } from '../models/state';
import { Mistake } from './mistake';
import { Scoring } from './scoring';
import { Sentence } from './sentence';

export class Game
{
    currentSentence!: Sentence;
    correctSentences: Sentence[] = [];
    scoring: Scoring;
    mistake: Mistake;
    totalSentences: number = 0;
    state: GameState = GameState.STARTED;

    constructor() {
        this.scoring = new Scoring();
        this.mistake = new Mistake();;
    }

    completed(): boolean {
        return ((this.correctSentences.length == this.totalSentences) && this.totalSentences != 0)
    }

    failed(): boolean {
        return (this.mistake.remaining <= 0);
    }

    newGame(totalSentences: number) {
        this.mistake = new Mistake();;
        this.scoring = new Scoring();
        this.totalSentences = 0;
        this.correctSentences = [];
        this.totalSentences = totalSentences;
    }

    newSentence(sentence: Sentence) {
        this.currentSentence = sentence;
        this.mistake.reset();
    }

    registerGuess(correctGuess: boolean) {
        if (correctGuess) {
            this.scoring.correctLetter();
        } else  {
            this.mistake.made();
        }
    }

    registerCorrectSentence() {
        this.correctSentences.push(this.currentSentence);
        this.scoring.correctSentence(this.currentSentence);
    }
}
