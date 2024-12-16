import React from "react";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import PropTypes from "prop-types";

const Chart = ({progressData}) => {
    return (
        <div style={{width: "100%", height: "100%"}}>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart
                    data={progressData}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="label"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="max" fill="#e0e0e0" maxBarSize={50}/>
                    <Bar
                        dataKey="value"
                        fill="#789d7a"
                        maxBarSize={50}
                        label={{position: "top", fill: "#5a5a5a"}}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

Chart.propTypes = {
    progressData: PropTypes.array
};

export default Chart;
