import { LineChart } from "@tremor/react";
import { getMarginalRates } from "../utils/marginalRateUtils";
import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";

const MAX_INCOME = 200000;
const STEP = 10;

export interface TaxRate {
    income: number;
    Rate: number;
}

export const MarginalRateChart = () => {
  const [hasPlan2StudentLoan, setHasPlan2StudentLoan] = useState(false);

  const handleLoanToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setHasPlan2StudentLoan(event.target.checked);
  };

  const data = useMemo(
    () => getMarginalRates(MAX_INCOME, STEP, hasPlan2StudentLoan),
    [hasPlan2StudentLoan]
  );

  return(
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={hasPlan2StudentLoan}
          onChange={handleLoanToggle}
        />
        Include student loan
      </label>
      <LineChart
        data={data}
        index="income"
        categories={["Rate"]}
        colors={["blue"]}
        showLegend
        enableLegendSlider
        showTooltip
        valueFormatter={(value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 1 })}
        tickGap={186}
        intervalType="preserveStartEnd"
        xAxisLabel="Gross income (£)"
        yAxisLabel="Marginal rate (%)"
        className="h-80 w-full md:h-96"
      />
    </div>
  )
}