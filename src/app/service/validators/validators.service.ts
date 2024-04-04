import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  constructor() {}

  notZeroValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isNotZero = control.value !== 0;
      return isNotZero ? null : { 'notZero': { value: control.value } };
    };
  }
}
