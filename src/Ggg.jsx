import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Col, Row } from 'react-bootstrap';
import ArcDesign from './ArcDesign'; // Import the new ArcDesign gauge component

// Sample data for the PieChart
const data = [
  { value: 5, min: 0, max: 18.5, color: "#2a94ca", label: "Underweight (<18.5)" },
  { value: 10, min: 18.5, max: 24.9, color: "#73a630", label: "Normal weight (18.5 - 24.9)" },
  { value: 15, min: 25, max: 29.9, color: "#e27430", label: "Overweight (25 - 29.9)" },
  { value: 20, min: 30, max: 34.9, color: "#e52d2a", label: "Obese (30 - 34.9)" },
  { value: 25, min: 35, max: 65, color: "#a7047f", label: "Extremely Obese (>35)" },
];

const size = {
  width: 600,
  height: 300,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: '#fff', // Making the text white
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithGauge({ bmi }) {
  const pieChartData = data.map(({ value, label, color }) => ({
    value,
    label,
    color,
  }));

  return (
    <Row>
      <Col md={1}></Col>
      <Col md={10}>
        <div style={{ width: '100%', height: '300px' }} className="no-left-space">
          <PieChart series={[{ data: pieChartData, innerRadius: 60, outerRadius: 70 }]} {...size}>
            <PieCenterLabel>{bmi}</PieCenterLabel>
          </PieChart>
          
        </div>
      </Col>
      <Col md={1}></Col>
    </Row>
  );
}
