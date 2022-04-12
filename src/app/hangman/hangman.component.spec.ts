import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs'
import { MatCardModule } from '@angular/material/card';

import { HangmanComponent } from './hangman.component';
import { FirestoreService } from '../services/firestore.service';
import { Sentence } from '../interfaces/sentence';

describe('HangmanComponent', () => {
  let component: HangmanComponent;
  let fixture: ComponentFixture<HangmanComponent>;

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
      declarations: [ HangmanComponent ],
      imports: [
        MatCardModule
      ],
      providers: [ { provide: FirestoreService, useValue: firestoreServiceStub } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HangmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
