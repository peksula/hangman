
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { FirestoreService} from './firestore.service';
import { Sentence } from '../models/sentence';

@Injectable({
  providedIn: 'root'
})
export class SentenceService {

  sentences: Sentence[] = [];
  totalSentences: number = 0;
  private readySubject: Subject<number> = new Subject<number>();

  constructor(private firestoreService: FirestoreService) {
  }

  randomSentence(): Sentence | undefined {
    return this.sentences.pop(); 
  }

  ready(): Observable<number> {
    return this.readySubject.asObservable();
  }

  reset()  {
    this.getSentences();
  }

  private getSentences(): void {
    this.firestoreService.getSentences().pipe(first()).subscribe(
      sentences => {
        this.totalSentences = sentences.length;
        this.sentences = this.shuffle(sentences);
        this.readySubject.next(this.totalSentences);
      });
  }

  private shuffle(sentences: Sentence[]): Sentence[] {
    // Fisher Yates
    let currentIndex = sentences.length,  randomIndex;
    // While there remain elements to shuffle
    while (currentIndex != 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [sentences[currentIndex], sentences[randomIndex]] =
        [sentences[randomIndex], sentences[currentIndex]];
    }
    return sentences;
  }
}