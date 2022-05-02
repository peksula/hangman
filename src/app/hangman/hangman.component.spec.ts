import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { first } from 'rxjs/operators';

import { FirestoreService } from '../services/firestore.service';
import { firestoreServiceStub, FakeData } from '../services/firestore.stub.service';
import { GameService } from '../services/game.service';
import { GuessService } from '../services/guess.service';
import { HangmanComponent } from './hangman.component';
import { HangmanConstants } from '../constants';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { LetterComponent } from './letter/letter.component';
import { ScoreComponent } from './score/score.component';
import { SentenceService } from '../services/sentence.service';
import { GameState } from '../models/state';

describe('HangmanComponent', () => {
  let component: HangmanComponent;
  let fixture: ComponentFixture<HangmanComponent>;
  let gameService: GameService;
  let guessService: GuessService;
  let sentenceService: SentenceService;
  
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
      providers: [
          { provide: FirestoreService, useValue: firestoreServiceStub }
        ]
    })
    .compileComponents();
    gameService = TestBed.inject(GameService);
    guessService = TestBed.inject(GuessService);
    sentenceService = TestBed.inject(SentenceService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HangmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initializes with help, start, and next button in correct states', () => {
    expect(component.startButtonEnabled).toBeTrue();
    expect(component.helpButtonEnabled).toBeFalse();
    expect(component.nextButtonEnabled).toBeFalse();
  });

  it('registers wrong guess', () => {
    component.onGuess('X');
    expect(component.mistakesRemaining).toBe(HangmanConstants.ALLOWED_MISTAKES - 1);
  });

  it('requests help', () => {
    component.onHelp();
    expect(component.helpRemaining).toBe(HangmanConstants.ALLOWED_HELPS - 1);
  });

  it('resets message when start button pressed', () => {
    component.message = 'my message';
    component.onStart()
    expect(component.message).toEqual('');
  });

  it('sets the button states correctly when game starts', (done) => {
    gameService.gameState().pipe(first()).subscribe(
      (state) => {
        if (state === GameState.STARTED) {
          expect(component.startButtonEnabled).toBeFalse();
          expect(component.helpButtonEnabled).toBeTrue();
          expect(component.nextButtonEnabled).toBeFalse();
          expect(component.message).toEqual('');
          expect(component.helpRemaining = HangmanConstants.ALLOWED_HELPS);
          done();
        }
      });
    component.message = 'trust no one';
    component.onStart();
  });

  it('sets the button states correctly when sentence is completed', (done) => {
    gameService.gameState().pipe(first()).subscribe(
      (state) => {
        if (state === GameState.SENTENCE_COMPLETED) {
          expect(component.startButtonEnabled).toBeFalse();
          expect(component.helpButtonEnabled).toBeFalse();
          expect(component.nextButtonEnabled).toBeTrue();
          done();
        }
      });
    component.helpButtonEnabled = false;
    gameService.stateSubject.next(GameState.SENTENCE_COMPLETED);
  });

  it('sets the button states correctly when a new sentence is started', (done) => {
    gameService.gameState().pipe(first()).subscribe(
      (state) => {
        if (state === GameState.NEXT_SENTENCE) {
          expect(component.startButtonEnabled).toBeFalse();
          expect(component.nextButtonEnabled).toBeFalse();
          expect(component.message).toEqual('');
          done();
        }
      });
    component.message = 'trust no one';
    gameService.stateSubject.next(GameState.NEXT_SENTENCE);
  });

  it('sets the button states correctly when game fails', (done) => {
    gameService.gameState().pipe(first()).subscribe(
      (state) => {
        if (state === GameState.FAILED) {
          expect(component.startButtonEnabled).toBeTrue();
          expect(component.nextButtonEnabled).toBeFalse();
          expect(component.helpButtonEnabled).toBeFalse();
          done();
        }
      });
    gameService.stateSubject.next(GameState.FAILED);
  });



});
