import { Injectable } from '@angular/core';
import { Fraction } from 'src/app/classes/Fraction';

@Injectable({
  providedIn: 'root'
})
export class FractionsOperationsService {

  constructor() { }

  add(f1: Fraction, f2: Fraction): Fraction {
    const numerator = f1.numerator * f2.denominator + f2.numerator * f1.denominator;
    const denominator = f1.denominator * f2.denominator;
    return new Fraction(numerator, denominator);
  }

  subtract(f1: Fraction, f2: Fraction): Fraction {
    const numerator = f1.numerator * f2.denominator - f2.numerator * f1.denominator;
    const denominator = f1.denominator * f2.denominator;
    return new Fraction(numerator, denominator);
  }

  multiply(f1: Fraction, f2: Fraction): Fraction {
    const numerator = f1.numerator * f2.numerator;
    const denominator = f1.denominator * f2.denominator;
    return new Fraction(numerator, denominator);
  }

  divide(f1: Fraction, f2: Fraction): Fraction {
    if (f2.numerator === 0) {
      throw new Error("Cannot divide by a fraction with zero as numerator.");
    }
    const numerator = f1.numerator * f2.denominator;
    const denominator = f1.denominator * f2.numerator;
    return new Fraction(numerator, denominator);
  }
}
