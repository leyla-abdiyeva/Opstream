import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SchemaField } from '../../models/schema.model';

@Component({
  selector: 'app-field-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './field-control.component.html',
  styleUrls: ['./field-control.component.scss']
})
export class FieldControlComponent {
  @Input() field!: SchemaField;
  @Input() group!: FormGroup;

  get control(): AbstractControl | null {
    return this.group.get(`${this.field.id}`) as AbstractControl | null;
  }

  get showError(): boolean {
    const c = this.control;
    if (!c) {
      return false;
    }
    return c.invalid && (c.dirty || c.touched);
  }
}
