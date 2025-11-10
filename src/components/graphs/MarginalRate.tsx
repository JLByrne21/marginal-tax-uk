import { LineChart } from "@tremor/react";
import { getMarginalRates } from "../utils/marginalRateUtils";
import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import type { CustomTooltipProps } from "@tremor/react/dist/components/chart-elements/common/CustomTooltipProps";

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

  const formatIncome = (value: number) => `£${value.toLocaleString("en-GB", { maximumFractionDigits: 0 })}`;
  const formatRate = (value: number) => `${value.toFixed(1)}%`;

  const MarginalTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload || payload.length === 0 || label === undefined) {
      return null;
    }

    return (
      <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
        <div className="text-sm font-medium text-slate-600">{formatIncome(Number(label))}</div>
        <ul className="mt-2 space-y-1">
          {payload.map(({ name, value, dataKey, color }) => {
            const resolvedValue = Array.isArray(value) ? value[0] : value;
            const numericValue = typeof resolvedValue === "number"
              ? resolvedValue
              : Number(resolvedValue ?? 0);

            return (
              <li key={`${String(dataKey)}-${String(name)}`} className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-500">{name}</span>
                <span className="text-sm font-medium" style={{ color: color ?? "inherit" }}>
                  {formatRate(numericValue)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

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
        showTooltip
  valueFormatter={(value: number) => formatRate(value)}
  customTooltip={MarginalTooltip}
        tickGap={120}
        intervalType="preserveStartEnd"
        xAxisLabel="Gross income (£)"
        yAxisLabel="Marginal rate (%)"
        className="h-80 w-full md:h-96"
      />
    </div>
  )
}