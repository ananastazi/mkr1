import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { ValidatorsService } from './validators.service';

describe('ValidatorsService', () => {
  let service: ValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('notZeroValidator should return null for non-zero values', () => {
    const validatorFn = service.notZeroValidator();
    const control = new FormControl(5);
    expect(validatorFn(control)).toBeNull();
  });

  it('notZeroValidator should return an error object for zero value', () => {
    const validatorFn = service.notZeroValidator();
    const control = new FormControl(0);
    const validationResponse = validatorFn(control);
    expect(validationResponse).toEqual({ 'notZero': { value: 0 } });
  });

  it('notZeroValidator should return null for non-numeric values', () => {
    const validatorFn = service.notZeroValidator();
    // Testing with a string that's not a numeric value
    const control = new FormControl('a');
    expect(validatorFn(control)).toBeNull();
    // Testing with null
    const controlNull = new FormControl(null);
    expect(validatorFn(controlNull)).toBeNull();
  });
});
