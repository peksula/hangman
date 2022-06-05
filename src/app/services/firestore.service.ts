
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, signInAnonymously, signOut } from '@angular/fire/auth';
import {Firestore, addDoc, collection, collectionData
  //doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';

import { Sentence } from '../models/sentence';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore, private auth: Auth) {
    this.login();
  }

  ngOnDestroy() {
    this.logout();
  }

  getSentences(): Observable<Sentence[]> {
    const sentencesRef = collection(this.firestore, 'sentences'); 
    return collectionData(sentencesRef, { idField: 'id' }) as Observable<Sentence[]>;
  }    

  /*
  createSentence(sentence: Sentence): any {
    const sentencesRef = collection(this.firestore, 'sentences'); 
    return addDoc(sentencesRef, sentence);
  } 
  */ 

  private login(): void {
    signInAnonymously(this.auth).then(_userCredential => {
      console.log('signed in');
    }).catch(error => {
      console.log('failed to sign in ' + error.code + ' ' + error.message);
    })
  }

  private logout(): void {
    signOut(this.auth).then(() => {
      console.log('signed out');
    }).catch(error => {
      console.log('failed to sign out ' + error.code + ' ' + error.message);
    })
  }

}
