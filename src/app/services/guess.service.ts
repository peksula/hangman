import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

  constructor() {
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

  setSentence(sentence: Sentence, giveClue: boolean = true) {
    this.sentence = sentence;
    this.guesses = [];
    this.clues = [];
    if (giveClue) {
      this.giveClue();
    }
    this.format();
  }

  private giveClue() {
    if (this.sentence && this.sentence.title.length > 1) {
      const randomIndex = Math.floor(Math.random() * this.sentence?.title.length);
      this.clues.push(this.sentence.title[randomIndex].toUpperCase());
    }
  }

  private knownLetters(): string[] {
    return [...this.guesses, ...this.clues, ...HangmanConstants.UNMASKED_LETTERS];
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
}
