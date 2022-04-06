import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore, addDoc, collection, collectionData
  //doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Episode } from './models/episode';
@Injectable({
  providedIn: 'root'
})

export class EpisodeService {
    constructor(private firestore: Firestore) {
    }

    getEpisodes(): Observable<Episode[]> {
      const episodesRef = collection(this.firestore, 'episodes'); 
      return collectionData(episodesRef, { idField: 'id' }) as Observable<Episode[]>;
    }    
  
    create(episode: Episode): any {
      const episodesRef = collection(this.firestore, 'episodes'); 
      return addDoc(episodesRef, episode);
    }
}
