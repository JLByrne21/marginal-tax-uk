import { getHighestIncomeTaxRate } from "@/tax_calcs/income_tax";
import { calculateNationalInsuranceRate } from "@/tax_calcs/national_insurance";
import { calculateEffectivePersonalAllowanceRate } from "@/tax_calcs/personal_allowance";
import { calculatePlan2StudentLoanRate } from "@/tax_calcs/student_loan";

export interface TaxRate {
    income: number;
    rate: number;
}

const buildIncomeRange = (maxSalary: number, step: number): number[] => {
    const incomeCount = Math.floor(maxSalary / step) + 1;
    return Array.from({ length: incomeCount }, (_, index) => index * step);
};

const calculateMarginalRate = (income: number, includeStudentLoan: boolean): number => {
    const coreRates = [
        getHighestIncomeTaxRate(income),
        calculateEffectivePersonalAllowanceRate(income),
        calculateNationalInsuranceRate(income),
    ];

    if (includeStudentLoan) {
        coreRates.push(calculatePlan2StudentLoanRate(income));
    }

    const totalDecimalRate = coreRates.reduce((sum, rate) => sum + rate, 0);
    return totalDecimalRate * 100;
};

export const getMarginalRates = (maxSalary: number, step: number, hasPlan2StudentLoan: boolean): TaxRate[] => {
    const incomeRange = buildIncomeRange(maxSalary, step);

    return incomeRange.map((income) => ({
        income,
        rate: calculateMarginalRate(income, hasPlan2StudentLoan),
    }));
};
