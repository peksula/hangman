import { HangmanConstants } from '../constants';

export class Scoring
{
    helpPenalty: number = HangmanConstants.HELP_PENALTY;
    pointsPerLetter: number =HangmanConstants.POINTS_FOR_LETTER;
    pointsPerSentence: number =HangmanConstants.POINTS_FOR_SENTENCE;
    score: number = 0;

    constructor() {
    }

    correctLetter() {
        this.score += this.pointsPerLetter;
    }

    correctSentence() {
        this.score += this.pointsPerSentence;
    }

    helpUsed() {
        this.score -= this.helpPenalty;
    }

};