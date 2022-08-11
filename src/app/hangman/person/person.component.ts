import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { HangmanConstants } from '../../constants';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, OnDestroy {

  mistakesRemaining: number = HangmanConstants.ALLOWED_MISTAKES;
  private mistakeSubscription!: Subscription;


  constructor(
    private gameService: GameService)
    { }

  ngOnInit(): void {
    this.observeMistakes();
  }

  ngOnDestroy() {
    if (this.mistakeSubscription) {
      this.mistakeSubscription.unsubscribe();
    }
  }

  private observeMistakes() {
    this.mistakeSubscription = this.gameService.mistake().subscribe(
      (mistake) => {
        this.mistakesRemaining = mistake.remaining;
      }
    );
  }  

}
