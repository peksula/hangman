import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { FirestoreService } from 'src/app/services/firestore.service';
import { firestoreServiceStub } from 'src/app/services/firestore.stub.service';
import { GameService } from 'src/app/services/game.service';
import { ScoreComponent } from './score.component';
import { Sentence } from '../../models/sentence';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreComponent ],
      imports: [
        MatCardModule
      ],
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceStub }
      ]
    })
    .compileComponents();
    gameService = TestBed.inject(GameService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate game progress correctly when no progress has been made', () => {
    expect(component.progress()).toEqual('0');
  });

  it('should calculate game progress correctly', () => {
    const sentence = {
      title: 'my title',
      help:' my help'
    } as Sentence;

    component.correctSentences.push(sentence);
    expect(component.progress()).toEqual('0');
    
    component.totalSentences = 2;
    expect(component.progress()).toEqual('1/2 (50%)');

    component.correctSentences.push(sentence);
    expect(component.progress()).toEqual('2/2 (100%)');
    
    component.totalSentences = 3;
    expect(component.progress()).toEqual('2/3 (67%)');
  });

});
