
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import {
  Firestore, addDoc, collection, collectionData
  //doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';

import { FirestoreService} from './firestore.service';
import { Sentence } from '../interfaces/sentence';

@Injectable({
  providedIn: 'root'
})
export class SentenceService {

  sentences: Sentence[] = [];
  totalSentences: number = 0;

  constructor(private firestoreService: FirestoreService) {
    this.getSentences();
  }

  private getSentences(): void {
    this.firestoreService.getSentences().pipe(first()).subscribe(
      sentences => {
        this.totalSentences = sentences.length;
        this.sentences = this.shuffle(sentences);
      });
  }

  randomSentence(): Sentence | undefined {
    return this.sentences.pop(); 
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
      [sentences[currentIndex], sentences[randomIndex]] = [sentences[randomIndex], sentences[currentIndex]];
    }
    return sentences;
  }
}