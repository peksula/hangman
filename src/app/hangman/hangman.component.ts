import { Component, OnInit } from '@angular/core';
import { SentenceService } from '../sentence.service';
import { Sentence } from '../models/sentence';


@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {

  currentSentence?: Sentence;

 
  constructor(private sentenceService: SentenceService) {
  }

  ngOnInit(): void {
  }

  onStart(): void {
    console.log('on start');
    this.currentSentence = this.sentenceService.randomSentence();
    console.log(this.currentSentence);
  }
}
