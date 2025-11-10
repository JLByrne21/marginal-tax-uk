const CHILD_BENEFIT_FIRST_CHILD = 1354.6;
const CHILD_BENEFIT_ADDITIONAL_CHILD = 897;
const HIGH_INCOME_CHARGE_BEGIN = 60000;
const CHARGE_RATE_PER_100_OVER = 0.005;
const BAND_WIDTH = 100 * 1 / CHARGE_RATE_PER_100_OVER;


export const calculateHighIncomeChildBenefitChargeRate = (
  income: number,
  numberOfChildren: number
): number => {
  if (numberOfChildren <= 0 || income <= HIGH_INCOME_CHARGE_BEGIN || income >= HIGH_INCOME_CHARGE_BEGIN + BAND_WIDTH) return 0;

  const totalBenefit =
    CHILD_BENEFIT_FIRST_CHILD +
    Math.max(0, numberOfChildren - 1) * CHILD_BENEFIT_ADDITIONAL_CHILD;

  // Constant marginal addition per £1 inside band.
  return (CHARGE_RATE_PER_100_OVER * totalBenefit) / 100;
};