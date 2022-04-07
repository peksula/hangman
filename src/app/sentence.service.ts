
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  Firestore, addDoc, collection, collectionData
  //doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';

import { of, from } from 'rxjs';
import { map, tap } from 'rxjs/operators'


import { FirestoreService} from './firestore.service';
import { Sentence } from './models/sentence';

@Injectable({
  providedIn: 'root'
})
export class SentenceService {

  sentences: Sentence[] = [];
  initialized = new Subject<number>();

  constructor(private firestoreService: FirestoreService) {
    this.getSentences();
  }

  private getSentences(): void {
    this.firestoreService.getSentences().subscribe(
      sentences => {
        this.sentences = sentences;
        this.initialized.next(this.sentences.length);
      });
  }

  randomSentence(): Sentence {
    const random = this.randomNumber(this.sentences.length);
    return this.sentences[random];
  }

  private randomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
