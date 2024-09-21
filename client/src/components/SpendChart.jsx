import Plot from "react-plotly.js";
import {useEffect, useState} from "react";
import {getGroupedTransactions} from "../utils/tools.js";
import {CAPITALONE_KEY} from "../../keys.js";

export const SpendChart = () => {
    const xValues = Array.from({ length: 31}).map((_, i) => i + 1);
    const [yVals, setYVals] = useState([])

    useEffect(() => {
        const customerId = "66eede179683f20dd5189f63";
        const baseUrl = "http://api.nessieisreal.com";
        const url = `${baseUrl}/accounts/${customerId}/purchases?key=${CAPITALONE_KEY}`;

        fetch(url).then(res => res.json())
            .then(resp => setYVals(getGroupedTransactions(resp)))
    }, [])

    return (
        <Plot
            data={[
                {
                    x: xValues,
                    y: yVals[yVals.length - 1]?.map(item => item[1]),
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'black' },
                    name: "September"
                },
                {
                    x: xValues,
                    y: yVals[yVals.length - 2]?.map(item => item[1]), // Second line
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'lightblue' }, // Change color as needed
                    name: 'August',
                    visible: "legendonly"
                }
            ]}
            layout={{
                width: "1000",
                height: "500",
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: "rgba(0,0,0,0)",
                xaxis: {
                    title: 'Date',
                    tickvals: xValues,
                },
                yaxis: {
                    title: 'Spending',
                },
                dragmode: 'select',
            }}
            config={{
                displayModeBar: false,
            }}
        />
    )
}