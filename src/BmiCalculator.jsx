import React, { useState } from 'react';
import {
  Card, CardContent, Box, Button, Snackbar, Alert, Slider, Typography, ToggleButton, ToggleButtonGroup, Grid
} from '@mui/material';
import HeightIcon from '@mui/icons-material/Height';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import './App.css';
import './BmiCalculator.css';
import ArcDesign from "./ArcDesign";
import Accordion from "./Accordian";

const getBMICategory = (bmi) => {
  if (bmi < 18.5) {
    return { category: 'Underweight', color: '#2a94ca', tip: 'Consider incorporating more nutrient-dense foods into your diet, such as nuts, seeds, avocados, and whole grains.' };
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return { category: 'Normal weight', color: '#73a630', tip: 'Maintain your current lifestyle by continuing to eat a balanced diet and staying physically active.' };
  } else if (bmi >= 25 && bmi < 29.9) {
    return { category: 'Overweight', color: '#e27430', tip: 'Consider incorporating more fruits, vegetables, and whole grains into your diet while reducing intake of sugary and high-fat foods.' };
  } else if (bmi >= 30 && bmi < 34.9) {
    return { category: 'Obese', color: '#e52d2a', tip: 'Consider incorporating more fruits, vegetables, and whole grains into your diet while reducing intake of sugary and high-fat foods.' };
  } else {
    return { category: 'Extremely Obese', color: '#a7047f', tip: 'Focus on a balanced diet that is rich in whole foods, lean proteins, and low in processed and high-calorie foods.' };
  }
};

const BmiCalculator = ({ toggleImageVisibility, showImage }) => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('male'); // Default to male
  const [showResult, setShowResult] = useState(false);
  const [bmi, setBMI] = useState(null);
  const [labelColor, setLabelColor] = useState('');

  const handleHeightChange = (e, newValue) => {
    setHeight(newValue);
  };

  const handleWeightChange = (e, newValue) => {
    setWeight(newValue);
  };

  const handleAgeChange = (e, newValue) => {
    setAge(newValue);
  };

  const incrementValue = (setter, value, max) => {
    if (value < max) setter(value + 1);
  };

  const decrementValue = (setter, value, min) => {
    if (value > min) setter(value - 1);
  };

  const calculateBMI = (height, weight) => {
    if (height > 0 && weight > 0) {
      const bmiValue = (weight / (height * height)).toFixed(1);
      setBMI(bmiValue);
      const categoryColor = getBMICategory(bmiValue).color;
      setLabelColor(categoryColor);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!height || !weight || !age || !gender) {
      alert("Please fill out the form completely.");
      return;
    }
    const heightInMeters = height / 100; // Convert height to meters
    calculateBMI(heightInMeters, weight);
    setShowResult(true); // Show the result card
    toggleImageVisibility(); // Toggle image visibility
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowResult(false);
  };

  let clr = getBMICategory(bmi)?.color || '';

  const handleToggleChange = (event, newGender) => {
    if (newGender !== null) {
      setGender(newGender);
    }
  };

  return (
    
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        minHeight: '100vh',
        position: 'relative',
      }}
      
    >
{!showResult && (
  <Card className='cal-card' sx={{ minWidth: 300, backgroundColor: 'rgba(255, 255, 255, 0.1)', boxShadow: '0.7' }}>
    <Typography variant="h3" gutterBottom style={{ color: 'rgb(104, 173, 156)' }}>
      BMI Calculator
    </Typography>
    <CardContent>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', position: 'relative', boxShadow: (theme) => theme.shadows[2] }}>
          <Button onClick={() => decrementValue(setHeight, height, 100)} style={{ color: 'rgb(59, 141, 120)' }}>-</Button>
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <Typography style={{ color: 'rgb(59, 141, 120)' }}>Height: {height} cm</Typography>
            <Slider
              aria-label="Height"
              value={height}
              onChange={handleHeightChange}
              valueLabelDisplay="auto"
              min={100}
              max={250}
              step={1}
              sx={{ color: 'rgb(59, 141, 120)' }}
            />
          </Box>
          <Button onClick={() => incrementValue(setHeight, height, 220)} style={{ color: 'rgb(59, 141, 120)' }}>+</Button>
        </Box>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', position: 'relative', boxShadow: (theme) => theme.shadows[2] }}>
          <Button onClick={() => decrementValue(setWeight, weight, 30)} style={{ color: 'rgb(59, 141, 120)' }}>-</Button>
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <Typography style={{ color: 'rgb(59, 141, 120)' }}>Weight: {weight} kg</Typography>
            <Slider
              aria-label="Weight"
              value={weight}
              onChange={handleWeightChange}
              valueLabelDisplay="auto"
              min={10}
              max={180}
              step={1}
              sx={{ color: 'rgb(59, 141, 120)' }}
            />
          </Box>
          <Button onClick={() => incrementValue(setWeight, weight, 150)} style={{ color: 'rgb(59, 141, 120)' }}>+</Button>
        </Box>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', position: 'relative', boxShadow: (theme) => theme.shadows[2] }}>
          <Button onClick={() => decrementValue(setAge, age, 10)} style={{ color: 'rgb(59, 141, 120)' }}>-</Button>
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <Typography style={{ color: 'rgb(59, 141, 120)' }}>Age: {age}</Typography>
            <Slider
              aria-label="Age"
              value={age}
              onChange={handleAgeChange}
              valueLabelDisplay="auto"
              min={10}
              max={120}
              step={1}
              sx={{ color: 'rgb(104, 173, 156)' }}
            />
          </Box>
          <Button onClick={() => incrementValue(setAge, age, 120)} style={{ color: 'rgb(59, 141, 120)' }}>+</Button>
        </Box>
        <ToggleButtonGroup
          value={gender}
          exclusive
          onChange={handleToggleChange}
          aria-label="gender"
          sx={{ mb: 2, display: 'flex', justifyContent: 'center', gap: 0 }}
        >
          <ToggleButton
            value="female"
            aria-label="female"
            style={{ color: '#3f51b5', backgroundColor: gender === 'female' ? '#e1f5fe' : 'transparent' }}
            sx={{ '&.Mui-selected': { backgroundColor: '#e1f5fe' }, border: '1px solid rgb(104, 173, 156)', borderRadius: '4px', padding: '4px' }}
          >
            <FemaleIcon />
            Female
          </ToggleButton>
          <ToggleButton
            value="male"
            aria-label="male"
            style={{ color: '#f44336', backgroundColor: gender === 'male' ? '#ffcdd2' : 'transparent' }}
            sx={{ '&.Mui-selected': { backgroundColor: '#ffcdd2' }, border: '1px solid rgb(104, 173, 156)', borderRadius: '4px', padding: '4px' }}
          >
            <MaleIcon />
            Male
          </ToggleButton>
          <ToggleButton
            value="other"
            aria-label="other"
            style={{ color: '#4caf50', backgroundColor: gender === 'other' ? '#c8e6c9' : 'transparent' }}
            sx={{ '&.Mui-selected': { backgroundColor: '#c8e6c9' }, border: '1px solid rgb(104, 173, 156)', borderRadius: '4px', padding: '4px' }}
          >
            <TransgenderIcon />
            Other
          </ToggleButton>
        </ToggleButtonGroup>
        <Grid container justifyContent="center" className='mt-4'>
          <Button type="submit" variant="contained" style={{ backgroundColor: 'rgb(104, 173, 156)' }}>
            Calculate BMI
          </Button>
        </Grid>
      </form>
    </CardContent>
  </Card>
)}

{showResult && (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}
  >
    <Typography variant="h4" gutterBottom style={{ color: 'rgb(104, 173, 156)' }}>
      Your BMI Score: <span style={{ color: clr }}>{bmi}</span>
    </Typography>
    <Card className="result-card" sx={{ minWidth: 300, maxWidth: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)', boxShadow: 'none', alignSelf: 'center' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <ArcDesign bmi={bmi} />
          <Box sx={{ border: `1px solid ${clr}`, borderRadius: '4px', padding: '16px', width: { xs: '100%', sm: 'auto' } }}>
            <Typography variant="h5" style={{ color: 'white', backgroundColor: clr }} gutterBottom>
              {getBMICategory(bmi).category}
            </Typography>
            <Typography style={{color: 'white'}}>{getBMICategory(bmi).tip}</Typography>
          </Box>
        </Box>
        {/* <Accordion /> */}
        <Button sx={{ mt: 2, backgroundColor: 'rgb(104, 173, 156)' }} variant="contained" onClick={() => { handleClose(); showImage(); }}>
          Back
        </Button>
      </CardContent>
    </Card>
  </Box>
)}

      <Snackbar open={showResult} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
          Your BMI is {bmi}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BmiCalculator;