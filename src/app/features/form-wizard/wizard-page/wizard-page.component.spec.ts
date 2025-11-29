import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardPageComponent } from './wizard-page.component';

describe('WizardPageComponent', () => {
  let component: WizardPageComponent;
  let fixture: ComponentFixture<WizardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
