export const BudgetView = () => {
    return (
        <div className="w-full h-full grid grid-rows-4">
            <div className="w-full flex items-center h-full ">
                <div className="w-1/12"></div>
                <div className="w-11/12 h-1/2 rounded-xl flex justify-end bg-rose-300">
                    <div className="w-3/4 h-full flex rounded-xl items-center pl-4 text-xl bg-opacity-60  bg-rose-400">
                        Net Spend: ${380}
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex items-center">
                <div className="w-1/12 "></div>
                <div className="w-11/12 h-1/2 flex rounded-xl justify-end bg-lime-200">
                    <div className="w-11/12  flex rounded-xl items-center pl-4 text-xl bg-opacity-60 h-full bg-lime-300">
                        Food and Groceries: $100
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex items-center">
                <div className="w-1/12 "></div>
                <div className="w-11/12 h-1/2 flex rounded-xl justify-end bg-blue-200">
                    <div className="w-6/12 h-full flex rounded-xl items-center pl-4 text-xl bg-opacity-60 bg-blue-300">
                        Utilities: $80
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex items-center">
                <div className="w-1/12 "></div>
                <div className="w-11/12 h-1/2 flex rounded-xl justify-end bg-orange-200">
                    <div className="w-7/12 h-full flex rounded-xl items-center pl-4 text-xl bg-opacity-60  bg-orange-300">
                        Non-Essentials: $200
                    </div>
                </div>
            </div>
        </div>
    )
}