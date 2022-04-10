import { Observable, Subject } from 'rxjs';
import { GameState } from '../interfaces/state';
import { Help } from './help';
import { Mistake } from './mistake';
import { Scoring } from './scoring';
import { Sentence } from '../interfaces/sentence';

export class Game
{
    currentSentence!: Sentence;
    correctSentences: Sentence[] = [];
    help: Help;
    scoring: Scoring;
    mistake: Mistake;
    totalSentences: number = 0;
    state: GameState = GameState.STARTED;
    stateSubject: Subject<GameState> = new Subject<GameState>();    

    constructor() {
        this.help = new Help();
        this.scoring = new Scoring();
        this.mistake = new Mistake();;
    }

    newGame(totalSentences: number) {
        this.help = new Help();
        this.mistake = new Mistake();;
        this.scoring = new Scoring();
        this.totalSentences = 0;
        this.correctSentences = [];
        this.totalSentences = totalSentences;
        this.changeState(GameState.STARTED);
    }

    completed(): boolean {
        if ((this.correctSentences.length == this.totalSentences) && this.totalSentences != 0) {
            this.changeState(GameState.COMPLETED);
            return true;
        }
        return false; 
    }

    failed(): boolean {
        if (this.mistake.remaining == 0) {
            this.changeState(GameState.FAILED);
            return true;
        }
        return false;
    }

    helpRequested() {
        this.help.requested(this.currentSentence);
        this.scoring.helpUsed();
    }

    newSentence(sentence: Sentence) {
        this.currentSentence = sentence;
        this.help.clear();
        this.changeState(GameState.GUESSING_SENTENCE);
    }

    registerGuess(letter: string, correctGuess: boolean) {
        if (correctGuess) {
            this.scoring.correctLetter();
        } else  {
            this.mistake.made();
        }
    }

    sentenceCompleted() {
        this.mistake.reset();
        this.correctSentences.push(this.currentSentence);
        this.scoring.correctSentence();
        this.changeState(GameState.GUESSED_SENCENCE);
    }

    stateObservable(): Observable<GameState> {
        return this.stateSubject.asObservable();
    }

    private changeState(state: GameState) {
        this.state = state;
        this.stateSubject.next(state);
      }    
};