import { HangmanConstants } from '../constants';
import { Sentence } from './sentence';

export class Scoring
{
    correctSentences: Sentence[] = [];
    pointsPerLetter: number = HangmanConstants.POINTS_FOR_LETTER;
    pointsPerSentence: number =HangmanConstants.POINTS_FOR_SENTENCE;
    progress: number = 0;
    score: number = 0;

    constructor() {
    }

    correctLetter() {
        this.score += this.pointsPerLetter;
    }

    correctSentence(sentence: Sentence) {
        this.score += this.pointsPerSentence;
        this.progress += 1;
        this.correctSentences.push(sentence);
    }
};