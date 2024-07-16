import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useTheme } from '@mui/material/styles';

const settings = {
  width: 200,
  height: 200,
};

export default function ArcDesign({ bmi }) {
  const bmiNumber = parseFloat(bmi);

  // Function to determine color based on BMI value
  const getColor = (bmiValue) => {
    if (bmiValue < 18.5) {
      return '#2a94ca'; // Blue for Underweight
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      return '#73a630'; // Green for Normal weight
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      return '#e27430'; // Orange for Overweight
    } else if (bmiValue >= 30 && bmiValue < 34.9) {
      return '#e52d2a'; // Red for Obese
    } else {
      return '#a7047f'; // Purple for Extremely Obese
    }
  };

  const fillColor = getColor(bmiNumber);
  const theme = useTheme();

  return (
    <Gauge
      {...settings}
      value={bmiNumber}
      cornerRadius="50%"
      innerRadius="50%"
      outerRadius="60%"
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fill: `${fillColor} !important`, // Text color with !important
          fontSize: '35px !important', // Font size with !important
          fontWeight: 'bold !important', // Font weight with !important
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: `${fillColor} !important`, // Arc color with !important
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: `${theme.palette.grey[500]} !important`, // Reference arc color with !important
        },
        // Additional styles with !important if necessary
        '& text': {
          fill: 'inherit !important', // or specify your desired color with !important
        },
      }}
    />
  );
}

