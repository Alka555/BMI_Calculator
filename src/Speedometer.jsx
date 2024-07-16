// src/Speedometer.jsx
import React from 'react';
import GaugeChart from 'react-gauge-chart';

const Speedometer = ({ bmi }) => {
  // Define BMI segments and their colors
  const bmiSegments = [
    { min: 0, max: 18.5, color: "#2a94ca", label: "Underweight" },    // Underweight
    { min: 18.5, max: 24.9, color: "#73a630", label: "Normal weight" }, // Normal weight
    { min: 25, max: 29.9, color: "#e27430", label: "Overweight" },   // Overweight
    { min: 30, max: 34.9, color: "#e52d2a", label: "Obese" },   // Obese
    { min: 35, max: 65, color: "#a7047f", label: "Extremely Obese" }, // Extremely Obese
  ];

  // Calculate the percent for the gauge chart
  const calculatePercent = (bmi) => {
    if (bmi < 0) return 0;
    if (bmi > 65) return 1;
    return bmi / 65;
  };

  // Determine needle color based on BMI value
  const getNeedleColor = (bmi) => {
    if (bmi < 18.5) return "#2a94ca";    // Underweight
    if (bmi < 25) return "#73a630";      // Normal weight
    if (bmi < 30) return "#e27430";      // Overweight
    if (bmi < 35) return "#e52d2a";      // Obese
    return "#a7047f";                    // Extremely Obese
  };

  const percent = calculatePercent(bmi);
  const needleColor = getNeedleColor(bmi);

  // Function to calculate the label position based on the segment range
  const calculateLabelPosition = (min, max) => {
    const midAngle = (min + max) / 2; // Mid-angle of the segment
    const angleOffset = -90; // Offset to start labels at the top of the gauge (adjust as needed)
    const angle = (midAngle / 65) * 180 + angleOffset; // Convert to degrees and adjust for orientation
    const radius = 40; // Adjust radius to position the labels correctly above the arc
    const radians = (angle * Math.PI) / 180; // Convert angle to radians
    const x = 50 + radius * Math.cos(radians);
    const y = 50 + radius * Math.sin(radians); // Adjusted for SVG coordinate system (positive y goes downwards)
    return { x, y, angle };
  };

  return (
    <div style={{ position: 'relative', width: '300px', height: '200px' }}>
      <GaugeChart 
        id="gauge-chart" 
        nrOfLevels={bmiSegments.length} 
        colors={bmiSegments.map(segment => segment.color)} 
        arcWidth={0.4} // Increase arcWidth for more space to place labels inside
        percent={percent} 
        hideText={true}
        needleColor={needleColor}       // Dynamic needle color
        needleBaseColor={needleColor}   // Dynamic needle base color
      />
      <svg
        viewBox="0 0 100 100" // Adjust viewBox as needed for better visibility
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        {bmiSegments.map((segment, index) => {
          const { x, y, angle } = calculateLabelPosition(segment.min, segment.max);
          return (
            <text
              key={index}
              x={x}
              y={y}
              transform={`rotate(${angle} ${x} ${y})`} // Rotate text to match the arc angle
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fill: 'black', fontSize: '6px' }} // Adjusted font size for better fit
            >
              {/* {segment.label}
              <tspan x={x} dy="1em">{`${segment.min} - ${segment.max}`}</tspan> */}
            </text>
          );
        })}
      </svg>
      <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-40%)', textAlign: 'center' }}>
        {/* <h2>BMI: {bmi}</h2> */}
      </div>
    </div>
  );
};

export default Speedometer;
