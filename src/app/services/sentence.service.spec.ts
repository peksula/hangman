import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { FirestoreService } from '../services/firestore.service';
import { firestoreServiceStub, FakeData } from '../services/firestore.stub.service';
import { SentenceService } from './sentence.service';

describe('SentenceService', () => {
  let service: SentenceService;

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

  it('reset loads sentences again', (done) => {
    service.ready().pipe(first()).subscribe(total => {
      expect(total).toBe(FakeData.SENTENCES.length);
      expect(service.totalSentences).toBe(FakeData.SENTENCES.length);
      done();
    });
    expect(service.totalSentences).toBe(0);
    service.reset();
  });

  it('provides unique sentences', (done) => {
    service.ready().pipe(first()).subscribe(total => {
      const length = FakeData.SENTENCES.length;
      expect(total).toEqual(length);
      let returned = [];
      for (let i=0; i < length; i++) {
        const random = service.randomSentence();
        expect(random).toBeTruthy();
        expect(returned.includes(random)).toBeFalse();
        returned.push(random);
      }
      const final = service.randomSentence();
      expect(returned.length).toBe(length);
      expect(final).toBeUndefined();
      expect(service.sentences).toEqual([]);
      done();
    });
    service.reset();
  });
});
