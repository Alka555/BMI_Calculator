import * as React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Stack } from '@mui/material';

// Original data with min and max values
const data = [
  { min: 0, max: 18.5, color: "#2a94ca", label: "Underweight" },
  { min: 18.5, max: 24.9, color: "#73a630", label: "Normal weight" },
  { min: 25, max: 29.9, color: "#e27430", label: "Overweight" },
  { min: 30, max: 34.9, color: "#e52d2a", label: "Obese" },
  { min: 35, max: 65, color: "#a7047f", label: "Extremely Obese" },
];

// Transform data to include value
const transformedData = data.map(item => ({
  ...item,
  value: item.max - item.min,
}));

// Calculate BMI segment index
const calculateBMISegmentIndex = (bmi) => {
  for (let i = 0; i < data.length; i++) {
    if (bmi >= data[i].min && bmi <= data[i].max) {
      return i;
    }
  }
  return -1; // If BMI is outside defined ranges
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { color, min, max, label } = payload[0].payload;
    const style = {
      backgroundColor: color,
      padding: '5px',
      border: '1px solid #ccc',
      color: 'white',
    };

    return (
      <div style={style}>
        <p>{label}</p>
        <p>{`Range: ${min} - ${max}`}</p>
      </div>
    );
  }
  return null;
};

// Customized Pie Chart Component with SVG Needle
export default function SemiCirclePieChart({ bmi }) {
  const bmiSegmentIndex = calculateBMISegmentIndex(bmi);

  // Calculate angle for needle
  const startAngle = 180;
  const endAngle = 0;
  const midAngle = (startAngle + endAngle) / 2;

  // Calculate needle coordinates
  const needleRadius = 80; // Adjust as needed
  const needleX = 200 + needleRadius * Math.cos((-midAngle * Math.PI) / 180);
  const needleY = 100 - needleRadius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <Stack direction="row">
      <PieChart width={400} height={200}>
        <Pie
          data={transformedData}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          startAngle={180}
          endAngle={0}
          paddingAngle={5}
        >
          {transformedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {/* Render needle */}
        {bmiSegmentIndex !== -1 && (
          <g transform={`translate(${needleX},${needleY})`}>
            <circle r={5} fill="red" />
            <line x1={-5} y1={0} x2={10} y2={0} stroke="red" strokeWidth={2} />
          </g>
        )}
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </Stack>
  );
}
