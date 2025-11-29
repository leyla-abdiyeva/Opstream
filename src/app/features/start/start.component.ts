import {Component, computed, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SchemaService } from '../../core/services/schema.service';
import { Schema } from '../../shared/models/schema.model';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  schemas = signal<Schema[]>([]);
  selectedId = signal<string | null>(null);

  constructor(
    private readonly schemaService: SchemaService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.schemaService.getSchemas().subscribe(s => this.schemas.set(s));
  }

  isSelected(id: string): boolean {
    return this.selectedId() === id;
  }

  select(id: string) {
    this.selectedId.set(id);
  }

  start() {
    const id = this.selectedId();
    if (!id) return;
    this.router.navigate(['/wizard', id]);
  }
}
