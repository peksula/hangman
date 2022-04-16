import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  @Input() game: Game = new Game();

  constructor() { }

  ngOnInit(): void {
  }

}
