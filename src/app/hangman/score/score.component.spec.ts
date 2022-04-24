import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { ScoreComponent } from './score.component';
import { Sentence } from '../../models/sentence';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreComponent ],
      imports: [
        MatCardModule
      ]      
    })
    .compileComponents();
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
    expect(component.progress()).toEqual(0);
  });

  it('should calculate game progress correctly', () => {
    const sentence = {
      title: 'my title',
      help:' my help'
    } as Sentence;

    component.game.totalSentences = 10;
    expect(component.progress()).toEqual(0);

    component.game.correctSentences.push(sentence);
    expect(component.progress()).toEqual(10);

    component.game.correctSentences.push(sentence);
    expect(component.progress()).toEqual(20);

    component.game.totalSentences = 3;
    expect(component.progress()).toEqual(67);
  });

});
