import { Injectable } from '@angular/core';
import { Schema } from '../../shared/models/schema.model';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  private _schema: Schema | null = null;
  private _value: any = null;

  setResult(schema: Schema, value: any) {
    this._schema = schema;
    this._value = value;
  }

  get schema() {
    return this._schema;
  }

  get value() {
    return this._value;
  }

  clear() {
    this._schema = null;
    this._value = null;
  }
}
