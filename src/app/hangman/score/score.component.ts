import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { HangmanConstants } from '../../constants';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  pointsPerLetter: number = HangmanConstants.POINTS_FOR_LETTER;
  pointsPerSentence: number = HangmanConstants.POINTS_FOR_SENTENCE;

  @Input() game: Game = new Game();

  constructor() { }

  ngOnInit(): void {
  }

  progress() : number {
    if (this.game.totalSentences == 0) {
      return 0;
    } else {
      return Math.round(this.game.correctSentences.length / this.game.totalSentences * 100);
    }
  }


}