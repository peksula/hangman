import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs'

import { SentenceService } from './sentence.service';
import { FirestoreService } from '../services/firestore.service';
import { Sentence } from '../interfaces/sentence';

describe('SentenceService', () => {
  let service: SentenceService;
  let firestoreServiceStub: Partial<FirestoreService>;

  const sentences = [
    {
      title: 'my title'
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
});
