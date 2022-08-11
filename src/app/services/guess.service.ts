import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { HangmanConstants } from '../constants';
import { Sentence } from '../models/sentence';

@Injectable({
  providedIn: 'root'
})
export class GuessService {
  sentence?: Sentence;
  clueSubject: Subject<string> = new Subject<string>();
  formattedSentenceSubject = new Subject<string>();
  guesses: string[] = [];
  clues: string[] = [];

  constructor() {
  }

  clue(): Observable<string> {
    return this.clueSubject.asObservable();
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

  giveClue() {
    if (this.sentence && this.sentence.title.length > 1) {
      let trimmed = this.sentence?.title;
      HangmanConstants.UNMASKED_LETTERS.forEach(unmasked => {
        trimmed = trimmed.replace(unmasked, '');
      });
      const clueFrequency = Math.floor(Math.max(trimmed.length / HangmanConstants.CLUE_FREQUENCY, 1));
      for (let i = 0; i < clueFrequency; i++) {
        const randomIndex = Math.floor(Math.random() * trimmed.length);
        const clue = trimmed[randomIndex].toUpperCase();
        trimmed = this.removeByIndex(trimmed, randomIndex);
        this.clues.push(clue);
        this.clueSubject.next(clue);
      }
    }
    this.format();
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

  private removeByIndex(str: string, index: number) {
    return str.slice(0, index) + str.slice(index + 1);
  }  

}
