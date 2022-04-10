import { Observable, Subscription  } from 'rxjs';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Game } from '../game';
import { GameState } from '../models/state';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit, OnDestroy {

  @Input() game!: Game;
  @Input() letter!: string;
  @Output() guessed = new EventEmitter<string>();
  disabled: boolean = true;
  private subscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.game.stateObservable().subscribe(
      (state) => this.onStateChange(state)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClicked(): void {
    this.disabled = true;
    this.guessed.emit(this.letter);
  }  

  private onStateChange(state: GameState) {
    if (state == GameState.GUESSING_SENTENCE || state == GameState.STARTED) {
      this.disabled = false;
    } else if (state == GameState.FAILED || state == GameState.COMPLETED) {
      this.disabled = true;
    }
  }
}
