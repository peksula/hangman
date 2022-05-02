import { Component } from '@angular/core';
import { HangmanConstants } from 'src/app/constants';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {

  maxHelpUse = HangmanConstants.ALLOWED_HELPS;
  helpPenalty = HangmanConstants.HELP_PENALTY;
  pointsPerLetter = HangmanConstants.POINTS_FOR_LETTER;
  pointsPerSentence = HangmanConstants.POINTS_FOR_SENTENCE;

  constructor() {
  }

}
