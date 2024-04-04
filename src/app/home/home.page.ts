import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputFormComponent } from '../input-form/input-form.component';
import { Fraction } from '../classes/Fraction';
import { CommonModule } from '@angular/common';
import { FractionsOperationOutput } from '../interfaces/FractionsOperationOutput';
import { FractionsCalculationResult } from '../interfaces/FractionsCalculationResult';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, InputFormComponent, CommonModule],
})
export class HomePage {
  fractions: Fraction[] = [];
  operation: string = '';
  result: Fraction = new Fraction(1, 1);

  isCalculated: boolean = false;


  handleFractionsOutput(data: FractionsOperationOutput) {
    this.fractions = data.fractions;
    this.operation = data.operation;
  }

  handleCalculationOutput(data: FractionsCalculationResult) {
    this.fractions = data.fractions;
    this.operation = data.operation;
    this.result = data.result;
    this.isCalculated = true;
  }
}
