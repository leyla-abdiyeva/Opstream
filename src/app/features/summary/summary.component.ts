import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Schema, SummaryRow } from '../../shared/models/schema.model';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  rows: SummaryRow[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state =
      this.router.currentNavigation()?.extras.state ||
      history.state;

    const schema = state?.schema;
    const value = state?.value;

    if (!schema || !value) return;

    this.rows = this.buildRows(schema, value);
  }

  buildRows(schema: Schema, value: any): SummaryRow[] {
    const rows: SummaryRow[] = [];

    schema.sections.forEach(section => {
      const sectionValue = value[section.id] || {};

      section.fields.forEach(field => {
        const v = sectionValue[field.id];
        rows.push({
          label: field.label,
          value: v !== undefined && v !== '' ? v : 'not answered'
        });
      });
    });

    return rows;
  }

  reset() {
    this.router.navigate(['/']);
  }
}
