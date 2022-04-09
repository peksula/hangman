import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { GuessService } from '../guess.service';
import { SentenceService } from '../sentence.service';
import { GameState } from '../models/state';
import { HangmanConstants } from '../constants';
import { Game } from '../game';
import { Sentence } from '../models/sentence';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit, OnDestroy {

  game!: Game;
  state: GameState = GameState.STARTED;
  currentSentence!: Sentence;
  formattedSentence$: Observable<string>;
  helpText!: string;
  lettersRows = HangmanConstants.LETTERS;
  stateSubject: Subject<GameState> = new Subject<GameState>();

  constructor(
    private guessService: GuessService,
    private sentenceService: SentenceService) {
      this.formattedSentence$ = this.guessService.formattedSentenceSubject.asObservable();
  }

  ngOnInit(): void {
    this.game = new Game(this.sentenceService.totalSentences);
    this.changeState(GameState.STARTED);
    this.observeCompleted();
  }

  ngOnDestroy() {
  }

  private changeState(state: GameState) {
    this.state = state;
    this.stateSubject.next(state);
  }

  private observeCompleted(): void {
    this.guessService.successSubject.asObservable().subscribe((sentence) => {
      this.changeState(GameState.GUESSED_SENCENCE);
      this.game.senteceGuessedCorrectly(sentence);
    });
  }

  newSentence(): void {
    this.changeState(GameState.GUESSING_SENTENCE);
    const nextSentence = this.sentenceService.randomSentence();
    if (nextSentence) {
      this.currentSentence = nextSentence;
      this.guessService.setSentence(nextSentence);
    }
    this.helpText = '';
  }
  
  onNext(): void {
    this.newSentence();
  }

  onStart(): void {
    this.game = new Game(this.sentenceService.totalSentences);
    this.newSentence();
  }

  onHelp(): void {
    this.game.helpRequested();
    this.helpText = this.currentSentence.help || this.currentSentence.category;
  }

  onGuess(letter: string) {
    if (this.guessService.guess(letter)) {
      this.game.letterGuessedCorrectly(letter);
    } else {
      this.game.letterGuessedIncorrectly();
    }
    if (this.game.failed()) {
      this.changeState(GameState.FAILED);
      this.helpText = this.currentSentence.title;
    }
    if (this.game.completed()) {
      this.changeState(GameState.COMPLETED);
      this.helpText = "Game completed!!! Congratulations, you are a dark wizard!";
    }

  }  
}
