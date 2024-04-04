export class Fraction {
    numerator: number;
    denominator: number;

    constructor(numerator: number, denominator: number) {
        if (denominator === 0) {
            throw new Error("Denominator cannot be zero.");
        }
        this.numerator = numerator;
        this.denominator = denominator;
        this.simplify();
    }

    simplify(): Fraction {
        const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
        let divisor = gcd(this.numerator, this.denominator);
        this.numerator /= divisor;
        this.denominator /= divisor;
        return this;
    }
}
