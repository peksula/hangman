import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GameService } from 'src/app/services/game.service';
import { Sentence } from '../../models/sentence';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit, OnDestroy {

  private scoreSubscription!: Subscription;
  score: number = 0;
  correctSentences: Sentence[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.scoreSubscription = this.gameService.score().subscribe(
      (scoring) => {
        this.score = scoring.score;
        this.correctSentences = scoring.correctSentences;
      }
    );    
  }

  ngOnDestroy(): void {
    if (this.scoreSubscription) {
      this.scoreSubscription.unsubscribe();
    }     
  }

  progress() : number {
    return this.correctSentences.length;
  }

}
