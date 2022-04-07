import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Game } from './game';

import { Sentence } from './models/sentence';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  sentence?: Sentence;
  sentenceSubject = new Subject<string>();
  completeSubject = new Subject<Sentence>();
  guesses: string[] = [];
  unmasked: string[] = [' ', '-', '.']

  constructor() {
  }

  setSentence(sentence: Sentence) {
    this.sentence = sentence;
    console.log(sentence.title);
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
      this.completeSubject.next(this.sentence);
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
    this.sentenceSubject.next(formatted.join(''));
  }

  completeObservable(): Observable<Sentence> {
    return this.completeSubject.asObservable();
  }

  sentenceObservable(): Observable<string> {
    return this.sentenceSubject.asObservable();
  }


}
