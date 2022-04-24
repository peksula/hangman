import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { GameState } from '../../models/state';

import { LetterComponent } from './letter.component';

describe('LetterComponent', () => {
  let component: LetterComponent;
  let fixture: ComponentFixture<LetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create in disabled state', () => {
    expect(component).toBeTruthy();
    expect(component.disabled).toBeTrue();
  });

  it('emits when clicked', (done) => {
    component.letter = 'A';
    component.guessed.pipe(first()).subscribe((letter) => {
      if (letter == 'A') {
        done();
      }
    });
    component.onClicked();
    expect(component.disabled).toBeTrue();
  });

  it('changes to disabled state when clicked', () => {
    component.disabled = false;
    component.onClicked();
    expect(component.disabled).toBeTrue();
  });

  it('changes to enabled state when game starts', () => {
    expect(component.disabled).toBeTrue();
    component.onStateChange(GameState.STARTED);
    expect(component.disabled).toBeFalse();
  });

  it('changes to enabled state when new sentence is started', () => {
    expect(component.disabled).toBeTrue();
    component.onStateChange(GameState.GUESSING_SENTENCE);
    expect(component.disabled).toBeFalse();
  });

  it('changes to disabled state when game fails', () => {
    component.disabled = false;
    component.onStateChange(GameState.FAILED);
    expect(component.disabled).toBeTrue();
  });

  it('changes to disabled state when game completes', () => {
    component.disabled = false;
    component.onStateChange(GameState.COMPLETED);
    expect(component.disabled).toBeTrue();
  });

});
