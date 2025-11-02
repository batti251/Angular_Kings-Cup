import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardEffectComponent } from './game-card-effect.component';

describe('GameCardEffectComponent', () => {
  let component: GameCardEffectComponent;
  let fixture: ComponentFixture<GameCardEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCardEffectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameCardEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
