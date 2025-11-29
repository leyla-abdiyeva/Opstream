import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleControlComponent } from './toggle-control.component';

describe('ToggleControlComponent', () => {
  let component: ToggleControlComponent;
  let fixture: ComponentFixture<ToggleControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleControlComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
