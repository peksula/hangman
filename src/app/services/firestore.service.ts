
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore, addDoc, collection, collectionData
  //doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';

import { Sentence } from '../interfaces/sentence';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {
  }

  getSentences(): Observable<Sentence[]> {
    const sentencesRef = collection(this.firestore, 'sentences'); 
    return collectionData(sentencesRef, { idField: 'id' }) as Observable<Sentence[]>;
  }    

  createSentence(sentence: Sentence): any {
    const sentencesRef = collection(this.firestore, 'sentences'); 
    return addDoc(sentencesRef, sentence);
  }  
}
