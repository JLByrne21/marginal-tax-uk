import { STANDARD_PERSONAL_ALLOWANCE } from "./personal_allowance";




const HIGHER_RATE_THRESHOLD = 50270;
const ADDITIONAL_RATE_THRESHOLD = 125140;

export const BASIC_RATE = 0.2;
const HIGHER_RATE = 0.4;
const ADDITIONAL_RATE = 0.45;

export const getHighestIncomeTaxRate = (income: number) => {
    if (income < STANDARD_PERSONAL_ALLOWANCE) {
        return 0;
    }
    if (income < HIGHER_RATE_THRESHOLD) {
        return BASIC_RATE;
    } else if (income < ADDITIONAL_RATE_THRESHOLD) {
        return HIGHER_RATE;
    } else {
        return ADDITIONAL_RATE;
    }
}