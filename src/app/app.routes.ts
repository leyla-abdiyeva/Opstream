import { Routes } from '@angular/router';
import {StartComponent} from './features/start/start.component';
import {WizardComponent} from './features/form-wizard/wizard/wizard.component';
import {SummaryComponent} from './features/summary/summary.component';

export const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'wizard/:schemaId', component: WizardComponent },
  { path: 'summary', component: SummaryComponent },
  { path: '**', redirectTo: '' }
];
