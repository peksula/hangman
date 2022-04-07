import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { GameService } from '../game.service';
import { SentenceService } from '../sentence.service';
import { GameState } from '../models/state';
import { HangmanConstants } from '../constants';
import { Game } from '../game';


@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {

  game: Game;
  state: GameState = GameState.GAME_ON;
  sentence$: Observable<string>;
  amount_of_sentences: number = 0;
  letter_rows = HangmanConstants.LETTERS;
  stateSubject: Subject<GameState> = new Subject<GameState>();
 
  constructor(
    private gameService: GameService,
    private sentenceService: SentenceService) {
      this.game = new Game();
      this.sentence$ = this.gameService.sentenceObservable();
  }

  ngOnInit(): void {
    this.sentenceService.initialized.asObservable().subscribe(amount_of_sentences => {
        this.amount_of_sentences = amount_of_sentences;
        this.newSentence();
      });
    this.observeCompleted();
  }

  private observeCompleted(): void {
    this.gameService.completeObservable().subscribe((sentence) => {
      this.game.senteceGuessedCorrectly(sentence);
      this.newSentence();;
    });
  }

  newSentence(): void {
    this.stateSubject.next(GameState.GAME_ON);
    this.gameService.setSentence(this.sentenceService.randomSentence());
  }

  onStart(): void {
    this.game = new Game();
    this.newSentence();
  }

  onGuess(letter: string) {
    if (this.gameService.guess(letter)) {
      this.game.letterGuessedCorrectly(letter);
    } else {
      if (this.game.isOver()) {
        this.stateSubject.next(GameState.GAME_OVER);
      }
    }
  }  
}
