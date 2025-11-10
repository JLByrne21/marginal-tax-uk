

const PLAN_2_REPAYMENT_THRESHOLD = 28470;
const PLAN_2_REPAYMENT_RATE = 0.09;

// let's assume only Plan 2 for now
export const calculatePlan2StudentLoanRate = (income: number): number => {
  if (income <= PLAN_2_REPAYMENT_THRESHOLD) {
    return 0;
  }

  return PLAN_2_REPAYMENT_RATE;
}