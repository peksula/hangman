import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs'
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

import { HangmanComponent } from './hangman.component';
import { FirestoreService } from '../services/firestore.service';
import { Sentence } from '../models/sentence';
import { InstructionsComponent } from './instructions/instructions.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { LetterComponent } from './letter/letter.component';
import { ScoreComponent } from './score/score.component';

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
      declarations: [
        HangmanComponent,
        HighScoresComponent,
        InstructionsComponent,
        LetterComponent,
        ScoreComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatExpansionModule,
        MatListModule
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
