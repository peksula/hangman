import { Injectable } from '@angular/core';
import { Observable, Subject, first } from 'rxjs';

import { Game } from '../models/game';
import { GameState } from '../models/state';
import { Scoring } from '../models/scoring';
import { Sentence } from '../models/sentence';
import { GuessService } from './guess.service';
import { SentenceService } from './sentence.service';
import { Mistake } from '../models/mistake';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game = new Game();
  mistakeSubject: Subject<Mistake> = new Subject<Mistake>();
  scoringSubject: Subject<Scoring> = new Subject<Scoring>();
  stateSubject: Subject<GameState> = new Subject<GameState>();

  constructor(
    private guessService: GuessService,
    private sentenceService: SentenceService) {
  }

  currentSentence(): Sentence | undefined {
    return this.game.currentSentence;
  }

  score(): Observable<Scoring> {
    return this.scoringSubject.asObservable();
  }

  mistake(): Observable<Mistake> {
    return this.mistakeSubject.asObservable();
  }

  gameState(): Observable<GameState> {
    return this.stateSubject.asObservable();
  }
  
  newGame(): void {
    this.sentenceService.ready().pipe(first()).subscribe(total => {
      this.game.newGame(this.sentenceService.totalSentences);
      this.changeState(GameState.STARTED);
      this.scoringSubject.next(this.game.scoring);
      this.nextSentence();
    });
    this.sentenceService.reset();
  }

  nextSentence(): void {
    const sentence = this.sentenceService.randomSentence();
    if (sentence) {
      this.game.newSentence(sentence);
      this.guessService.setSentence(sentence);
      this.changeState(GameState.NEXT_SENTENCE);
    }
  }

  registerGuess(guessedLetter: string) {
    const correctGuess = this.guessService.guess(guessedLetter);
    this.game.registerGuess(correctGuess);
    if (this.guessService.sentenceCompleted()) {
      this.game.registerCorrectSentence();
    }
    // Fire all subjects first, then evaluate game state
    this.mistakeSubject.next(this.game.mistake);
    this.scoringSubject.next(this.game.scoring);
    this.evaluateState();
  }

  evaluateState() {
    // public for unit testing needs
    if (this.game.completed()) {
      this.changeState(GameState.COMPLETED);
    } else if (this.game.failed()) {
      this.changeState(GameState.FAILED);
    } else if (this.guessService.sentenceCompleted()) {
      this.changeState(GameState.SENTENCE_COMPLETED);
    }
  }


  private changeState(state: GameState) {
    this.game.state = state;
    this.stateSubject.next(state);
  }    

}
