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

  correctSentences: Sentence[] = [];
  score: number = 0;
  totalSentences: number = 0;
  private scoreSubscription!: Subscription;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.scoreSubscription = this.gameService.score().subscribe(
      (scoring) => {
        this.score = scoring.score;
        this.correctSentences = scoring.correctSentences;
        this.totalSentences = this.gameService.game.totalSentences;
      }
    ); 
  }

  ngOnDestroy(): void {
    if (this.scoreSubscription) {
      this.scoreSubscription.unsubscribe();
    }     
  }

  progress() : string {
    if (this.correctSentences.length > 0 && this.totalSentences > 0) {
      return this.correctSentences.length + '/' + this.totalSentences + ' (' + 
        (Math.round(this.correctSentences.length / this.totalSentences * 100)) + '%)';
    }
    return '0';
  }
}
