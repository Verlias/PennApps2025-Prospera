import {useEffect, useRef, useState} from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import {dateDifference, getGroupedTransactions, getLastThreeMerchantNames} from "../utils/tools.js";
import {SpendChart} from "../components/SpendChart.jsx";
import {desktopOS, valueFormatter} from "../utils/webUsageStats.js";
import {CAPITALONE_KEY} from "../../keys.js";
import {CumuPlot} from "../components/CumuPlot.jsx";
import {BudgetView} from "../components/BudgetView.jsx";

export const Home = () => {

    const [accountHist, setAccountHist] = useState()
    const [hoverBar, setHoverBar] = useState(null)
    const [news, setNews] = useState([
            {
                "title": "Top Stories: iOS 18 and macOS Sequoia Out Now, iPhone 16 Launch, and More",
                "description": "It was another busy week in the Apple universe, bookended by the release of iOS 18 and other major operating system updates on Monday and the launch...",
                "content": "It was another busy week in the Apple universe, bookended by the release of iOS 18 and other major operating system updates on Monday and the launch of all of the brand-new hardware on Friday.\nIn addition to taking thorough looks at iOS 18, macOS Seq... [4849 chars]",
                "url": "https://www.macrumors.com/2024/09/21/top-stories-ios-18-release-iphone-16-launch/",
                "image": "https://images.macrumors.com/t/PlscodWW9Vo6yBa-SYycjqz7G-4=/1600x/article-new/2024/09/top-stories-21sep2024.jpg",
                "publishedAt": "2024-09-21T13:00:00Z",
                "source": {
                    "name": "MacRumors",
                    "url": "https://www.macrumors.com"
                }
            },
            {
                "title": "How to download watchOS 11 on your Apple Watch",
                "description": "The latest update for the Apple Watch is now ready to take for a spin. Here's how to download watchOS 11 right now.",
                "content": "Apple's popular smartwatches are getting some exciting updates in watchOS 11, with a new Vitals app to keep tabs on your important health metrics, Training Load to help you optimize your workouts, and the ability to set more granular goals for your a... [3400 chars]",
                "url": "https://www.digitaltrends.com/mobile/how-to-download-watchos-11-on-your-apple-watch/",
                "image": "https://www.digitaltrends.com/wp-content/uploads/2023/06/apple-watchos-10-wwdc-2023-11.png?resize=1200%2C630&p=1",
                "publishedAt": "2024-09-20T22:00:56Z",
                "source": {
                    "name": "Digital Trends",
                    "url": "https://www.digitaltrends.com"
                }
            },
            {
                "title": "macOS Sequoia may be breaking important security tools",
                "description": "Apple's OS once again is causing issues as macOS 15 Sequoia is causing network connections errors. But is there anything users can do right now?",
                "content": "Apple released macOS Sequoia on Monday, but the update has broken the functionality for some networking and security tools from companies such as Microsoft, CrowdStrike, SentinelOne, and more, as Bleeping Computer reports. Affected users on Reddit ar... [2468 chars]",
                "url": "https://www.digitaltrends.com/computing/upgrading-to-macos-15-might-not-be-a-good-idea-right-now/",
                "image": "https://www.digitaltrends.com/wp-content/uploads/2024/07/macOS-Sequoia-Craig-Federighi.jpg?resize=1200%2C630&p=1",
                "publishedAt": "2024-09-20T20:40:07Z",
                "source": {
                    "name": "Digital Trends",
                    "url": "https://www.digitaltrends.com"
                }
            },
            {
                "title": "Where to Buy Online",
                "description": "Apple released the AirPods 4 on Friday (Sept. 20). Here's where to buy them online.",
                "content": "All products and services featured are independently chosen by editors. However, Billboard may receive a commission on orders placed through its retail links, and the retailer may receive certain auditable data for accounting purposes.\nWith just a fe... [2095 chars]",
                "url": "https://www.billboard.com/culture/product-recommendations/apple-airpods-4-where-to-buy-online-1235771131/",
                "image": "https://www.billboard.com/wp-content/uploads/2024/09/Apple-AirPods-4-9023-billboard-1548.jpg?w=1024",
                "publishedAt": "2024-09-20T17:42:44Z",
                "source": {
                    "name": "Billboard",
                    "url": "https://www.billboard.com"
                }
            },
            {
                "title": "Regular iPhone 17 models rumored to get Apple’s best Pro feature",
                "description": "The regular iPhone 17 models could get a long-awaited features for the tech community: A higher 120Hz refresh rate with",
                "content": "One of the major complaints of the tech community is the lack of dynamic refresh rate on the regular iPhone models, as many mid-Android phones already feature at least 90Hz refresh rate for years now. However, it seems this is about to change, as all... [1977 chars]",
                "url": "https://bgr.com/tech/regular-iphone-17-models-rumored-to-get-apples-best-pro-display-feature/",
                "image": "https://bgr.com/wp-content/uploads/2024/07/ios-18-home-screen-customization-iphone-bgr-1.jpg?quality=82&strip=all",
                "publishedAt": "2024-09-20T17:40:09Z",
                "source": {
                    "name": "BGR",
                    "url": "https://bgr.com"
                }
            }]);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [yVals, setYVals] = useState([])
    const [viewBudget, setViewBudget] = useState(true);
    const [lastTransactions, setLastTransactions] = useState(null);

    const [sp, setSp] = useState([{oneYearPercentage:"75.40%",
        symbol:"BLOK",
        companyName:"Amplify Transformational Data Sharing ETF",
        lastSalePrice:"$36.47",
        netChange:"-0.00",
        percentageChange:"-0.0%",
        deltaIndicator:"down"},
        {
            oneYearPercentage:"75.40%",
            symbol:"BLOK",
            companyName:"Amplify Transformational Data Sharing ETF",
            lastSalePrice:"$36.47",
            netChange:"-0.00",
            percentageChange:"-0.0%",
            deltaIndicator:"down",
        }]);

    useEffect(() => {
        // fetch("https://yahoo-finance15.p.rapidapi.com/api/v2/markets/tickers?type=ETF", {
        //     method: "GET",
        //     headers: {
        //         'x-rapidapi-key': RAPID_API_KEY,
        //         'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
        //     }
        // }).then(res => res.json())
        //     .then(resp => setSp([resp.body[0], resp.body[1]]))

        // fetch("https://gnews.io/api/v4/search?q=apple&max=5&lang=en&country=us&apikey="+PERIGON_KEY, {
        //     method: "GET",
        // }).then(resp => resp.json())
        //     .then(res => {
        //         setNews(res.articles);
        //     })

        const customerId = "66ef454a9683f20dd518a575";
        const baseUrl = "http://api.nessieisreal.com";
        const url = `${baseUrl}/accounts/${customerId}/purchases?key=${CAPITALONE_KEY}`;

        fetch(url).then(res => res.json())
            .then(resp => {
                setYVals(getGroupedTransactions(resp));
                return getLastThreeMerchantNames(resp)
            })
            .then(item => setLastTransactions(item))
    }, []);

    const upcoming_bills = [
        ["Verizon", 30, new Date("24 September 2024")],
        ["Vanguard", 150, new Date("1 October 2024")],
        ["PECO", 80, new Date("15 October 2024")]
    ]

    const color_graded_bills = useRef(getBackgroundColor(upcoming_bills));

    function getBackgroundColor(prices) {
        const minPrice = Math.min(...prices.map(item => item[1]));
        const maxPrice = Math.max(...prices. map(item => item[1]));

        return prices.map(([_, price, _1]) => {
            const normalized = (price - minPrice) / (maxPrice - minPrice);
            const redIntensity = Math.floor(normalized * 255);

            return `rgb(${redIntensity}, 120, 80)`;
        });
    }

    return (
        <div className="w-full h-full bg-amber-50 overflow-x-hidden overflow-y-auto scrollbar-hidden">
            <div className="w-full h-[8%] px-4 flex justify-between">
                <div className="w-[10%]  h-full text-2xl flex items-center justify-center border-b border-slate-600 hover:border-b-2 transition-all hover:cursor-pointer font-serif">Home</div>
                <div className="w-[20%] h-full flex gap-2">
                    <div className="w-full h-full text-2xl flex items-center justify-center border-b border-slate-600 hover:border-b-2 transition-all hover:cursor-pointer font-serif">Recommend</div>
                    <div className="w-full h-full text-2xl flex items-center justify-center border-b border-slate-600 hover:border-b-2 transition-all hover:cursor-pointer font-serif">Account</div>
                </div>
            </div>
            <div className="w-full h-[82%] grid grid-rows-[75%_25%]">
                <div className="w-full h-full grid grid-cols-[70%_30%] ">
                    <div className="flex items-center justify-center">
                        <SpendChart yVals={yVals}/>
                    </div>
                    <div className="w-full h-full grid grid-rows-[40%_50%_10%]">
                        <div className="w-full h-full grid grid-rows-[85%_15%] text-8xl">
                            <div className="w-full h-full grid grid-rows-[50%_50%] justify-center pb-2 items-end">
                                <div/>
                                <div className="grid grid-cols-[10%_90%]">
                                    <div className="pt-4 w-full h-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="text-green-700 size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"/>
                                        </svg>
                                    </div>
                                    $1217
                                </div>
                            </div>
                            <div className="text-lg flex justify-center ">
                                Up &nbsp; <b className="text-green-700">0.2%</b> &nbsp; from this time last month
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-[50%_50%] h-full">
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-11/12 h-5/6 bg-amber-100 rounded-lg border border-slate-600 p-2">
                                    <div className="w-full bg-blue-900 flex h-[10%] relative rounded-lg">
                                        <div onMouseEnter={() => setHoverBar("a")} onMouseLeave={() => setHoverBar(null)} style={{
                                            width: hoverBar === null ? "70%" : hoverBar === "a" ? "100%" : "0%",
                                            borderRadius: hoverBar === "a" ? "0.5rem" : ""
                                        }} className="flex items-center justify-center text-white transition-all bg-indigo-700 rounded-l-lg">
                                            {hoverBar === "a" ? "Education" : ""}
                                        </div>
                                        <div onMouseEnter={() => setHoverBar("b")} onMouseLeave={() => setHoverBar(null)} style={{
                                            width: hoverBar === null ? "20%" : hoverBar === "b" ? "100%" : "0%",
                                            borderRadius: hoverBar === "b" ? "0.5rem" : ""
                                        }}
                                             className="flex items-center justify-center text-white transition-all bg-blue-500">
                                            {hoverBar === "b" ? "Housing" : ""}
                                        </div>
                                        <div onMouseEnter={() => setHoverBar("c")} onMouseLeave={() => setHoverBar(null)} style={{
                                            width: hoverBar === null ? "10%" : hoverBar === "c" ? "100%" : "0%",
                                            borderRadius: hoverBar === "c" ? "0.5rem" : ""
                                        }} className="flex items-center justify-center text-white transition-all bg-cyan-500 rounded-r-lg">
                                            {hoverBar === "c" ? "Utilities" : ""}
                                        </div>
                                    </div>
                                    <div className="w-full h-[65%] mt-2">
                                        {
                                            lastTransactions?.map((item, index) => (
                                                    <div
                                                        className={`w-full h-1/3   ${index === 0 ? "border-t border-b" : "border-b"} transition-colors hover:bg-amber-200 flex border-slate-600`}>
                                                        <div className="w-[22%] text-xl font-semibold flex items-center">
                                                            ${item.price.toFixed(1)}
                                                        </div>
                                                        <div className="w-[38%] flex items-center">
                                                            {item.name}
                                                        </div>
                                                        <div className="w-[40%] flex items-center justify-end">
                                                            {dateDifference(new Date(), item.time, "hours")}
                                                            <div className="text-xs text-gray-700">hours ago</div>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                    <div className="h-[25%] w-full flex gap-2 items-center py-2">
                                        {
                                            sp.map((item, ind) => (
                                                <div
                                                    style={{backgroundColor: `rgba(${254 - parseInt(item.percentageChange.split("%")[0]) * 30}, ${243 + parseInt(item.percentageChange.split("%")[0]) * 30},${199})`}}
                                                    className="w-1/2 h-full border border-slate-600 rounded-lg flex">
                                                    <div className="w-[60%] h-full pl-2 flex items-center">
                                                        {item.symbol}
                                                    </div>
                                                    <div className="w-[40%] h-full text-xs flex items-center font-bold">
                                                        {item.percentageChange.split("%")}
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-full flex items-center">
                                <div className="h-auto w-full">
                                    {
                                        upcoming_bills.map(([company, amount, bill], index) => (
                                            <div
                                                className="w-full justify-end bg-amber-100 mb-2 h-12 flex rounded-l-lg border-slate-600 border">
                                                <div
                                                    className="p-2 w-3/4 h-full mb-2">
                                                    {company}: due in {dateDifference(new Date(), bill)} days
                                                </div>

                                                <div style={{backgroundColor: color_graded_bills.current[index]}} className="flex items-center justify-center w-1/4 h-full">
                                                    ${amount}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-full h-full">
                    <div className="w-full h-full flex p-4 border-y border-slate-400 gap-4 overflow-x-auto">
                        {
                            news.map((item) => {
                                let sentiment = item.sentiment?.positive - item.sentiment?.negative > 0.3
                                let rgb = `rgba(${sentiment ? 235 : 255}, ${sentiment ? 251 : 225}, ${215}, 0.8)`;
                                return (
                                    <a style={{backgroundColor: rgb}} key={item.id} href={item.url} className="focus:outline-none grid grid-rows-[60%_40%] hover:bg-amber-100 transition-colors hover:cursor-pointer w-full border-x border-slate-300 h-full ">
                                        <div className="italic p-4">
                                            {item.title}
                                        </div>
                                        <div className=" grid grid-cols-[60%_40%]">
                                            <div className="flex font-semibold items-center pl-4">
                                                {item.source.name}
                                            </div>
                                            <div className="flex items-center justify-end pr-4">
                                                {new Date(item.publishedAt).getDate()} {months[new Date(item.publishedAt).getMonth()]}
                                            </div>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
            <div className="w-full h-full p-8">
                <div className="w-full h-[60%]">
                    <div className="rounded-xl border border-slate-400 bg-amber-100 bg-opacity-30 w-full h-full grid grid-cols-[40%_60%] p-8">
                        <div className="w-full h-full flex items-center justify-center ">
                            <PieChart
                                colors={['#fed7aa', '#d9f99d', '#ddd6fe', '#fda4af', '#7dd3fc']}
                                series={[
                                    {
                                        data: desktopOS,
                                        highlightScope: { fade: 'global', highlight: 'item' },
                                        faded: { innerRadius: 40, additionalRadius: -30, color: 'gray' },
                                        valueFormatter,
                                    },
                                ]}
                                height={300}
                            />
                        </div>
                        <div className="w-full h-full pl-8 grid grid-cols-[8%_92%]">
                            <div className="ml-8 w-full h-full bg-amber-50 grid grid-rows-2">
                                <div onClick={() => setViewBudget(false)} className={`${viewBudget ? "bg-amber-100" : "border-r border-slate-600"} transition-all hover:cursor-pointer [writing-mode:vertical-lr] w-full h-full flex items-center justify-center text-lg`}>Net Spend</div>
                                <div onClick={() => setViewBudget(true)} className={`${!viewBudget ? "bg-amber-100" : "border-r border-slate-600"} transition-all hover:cursor-pointer [writing-mode:vertical-lr] w-full h-full flex items-center justify-center text-lg`}>Budget</div>
                            </div>
                            <div className="w-full h-full pl-8">
                                {yVals.length && !viewBudget && <CumuPlot yData={yVals[yVals.length - 1]}/>}
                                {viewBudget && <BudgetView />}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}