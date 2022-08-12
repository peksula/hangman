import { Subscription  } from 'rxjs';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { ClueService } from '../../services/clue.service';
import { GameService } from '../../services/game.service';
import { GameState } from '../../models/state';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit, OnDestroy {

  @Input() letter!: string;
  @Output() guessed = new EventEmitter<string>();
  disabled: boolean = true;
  private gameStateSubscription!: Subscription;
  private clueSubscription!: Subscription;

  constructor(
    private gameService: GameService,
    private clueService: ClueService) {
  }

  ngOnInit(): void {
    this.gameStateSubscription = this.gameService.gameState().subscribe(
      (state) => this.onStateChange(state)
    );
    this.clueSubscription = this.clueService.clue().subscribe(
      (letter) => {
        if (letter == this.letter) {
          this.disabled = true;
        }
      }
    );

  }

  ngOnDestroy() {
    if (this.gameStateSubscription) {
      this.gameStateSubscription.unsubscribe();
    } 
    if (this.clueSubscription) {
      this.clueSubscription.unsubscribe();
    } 
  }

  onClicked(): void {
    this.disabled = true;
    this.guessed.emit(this.letter);
  }  

  onStateChange(state: GameState) {
    if (state == GameState.NEXT_SENTENCE || state == GameState.STARTED) {
      this.disabled = false;
    } else if (state == GameState.FAILED || state == GameState.COMPLETED) {
      this.disabled = true;
    }
  }
}
