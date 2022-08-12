import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { HangmanConstants } from '../constants';
import { Sentence } from '../models/sentence';

@Injectable({
  providedIn: 'root'
})
export class ClueService {
  clueSubject: Subject<string> = new Subject<string>();

  constructor() { }

  clue(): Observable<string> {
    return this.clueSubject.asObservable();
  }

  giveClue(sentence: Sentence) {
    let trimmed = this.trimSentence(sentence);
    const amount = this.amountOfClues(trimmed);

    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * trimmed.length);
      const clue = trimmed[randomIndex].toUpperCase();
      trimmed = this.removeLetterByIndex(trimmed, randomIndex);
      this.clueSubject.next(clue);
    }
  }

  amountOfClues(trimmedSentence: string) {
    if (trimmedSentence.length > 1) {
      return Math.floor(Math.max(trimmedSentence.length / HangmanConstants.CLUE_FREQUENCY, 1));
    }
    return 0;
  }

  trimSentence(sentence: Sentence) {
    let trimmed = sentence.title;
    // Remove all special letters
    HangmanConstants.UNMASKED_LETTERS.forEach(unmasked => {
      trimmed = trimmed.replace(unmasked, '');
    });

    // Remove duplicate letters
    return Array.from(new Set(trimmed.split(','))).toString()
  }

  private removeLetterByIndex(str: string, index: number) {
    return str.slice(0, index) + str.slice(index + 1);
  }  
}
