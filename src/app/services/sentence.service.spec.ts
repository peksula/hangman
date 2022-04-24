import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs'

import { SentenceService } from './sentence.service';
import { FirestoreService } from '../services/firestore.service';
import { Sentence } from '../models/sentence';

describe('SentenceService', () => {
  let service: SentenceService;
  let firestoreServiceStub: Partial<FirestoreService>;

  const sentences = [
    {
      title: 'my struggle 1'
    } as Sentence,
    {
      title: 'my struggle 2'
    } as Sentence,
    {
      title: 'my struggle 3'
    } as Sentence,
    {
      title: 'my struggle 4'
    } as Sentence
  ];

  firestoreServiceStub = {
    getSentences(): Observable<Sentence[]> {
      return of(sentences);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ { provide: FirestoreService, useValue: firestoreServiceStub } ]
    })
    .compileComponents();
    service = TestBed.inject(SentenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('provides unique sentences', () => {
    let returned = [];
    for (let i=0; i < sentences.length; i++) {
      const random = service.randomSentence();
      expect(random).toBeTruthy();
      expect(returned.includes(random)).toBeFalse();
      returned.push(random);
    }
    expect(service.randomSentence()).toBeUndefined();
  });
});
