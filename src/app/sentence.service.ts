
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  Firestore, addDoc, collection, collectionData
  //doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';

import { FirestoreService} from './firestore.service';
import { Sentence } from './models/sentence';

@Injectable({
  providedIn: 'root'
})
export class SentenceService {

  sentences: Sentence[] = [];
  sentenceSubject = new Subject<Sentence>();

  constructor(private firestoreService: FirestoreService) {
    this.getSentences();
  }

  private getSentences(): void {
    this.firestoreService.getSentences().subscribe(
      sentences => {
        this.sentences = sentences;
      });
  }

  sentenceObservable(): Observable<Sentence> {
    return this.sentenceSubject.asObservable();
  }

  randomSentence(): Sentence {
    const random = this.randomNumber(this.sentences.length);
    const randomSentence = this.sentences[random];
    this.sentenceSubject.next(randomSentence);
    return randomSentence;
  }

  private randomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
