import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SchemaField } from '../../models/schema.model';

@Component({
  selector: 'app-toggle-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './toggle-control.component.html',
  styleUrls: ['./toggle-control.component.scss']
})
export class ToggleControlComponent {
  @Input() field!: SchemaField;
  @Input() group!: FormGroup;

  get control() {
    return this.group.get(String(this.field.id));
  }

  get showError(): boolean {
    const c = this.control;
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}
