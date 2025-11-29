import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  debounceTime,
  delay,
  map,
  Observable,
  of,
  retry,
  switchMap,
  throwError,
  catchError
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutosaveService {

  save(form: FormGroup): Observable<void> {
    const fail = Math.random() < 0.15; // 15% failure
    const delayMs = 600 + Math.random() * 400;

    return (fail ? throwError(() => new Error('fail')) : of(null)).pipe(
      delay(delayMs),
      map(() => undefined)
    );
  }

  watch(form: FormGroup): Observable<void> {
    return form.valueChanges.pipe(
      debounceTime(500),
      switchMap(() =>
        this.save(form).pipe(
          retry(2),
          catchError(err => {
            console.warn('Autosave failed:', err.message);
            return of(undefined);
          })
        )
      )
    );
  }
}
