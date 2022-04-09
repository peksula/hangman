import { Component } from '@angular/core';
import { HangmanConstants } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = HangmanConstants.TITLE;
}
