import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { GameService } from '../services/game.service';
import { GuessService } from '../services/guess.service';
import { HangmanConstants } from '../constants';
import { GameState } from '../models/state';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit, OnDestroy {
  formattedSentence$: Observable<string>;
  lettersRows = HangmanConstants.LETTERS;
  message: string = '';
  mistakesRemaining: number = HangmanConstants.ALLOWED_MISTAKES;
  nextButtonEnabled: boolean = false;
  startButtonEnabled: boolean = true;
  private gameStateSubscription!: Subscription;
  private mistakeSubscription!: Subscription;

  constructor(
    private gameService: GameService,
    private guessService: GuessService) {
      this.formattedSentence$ = this.guessService.formattedSentence();
  }

  ngOnInit(): void {
    this.observeMistakes();
    this.observeState();
  }

  ngOnDestroy() {
    if (this.gameStateSubscription) {
      this.gameStateSubscription.unsubscribe();
    } 
    if (this.mistakeSubscription) {
      this.mistakeSubscription.unsubscribe();
    }
  }  

  onGuess(letter: string) {
    this.gameService.registerGuess(letter);
  }
  
  onNext() {
    this.gameService.nextSentence();
  }

  onStart() {
    this.gameService.newGame();
    this.gameService.nextSentence();
  }

  private observeState() {
    this.gameStateSubscription = this.gameService.gameState().subscribe(
      (state) => {
        if (state === GameState.STARTED) {
          this.message = '';
          this.startButtonEnabled = false;
          this.nextButtonEnabled = false;
        }
        if (state === GameState.COMPLETED) {
          this.message = HangmanConstants.COMPLETED_MESSAGE;
          this.startButtonEnabled = true;
        }
        if (state === GameState.FAILED) {
          this.message = this.gameService.currentSentence()?.title || '';
          this.startButtonEnabled = true;
        }
        if (state === GameState.SENTENCE_COMPLETED) {
          this.startButtonEnabled = false;
          this.nextButtonEnabled = true;
        }
        if (state === GameState.NEXT_SENTENCE) {
          this.nextButtonEnabled = false;
          this.startButtonEnabled = false;
          this.message = '';
        }
      }
    );
  }

  private observeMistakes() {
    this.mistakeSubscription = this.gameService.mistake().subscribe(
      (mistake) => {
        this.mistakesRemaining = mistake.remaining;
      }
    );
  }  
  
}
