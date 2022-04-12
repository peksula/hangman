import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GuessService } from '../services/guess.service';
import { SentenceService } from '../services/sentence.service';
import { HangmanConstants } from '../constants';
import { Game } from '../models/game';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {
  game: Game = new Game();
  message: string = '';
  formattedSentence$: Observable<string>;
  lettersRows = HangmanConstants.LETTERS;

  constructor(
    private guessService: GuessService,
    private sentenceService: SentenceService) {
      this.formattedSentence$ = this.guessService.formattedSentenceSubject.asObservable();
  }

  ngOnInit(): void {
  }

  newSentence(): void {
    const sentence = this.sentenceService.randomSentence();
    if (sentence) {
      this.game.newSentence(sentence);
      this.guessService.setSentence(sentence);
    }
  }

  onGuess(letter: string) {
    this.handleGuess(this.guessService.guess(letter), letter);
    this.hasGameCompleted();
    this.hasGameFailed();
  }

  onHelp(): void {
    this.game.helpRequested();
  }

  onNext(): void {
    this.newSentence();
  }

  onStart(): void {
    this.game.newGame(this.sentenceService.totalSentences);
    this.message = '';
    this.newSentence();
  }  

  private handleGuess(correctGuess: boolean, guessedLetter: string) {
    this.game.registerGuess(guessedLetter, correctGuess);
    this.hasSentenceCompleted();
  }

  private hasGameCompleted() {
    if (this.game.completed()) {
      this.message = "Game completed!!! Congratulations, you are a dark wizard!";
    }
  }

  private hasGameFailed() {
    if (this.game.failed()) {
      this.message = this.game.currentSentence.title;
    }
  }

  private hasSentenceCompleted() {
    if (this.guessService.completed()) {
      this.game.sentenceCompleted();
    }
  }
  
}
