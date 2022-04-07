import { Observable, Subscription  } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameState } from '../models/state';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {

  private subscription!: Subscription;
  @Input() state!: Observable<GameState>;
  @Input() letter!: string;
  @Output() guessed = new EventEmitter<string>();
  disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.state.subscribe((state) => this.onStateChange(state));
  }

  private onStateChange(state: GameState) {
    if (state == GameState.GAME_ON) {
      this.disabled = false;
    } else if (state == GameState.GAME_OVER) {
      this.disabled = true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClicked(): void {
    this.disabled = true;
    this.guessed.emit(this.letter);
  }  

}
