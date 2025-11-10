import { BASIC_RATE } from "./income_tax";

const BEGIN_REDUCTION_INCOME = 100000;
export const STANDARD_PERSONAL_ALLOWANCE = 12570;

export const calculatePersonalAllowance = (income: number): number => {
    const standardAllowance = STANDARD_PERSONAL_ALLOWANCE;
    if (income < BEGIN_REDUCTION_INCOME) {
        return standardAllowance;
    } else {
        const reduction = (income - BEGIN_REDUCTION_INCOME) / 2;
        if (reduction > standardAllowance) {
            return 0;
        }
        return Math.max(0, standardAllowance - reduction);
    }
}

export const calculateEffectivePersonalAllowanceRate = (income: number): number => {
    const personalAllowance = calculatePersonalAllowance(income);
    if (personalAllowance === 0) {
        return 0;
    }
    if (personalAllowance < STANDARD_PERSONAL_ALLOWANCE) {
        return BASIC_RATE;
    }
    return 0;

}