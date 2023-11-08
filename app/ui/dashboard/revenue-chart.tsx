import {generateYAxis} from '@/app/lib/utils';
import {CalendarIcon} from '@heroicons/react/24/outline';
import {inter, lusitana} from '@/app/ui/fonts';
import {Revenue} from '@/app/lib/definitions';
import {fetchRevenue} from "@/app/lib/data";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {

    const chartHeight = 350;
    // NOTE: comment in this code when you get to this point in the course
    const revenue = await fetchRevenue();
    const {yAxisLabels, topLabel} = generateYAxis(revenue);

    if (!revenue || revenue.length === 0) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }

    return (
        <div className="w-full md:col-span-4">
            <h4 className={`${inter.className} mb-4 text-sm md:text-lg`}>
                Recent Revenue
            </h4>
            {/* NOTE: comment in this code when you get to this point in the course */}

            <div className="rounded-xl bg-gray-50 p-4">
                <div
                    className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
                    <div
                        className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
                        style={{height: `${chartHeight}px`}}
                    >
                        {yAxisLabels.map((label) => (
                            <p key={label}>{label}</p>
                        ))}
                    </div>

                    {revenue.map((month) => (
                        <div key={month.month} className="flex flex-col items-center gap-2">
                            <div title={month.revenue.toLocaleString('en-US',{style: 'currency',currency: 'USD',maximumFractionDigits: 0,})}
                                className="w-full rounded-t-full bg-blue-500"
                                style={{
                                    height: `${(chartHeight / topLabel) * month.revenue}px`,
                                }}
                            ></div>
                            <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                                {month.month}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <CalendarIcon className="h-5 w-5 text-gray-500"/>
                    <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
                </div>
            </div>
        </div>
    );
}
