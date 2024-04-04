import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { Fraction } from '../classes/Fraction';
import { FractionsOperationsService } from '../service/operationsOnFractions/fractions-operations.service';
import { ValidatorsService } from '../service/validators/validators.service';
import { FractionsOperationOutput } from '../interfaces/FractionsOperationOutput';
import { FractionsCalculationResult } from '../interfaces/FractionsCalculationResult';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  standalone: true,
  styleUrls: ['./input-form.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class InputFormComponent  implements OnInit {
  @Output() fractionsOutput = new EventEmitter<FractionsOperationOutput>();
  @Output() calculationOutput = new EventEmitter<FractionsCalculationResult>();

  isSubmitted = false;
  Operations: any = ['+', '-', '*', '/'];

  constructor(private fb: FormBuilder, private fractionsOperationsService: FractionsOperationsService, private validatorsService: ValidatorsService) { }

  fractionsOperationsForm = this.fb.group({
    operation: ['', [Validators.required]],
    fractions: this.fb.array([]),
  });

  ngOnInit() {
    this.addFraction();
  }

  addFraction() {
    const newFractionFormGroup = this.fb.group({
      numerator: ['', [Validators.required]],
      denominator: ['', [Validators.required, this.validatorsService.notZeroValidator()]]
    });
    this.fractions.push(newFractionFormGroup);
  }  

  deleteFraction(i: any) {
    console.log('Delete fraction');
    (this.fractionsOperationsForm.controls['fractions'] as FormArray).removeAt(i);
  }

  changeOperation(e: any) {
    this.operation?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get operation() {
    return this.fractionsOperationsForm.get('operation');
  }

  getControls() {
    return (this.fractionsOperationsForm.controls['fractions'] as FormArray).controls;
  }

  get fractions(): FormArray {
    return this.fractionsOperationsForm.get('fractions') as FormArray;
  }

  onSubmit() {
    console.log("Form Status:", this.fractionsOperationsForm.status);
    console.log("Form Value:", this.fractionsOperationsForm.value);

    Object.keys(this.fractionsOperationsForm.controls).forEach(key => {
      const controlErrors = this.fractionsOperationsForm.get(key)?.errors;
      if (controlErrors != null) {
          console.log('Control Errors for:', key, controlErrors);
      }
    });    

    if (this.fractionsOperationsForm.valid) {
      this.isSubmitted = true;
      const fractions: Fraction[] = this.fractions.value.map((f: { numerator: number; denominator: number }) => new Fraction(f.numerator, f.denominator));
      let result: Fraction = new Fraction(1, 1); 
  
      switch (this.operation?.value ?? '') {
        case '+':
          result = fractions.reduce((acc: Fraction, fraction: Fraction) => this.fractionsOperationsService.add(acc, fraction), new Fraction(0, 1));
          console.log(result);
          break;
          case '-':
            if (fractions.length > 1) {
              result = fractions.slice(1).reduce((acc: Fraction, fraction: Fraction) => this.fractionsOperationsService.subtract(acc, fraction), fractions[0]);
            } else {
              result = fractions[0];
            }
            console.log(result);
            break;          
        case '*':
          result = fractions.reduce((acc: Fraction, fraction: Fraction) => this.fractionsOperationsService.multiply(acc, fraction), new Fraction(1, 1));
          console.log(result);
          break;
          case '/':
            if (fractions.length > 1) {
              result = fractions.slice(1).reduce((acc: Fraction, fraction: Fraction) => this.fractionsOperationsService.divide(acc, fraction), fractions[0]);
            } else {
              result = fractions[0];
            }
            console.log(result);
            break;          
        default:
          console.log("Unsupported operation");
      }
  
      this.fractionsOutput.emit({ fractions: fractions, operation: this.operation?.value ?? '' });

      this.calculationOutput.emit({
        fractions: fractions,
        operation: this.operation?.value ?? '',
        result: result
      });

      console.log("Result:", result);
      // Here you would typically update the UI to display the result
    } else {
      console.log("Form is not valid. Please review your input.");
    }
  }
  
  
}
