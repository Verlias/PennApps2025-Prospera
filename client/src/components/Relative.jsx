import {Collapse} from "@mui/material";
import {useState} from "react";

export const Relative = ({myExpense, avgExpense, theme}) => {
    const [hovering, setHovering] = useState(false)

    return (
        <>
            <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                 className="w-full h-1/6 pl-8 text-xl flex items-center relative">
                <div
                    className={`w-1/5 h-full items-center justify-center ${myExpense > avgExpense ? "bg-red-300" : "bg-emerald-200"} border-l border-black bg-opacity-40 text-6xl grid grid-rows-[80%_20%]`}>
                    <div><b>${Math.round(myExpense)}</b>/m</div>
                    <div className="text-lg flex items-center justify-center">Your spending</div>
                </div>
                <div
                    className={`w-1/5 h-full items-center justify-center ${myExpense > avgExpense ? "bg-red-300" : "bg-emerald-200"} border-l border-black bg-opacity-40 text-6xl grid grid-rows-[80%_20%]`}>
                    <div><b>${Math.round(avgExpense)}</b>/m</div>
                    <div className="text-lg flex items-center justify-center">Average Group Expenditure</div>
                </div>
                <div
                    className="w-1/5 h-full items-center justify-center bg-amber-200 bg-opacity-40 text-6xl grid border-x border-black grid-rows-[80%_20%]">
                    <div className={`flex items-center justify-center`}>
                        <b>{Math.round(100 *(myExpense - avgExpense)/ Math.max(myExpense, avgExpense))}</b>%
                    </div>
                    <div className="text-lg flex items-center justify-center">{myExpense > avgExpense ? "Excess" : "Lesser"} Expenditure</div>
                </div>
                <div className="pr-8 border-y pl-8 border-slate-500 h-full w-1/2 flex items-center">
                    <div>Last month you spent lesser on <b className="text-blue-800">Non Essentials</b> than the average
                        among a similar set of consumers
                    </div>
                </div>
            </div>
            <Collapse orientation="vertical" in={hovering} timeout="auto" unmountOnExit>
                <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                    className={`w-full h-32 rounded-b-xl relative flex items-center text-3xl bg-opacity-70 backdrop-blur-xl gap-4 justify-center bg-amber- rounded-l-xl`}>
                    <div>We recommend setting a budget of &nbsp; <b
                        className="text-green-700 text-4xl">${Math.min(myExpense, Math.abs((myExpense + avgExpense)/2)).toFixed((0))}</b> &nbsp; for {theme}&nbsp; next month
                    </div>
                    <div
                        className="w-1/6 h-1/2 hover:cursor-pointer hover:bg-opacity-50 transition-colors bg-green-300 bg-opacity-30  ml-8 text-3xl flex items-center justify-center rounded-xl">
                        Set Budget
                    </div>
                </div>
            </Collapse>
        </>
    )
}

export const RelativeFl = ({myExpense, avgExpense, theme}) => {
    const [hovering, setHovering] = useState(false)

    return (
        <>
            <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                 className="w-full h-1/6 pr-8 text-xl flex items-center relative">
                <div className="pr-8 border-y pl-8 border-slate-500 h-full w-1/2 flex items-center">
                    <div>Last month you spent lesser on <b className="text-blue-800">{theme}</b> than the average
                        among a similar set of consumers
                    </div>
                </div>
                <div
                    className={`w-1/5 h-full items-center justify-center ${myExpense > avgExpense ? "bg-red-300" : "bg-emerald-200"} border-x border-black bg-opacity-40 text-6xl grid grid-rows-[80%_20%]`}>
                    <div><b>${Math.round(myExpense)}</b>/m</div>
                    <div className="text-lg flex items-center justify-center">Your spending</div>
                </div>
                <div
                    className={`w-1/5 h-full items-center justify-center ${myExpense > avgExpense ? "bg-red-300" : "bg-emerald-200"} border-r border-black bg-opacity-40 text-6xl grid grid-rows-[80%_20%]`}>
                    <div><b>${Math.round(avgExpense)}</b>/m</div>
                    <div className="text-lg flex items-center justify-center">Average Group Expenditure</div>
                </div>
                <div
                    className="w-1/5 h-full items-center justify-center bg-amber-200 border-r border-black  bg-opacity-40 text-6xl grid grid-rows-[80%_20%]">
                    <div className={`flex items-center justify-center`}>
                        <b>{Math.round(100 * (myExpense - avgExpense) / Math.max(myExpense, avgExpense))}</b>%
                    </div>
                    <div className="text-lg flex items-center justify-center">{myExpense > avgExpense ? "Excess" : "Lesser"} Expenditure</div>
                </div>
            </div>
            <Collapse orientation="vertical" in={hovering} timeout="auto" unmountOnExit>
                <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                    className={`w-full h-32 rounded-b-xl relative flex items-center text-3xl bg-opacity-70 backdrop-blur-xl gap-4 justify-center bg-amber- rounded-l-xl`}>
                    <div>We recommend setting a budget of &nbsp; <b
                        className="text-green-700 text-4xl">${Math.round(Math.min(myExpense, Math.abs((myExpense + avgExpense) / 2)))}</b> &nbsp; for {theme}&nbsp;
                        next month
                    </div>
                    <div
                        className="w-1/6 hover:cursor-pointer hover:bg-opacity-50 transition-colors h-1/2 bg-green-300 bg-opacity-30 ml-8 text-3xl flex items-center justify-center rounded-xl">
                        Set Budget
                    </div>
                </div>
            </Collapse>
        </>
    )
}