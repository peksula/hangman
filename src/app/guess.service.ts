import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sentence } from './models/sentence';

@Injectable({
  providedIn: 'root'
})
export class GuessService {
  sentence?: Sentence;
  formattedSentenceSubject = new Subject<string>();
  successSubject = new Subject<Sentence>();
  guesses: string[] = [];
  unmasked: string[] = [' ', '-', '.']

  constructor() {
  }

  setSentence(sentence: Sentence) {
    this.sentence = sentence;
    this.guesses = [];
    this.format();
  }

  guess(letter: string): boolean {
    if (!this.guesses.includes(letter)) {
      this.guesses.push(letter);
    }
    this.format();
    if (!this.comparable().includes(letter)) {
      return false;
    }
    else{
      this.checkIfcompleted();
      return true;
    }
  }

  private comparable(): string {
    // Converts the sentence into upper case format,
    // so that the uppercased letters can be matched against it
    return this.sentence?.title.toUpperCase() || '';
  }

  private checkIfcompleted(): void {
    let allLetters: boolean = true;
    this.comparable().split('').forEach(letter => {
      if (!this.guesses.includes(letter) && !this.unmasked.includes(letter)) {
        allLetters = false;
      }
    })
    if (allLetters && this.sentence !== undefined) {
      this.successSubject.next(this.sentence);
    }
  }

  format(): void {
    let formatted: string[] = [];
    this.comparable().split('').forEach(letter => {
      if (this.guesses.includes(letter) || this.unmasked.includes(letter)) {
        formatted.push(letter + ' ');
      } else {
        formatted.push('_ ');
      }
    });
    this.formattedSentenceSubject.next(formatted.join(''));
  }
}
