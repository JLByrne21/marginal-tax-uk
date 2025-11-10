// for simplicity let's only consider class A NI here


const FIRST_THRESHOLD = 1048;
const SECOND_THRESHOLD = 4189;

export const calculateNationalInsuranceRate = (income: number): number => {
    const monthlyIncome = income / 12;
    if (monthlyIncome > FIRST_THRESHOLD && monthlyIncome <= SECOND_THRESHOLD) {
        return 0.08;
    } else if (monthlyIncome > SECOND_THRESHOLD) {
        return 0.02;
    }
    return 0;
}
