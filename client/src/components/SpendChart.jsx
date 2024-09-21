import Plot from "react-plotly.js";

export const SpendChart = () => {
    const xValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const yValues1 = [2, 6, 3, 10, 15, 12, 8, 9, 10, 10.3, 13,10, 8];

    return (
        <Plot
            data={[
                {
                    x: xValues,
                    y: yValues1,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'black' },
                    name: 'Line Series',
                }
            ]}
            layout={{
                width: "1000",
                height: "600",
                // title: 'Time Series Plot',
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