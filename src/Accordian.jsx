import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import styled from 'styled-components';

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export default function Accordian() {
  return (
    <div>
              <Accordion sx={{ backgroundColor: 'grey.500' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          What is body mass index (BMI)?
        </AccordionSummary>
        <AccordionDetails>
        Body mass index (BMI) is a tool that healthcare providers use to estimate the amount of body fat by using your height and weight measurements. It can help assess risk factors for certain health conditions.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'grey.500' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Health Risks Related to High BMI
        </AccordionSummary>
        <AccordionDetails>
<ul>
  <li>Coronary heart disease</li>
  <li>Hypertension</li>
  <li>Osteoarthritis</li>
  <li>Sleep apnea and respiratory problems</li>
  <li>Some cancers</li>
  <li>Stroke</li>
  <li>Type 2 diabetes</li>
</ul>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'grey.500' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Health Risks Related to Low BMI
        </AccordionSummary>
        <AccordionDetails>
<ul>
  <li>Cardiovascular disease</li>
  <li>Depression</li>
  <li>Difficulty conceiving (in women)</li>
  <li>Dry skin</li>
  <li>Hair loss</li>
  <li>Irregular menstruation (in women)</li>
  <li>Nutrient deficiencies</li>
  <li>Osteoporosis</li>
  <li>Poor immune system</li>
</ul>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: 'grey.500' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Benefits of a Normal BMI
        </AccordionSummary>
        <AccordionDetails>
        Maintaining a normal BMI (18.5 to 24.9) comes with many benefits, including limiting your risk to all of the above-listed health concerns. Maintaining a normal BMI can also help with better sleep, improved circulation, and even better energy throughout the day.
        </AccordionDetails>
      </Accordion>

    </div>
  );
}
