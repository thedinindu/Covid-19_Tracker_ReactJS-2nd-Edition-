import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format('+0,0')
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    parser: 'MM/DD/YY',
                    tooltipFormat: 'll',
                }
            }
        ],
        yAxes: [
            {
                gridlines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format('0a')
                    } 
                }
            }
        ]
    }

}

const buildChartData = (data, casesType='cases') => {
    const chartData = []
    let lastDataPoint
    for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date]
    }
    return chartData
}


function LineGraph({ casesType='cases', ...props }) {

    const [ data, setData ] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
            .then(response => response.json())
            .then(data => {
                const chartData = buildChartData(data, casesType)
                setData(chartData)
            })
        }
        fetchData()
    }, [casesType])

    let backgroundColor = 'rgba(204, 16, 52, 0.5)'
    let borderColor = '#CC1034'
    if (casesType === 'recovered') {
        backgroundColor = 'rgba(125, 215, 29, 0.5)'
        borderColor = '#7DD71D'
    }else if (casesType === 'deaths') {
        backgroundColor = 'rgba(251, 68, 67, 0.5)'
        borderColor = '#FB4443'
    }

    return (
        <div className={props.className}>
            {data.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: `${backgroundColor}`,
                                borderColor: `${borderColor}`,
                                data: data
                            }
                        ]
                    }}
                />
            )}
        </div>
    )
}

export default LineGraph
