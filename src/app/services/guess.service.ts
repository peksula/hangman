import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { ClueService } from './clue.service';
import { HangmanConstants } from '../constants';
import { Sentence } from '../models/sentence';

@Injectable({
  providedIn: 'root'
})
export class GuessService {
  sentence?: Sentence;
  formattedSentenceSubject = new Subject<string>();
  guesses: string[] = [];
  clues: string[] = [];

  constructor(private clueService: ClueService) {
    this.listenClues();
  }
  
  formattedSentence(): Observable<string>{
    return this.formattedSentenceSubject.asObservable();
  }

  guess(letter: string): boolean {
    // Returns true if the guess was correct
    if (!this.guesses.includes(letter)) {
      this.guesses.push(letter);
    }
    this.format();
    if (!this.comparable().includes(letter)) {
      return false;
    }
    return true;
  }

  sentenceCompleted(): boolean {
    let completed: boolean = true;
    this.comparable().split('').forEach(letter => {
      if(!this.knownLetters().includes(letter)) {
        completed = false;
      }
    });
    return completed;
  }

  setSentence(sentence: Sentence) {
    this.sentence = sentence;
    this.guesses = [];
    this.clues = [];
    this.format();
  }

  private comparable(): string {
    // Converts the sentence into upper case format,
    // so that the uppercased letters can be matched against it
    return this.sentence?.title.toUpperCase() || '';
  }

  private format(): void {
    // Formats the string for the presentation
    let formatted: string[] = [];
    this.comparable().split('').forEach(letter => {
      if(this.knownLetters().includes(letter)) {
        formatted.push(letter + ' ');
      } else {
        // Show underscore in place of the letter
        formatted.push('_ ');
      }
    });
    this.formattedSentenceSubject.next(formatted.join(''));
  }

  private listenClues() {
    this.clueService.clue().subscribe(
      letter => {
        this.clues.push(letter)
        this.format();
      }
    );
  }

  private knownLetters(): string[] {
    return [...this.guesses, ...this.clues, ...HangmanConstants.UNMASKED_LETTERS];
  }


}
