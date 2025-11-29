import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SchemaField, SchemaSection } from '../../../shared/models/schema.model';
import { FieldControlComponent } from '../../../shared/components/field-control/field-control.component';
import { RadioControlComponent } from '../../../shared/components/radio-control/radio-control.component';
import {ToggleControlComponent} from '../../../shared/components/toggle-control/toggle-control.component';

@Component({
  selector: 'app-wizard-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldControlComponent,
    RadioControlComponent,
    ToggleControlComponent,
  ],
  templateUrl: './wizard-page.component.html',
  styleUrls: ['./wizard-page.component.scss']
})
export class WizardPageComponent {
  @Input() section!: SchemaSection;
  @Input() group!: FormGroup;
}
