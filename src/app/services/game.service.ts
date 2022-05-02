import { Injectable } from '@angular/core';
import { Observable, Subject, first } from 'rxjs';

import { Game } from '../models/game';
import { GameState } from '../models/state';
import { Scoring } from '../models/scoring';
import { Sentence } from '../models/sentence';
import { GuessService } from './guess.service';
import { SentenceService } from './sentence.service';
import { Mistake } from '../models/mistake';
import { Help } from '../models/help';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game = new Game();
  helpSubject: Subject<Help> = new Subject<Help>();
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

  help(): Observable<Help> {
    return this.helpSubject.asObservable();
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

  requestHelp(): void {
    this.game.helpRequested();
    this.helpSubject.next(this.game.help);
  }

  registerGuess(guessedLetter: string) {
    const correctGuess = this.guessService.guess(guessedLetter);
    this.game.registerGuess(guessedLetter, correctGuess);

    if (!correctGuess) {
      this.mistakeSubject.next(this.game.mistake);
    }

    if (this.game.completed()) {
      this.changeState(GameState.COMPLETED);
    } else if (this.game.failed()) {
      this.changeState(GameState.FAILED);
    } else if (this.guessService.completed()) {
      this.game.sentenceCompleted();
      this.changeState(GameState.SENTENCE_COMPLETED);
    }

    this.scoringSubject.next(this.game.scoring);
  }

  private changeState(state: GameState) {
    this.game.state = state;
    this.stateSubject.next(state);
  }    

}
