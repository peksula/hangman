import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
export class HangmanComponent implements OnInit {

  game: Game;
  state: GameState = GameState.GAME_ON;
  currentSentence!: Sentence;
  sentence$: Observable<string>;
  helpText!: string;
  letter_rows = HangmanConstants.LETTERS;
  stateSubject: Subject<GameState> = new Subject<GameState>();
 
  constructor(
    private guessService: GuessService,
    private sentenceService: SentenceService) {
      this.game = new Game();
      this.sentence$ = this.guessService.formattedSentenceSubject.asObservable();
  }

  ngOnInit(): void {
    this.sentenceService.initialized.asObservable().subscribe(amount_of_sentences => {
        this.newSentence();
      });
    this.observeCompleted();
  }

  private observeCompleted(): void {
    this.guessService.successSubject.asObservable().subscribe((sentence) => {
      this.game.senteceGuessedCorrectly(sentence);
      this.newSentence();;
    });
  }

  newSentence(): void {
    this.stateSubject.next(GameState.GAME_ON);
    this.currentSentence = this.sentenceService.randomSentence();
    this.guessService.setSentence(this.currentSentence);
    this.helpText = '';
  }

  onStart(): void {
    this.game = new Game();
    this.newSentence();
  }

  onHelp(): void {
    this.game.help();
    this.helpText = this.currentSentence.help || this.currentSentence.category;
  }

  onGuess(letter: string) {
    if (this.guessService.guess(letter)) {
      this.game.letterGuessedCorrectly(letter);
    } else {
      if (this.game.isOver()) {
        this.stateSubject.next(GameState.GAME_OVER);
      }
    }
  }  
}
