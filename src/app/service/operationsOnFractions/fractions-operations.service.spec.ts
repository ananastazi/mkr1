import { TestBed } from '@angular/core/testing';
import { Fraction } from 'src/app/classes/Fraction'; // Adjust the path as necessary
import { FractionsOperationsService } from './fractions-operations.service';

describe('FractionsOperationsService', () => {
  let service: FractionsOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FractionsOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly add two fractions', () => {
    const f1 = new Fraction(1, 2); // 1/2
    const f2 = new Fraction(2, 3); // 2/3
    const result = service.add(f1, f2);
    expect(result.numerator).toBe(7); // (1*3 + 2*2)
    expect(result.denominator).toBe(6); // (2*3)
  });

  it('should correctly subtract two fractions', () => {
    const f1 = new Fraction(3, 4); // 3/4
    const f2 = new Fraction(1, 2); // 1/2
    const result = service.subtract(f1, f2);
    expect(result.numerator).toBe(1); // (3*2 - 1*4)
    expect(result.denominator).toBe(4); // Simplified to 1/4, depending on whether your Fraction class automatically simplifies
  });

  it('should correctly multiply two fractions', () => {
    const f1 = new Fraction(1, 2); // 1/2
    const f2 = new Fraction(2, 3); // 2/3
    const result = service.multiply(f1, f2);
    expect(result.numerator).toBe(1); // (1*2)
    expect(result.denominator).toBe(3); // (2*3)
  });

  it('should correctly divide two fractions', () => {
    const f1 = new Fraction(3, 4); // 3/4
    const f2 = new Fraction(1, 2); // 1/2
    const result = service.divide(f1, f2);
    expect(result.numerator).toBe(3); // (3*2)
    expect(result.denominator).toBe(2); // (4*1)
  });

  it('should throw an error when dividing by a fraction with zero numerator', () => {
    const f1 = new Fraction(1, 2); // 1/2
    const f2 = new Fraction(0, 1); // 0/1
    expect(() => service.divide(f1, f2)).toThrowError("Cannot divide by a fraction with zero as numerator.");
  });
});
