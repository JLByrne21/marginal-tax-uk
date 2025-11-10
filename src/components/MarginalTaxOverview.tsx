import { MarginalRateChart } from "./graphs/MarginalRate";

export const MarginalTaxOverview = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="text-3xl font-semibold tracking-tight">UK Marginal Tax Rates</h1>
          <div className="mt-4 max-w-2xl space-y-3 text-base leading-relaxed text-slate-600">
            <p>
                I've put together this simple graph to show the current state of the UK tax system. I've added the ability to add a student loan (based on the most common type in the uk, Plan 2).
            </p>
            <p>
                This graph considers, income tax, national insurance, and plan 2 student loans. I might come back to add other factors in the future. 
                This graph may look different very soon, if the chancellor makes any changes in the upcoming budget!
            </p>
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
        <section className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="p-6 pb-0">
            <h2 className="text-lg font-medium text-slate-800">Marginal rate profile</h2>
            <p className="mt-2 text-sm text-slate-600 mb-2">
              Toggle to see how student loan repayments influence the overall marginal rate.
            </p>
          </div>
          <div className="p-6 pt-0">
            <MarginalRateChart />
          </div>
        </section>
      </main>
    </div>
  );
};
