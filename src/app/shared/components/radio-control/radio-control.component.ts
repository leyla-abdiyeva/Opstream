import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { SchemaField } from '../../models/schema.model';

@Component({
  selector: 'app-radio-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './radio-control.component.html',
  styleUrls: ['./radio-control.component.scss']
})
export class RadioControlComponent {
  @Input() field!: SchemaField;
  @Input() group!: FormGroup;

  get control(): AbstractControl | null {
    return this.group.get(`${this.field.id}`) as AbstractControl | null;
  }

  get controlName(): string {
    return `${this.field.id}`;
  }

  get showError(): boolean {
    const c = this.control;
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}
