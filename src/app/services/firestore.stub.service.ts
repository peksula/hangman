import { Observable, of } from 'rxjs'

import { FirestoreService } from '../services/firestore.service';
import { Sentence } from '../models/sentence';

export let firestoreServiceStub: Partial<FirestoreService>;

export class FakeData 
{
  static readonly MY_STRUGGLE_1 = {
    title: 'my struggle 1',
    help: 'help text'
  } as Sentence;
  static readonly MY_STRUGGLE_2 = {
    title: 'my struggle 2',
    help: 'help text'
  } as Sentence;
  static readonly MY_STRUGGLE_3 = {
    title: 'my struggle 3',
    help: 'help text'
  } as Sentence;
  static readonly MY_STRUGGLE_4 = {
    title: 'my struggle 4',
    help: 'help text'
  } as Sentence;

  static readonly SENTENCES = [
    FakeData.MY_STRUGGLE_1,
    FakeData.MY_STRUGGLE_2,
    FakeData.MY_STRUGGLE_3,
    FakeData.MY_STRUGGLE_4
  ];
}

firestoreServiceStub = {
  getSentences(): Observable<Sentence[]> {
    return of(FakeData.SENTENCES);
  }
};
