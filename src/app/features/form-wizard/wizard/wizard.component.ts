// import { Component, OnInit, computed, signal } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import {ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
// import { Schema, SchemaSection } from '../../../shared/models/schema.model';
// import { SchemaService } from '../../../core/services/schema.service';
// import { AutosaveService } from '../../../core/services/autosave.service';
// import { WizardPageComponent } from '../wizard-page/wizard-page.component';
//
// @Component({
//   standalone: true,
//   templateUrl: './wizard.component.html',
//   styleUrls: ['./wizard.component.scss'],
//   imports: [CommonModule, ReactiveFormsModule, WizardPageComponent]
// })
// export class WizardComponent implements OnInit {
//   schema = signal<Schema | null>(null);
//   form!: FormGroup;
//   pageIndex = signal(0);
//
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private schemaService: SchemaService,
//     private autosave: AutosaveService,
//     private fb: FormBuilder
//   ) {}
//
//   ngOnInit() {
//     const id = this.route.snapshot.paramMap.get('schemaId');
//     const data = this.schemaService.getSchema(id);
//
//     if (!data) {
//       this.router.navigate(['/']);
//       return;
//     }
//
//     this.schema.set(data);
//     this.form = this.buildForm(data);
//
//     this.autosave.watch(this.form).subscribe();
//   }
//
//   buildForm(schema: Schema): FormGroup {
//     const group: Record<string, any> = {};
//
//     schema.sections.forEach(s => {
//       const controls: Record<string, any> = {};
//
//       s.fields.forEach(f => {
//         const validators = [];
//         if (f.required) validators.push(Validators.required);
//
//         controls[String(f.id)] = this.fb.control(f.default ?? '', validators);
//       });
//
//       group[s.id] = this.fb.group(controls);
//     });
//
//     return this.fb.group(group);
//   }
//
//   sections = computed(() => this.schema()?.sections ?? []);
//
//   get currentSection(): SchemaSection {
//     return this.sections()[this.pageIndex()];
//   }
//
//   get currentGroup(): FormGroup {
//     return this.form.get(this.currentSection.id) as FormGroup;
//   }
//
//   goNext() {
//     const group = this.currentGroup;
//     group.markAllAsTouched();
//     if (group.invalid) return;
//
//     this.pageIndex.update(i => i + 1);
//   }
//
//   goPrev() {
//     this.pageIndex.update(i => i - 1);
//   }
//
//   isLastPage() {
//     return this.pageIndex() === this.sections().length - 1;
//   }
//
//   submit() {
//     this.form.markAllAsTouched();
//     if (this.form.invalid) return;
//
//     this.router.navigate(['/summary'], {
//       state: { schema: this.schema(), value: this.form.value }
//     });
//   }
//
// }




import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Schema, SchemaSection } from '../../../shared/models/schema.model';
import { SchemaService } from '../../../core/services/schema.service';
import { AutosaveService } from '../../../core/services/autosave.service';
import { WizardPageComponent } from '../wizard-page/wizard-page.component';
import { SummaryService } from '../../../core/services/summary.service';

@Component({
  standalone: true,
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, WizardPageComponent]
})
export class WizardComponent implements OnInit {
  schema = signal<Schema | null>(null);
  form!: FormGroup;
  pageIndex = signal(0);

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private schemaService: SchemaService,
      private autosave: AutosaveService,
      private fb: FormBuilder,
      private summaryService: SummaryService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('schemaId');
    const data = this.schemaService.getSchema(id);

    if (!data) {
      this.router.navigate(['/']);
      return;
    }

    this.schema.set(data);
    this.form = this.buildForm(data);

    this.autosave.watch(this.form).subscribe();
  }

  buildForm(schema: Schema): FormGroup {
    const group: Record<string, any> = {};

    schema.sections.forEach(section => {
      const controls: Record<string, any> = {};

      section.fields.forEach(field => {
        const validators = field.required ? [Validators.required] : [];
        controls[field.id] = this.fb.control(field.default ?? '', validators);
      });

      group[section.id] = this.fb.group(controls);
    });

    return this.fb.group(group);
  }



  sections = computed(() => this.schema()?.sections ?? []);

  get currentSection(): SchemaSection {
    return this.sections()[this.pageIndex()];
  }

  get currentGroup(): FormGroup {
    return this.form.get(this.currentSection.id) as FormGroup;
  }

  goNext() {
    const group = this.currentGroup;
    group.markAllAsTouched();

    if (group.invalid) return;

    this.pageIndex.update(i => i + 1);
  }


  goPrev() {
    this.pageIndex.update(i => i - 1);
  }

  isLastPage() {
    return this.pageIndex() === this.sections().length - 1;
  }

  submit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.router.navigate(['/summary'], {
      state: { schema: this.schema(), value: this.form.value }
    });
  }


}
