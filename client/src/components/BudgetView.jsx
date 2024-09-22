import {further_group} from "../utils/tools.js";

export const BudgetView = ({grouped}) => {
    const spend = further_group(grouped);
    const sum = grouped.reduce((sum, val) => sum + val.totalSum, 0);

    return (
        <div className="w-full h-full grid grid-rows-4">
            <div className="w-full flex items-center h-full ">
                <div className="w-1/12"></div>
                <div className="w-11/12 h-1/2 rounded-xl flex justify-end bg-rose-300">
                    <div className="w-3/4 h-full flex rounded-xl items-center pl-4 text-xl bg-opacity-60  bg-rose-400">
                        Net Spend: ${sum?.toFixed(0)}
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex items-center">
                <div className="w-1/12 "></div>
                <div className="w-11/12 h-1/2 flex rounded-xl justify-end bg-lime-200">
                    <div className="w-11/12  flex rounded-xl items-center pl-4 text-xl bg-opacity-60 h-full bg-lime-300">
                        Food and Groceries: ${spend["Food"]?.toFixed(0)}
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex items-center">
                <div className="w-1/12 "></div>
                <div className="w-11/12 h-1/2 flex rounded-xl justify-end bg-blue-200">
                    <div className="w-6/12 h-full flex rounded-xl items-center pl-4 text-xl bg-opacity-60 bg-blue-300">
                        Utilities: ${spend["Utility"]?.toFixed(0)}
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex items-center">
                <div className="w-1/12 "></div>
                <div className="w-11/12 h-1/2 flex rounded-xl justify-end bg-orange-200">
                    <div className="w-7/12 h-full flex rounded-xl items-center pl-4 text-xl bg-opacity-60  bg-orange-300">
                        Non-Essentials: ${spend["Non Essentials"]?.toFixed(0)}
                    </div>
                </div>
            </div>
        </div>
    )
}