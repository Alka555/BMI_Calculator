import * as React from 'react';
import { Gauge } from '@mui/x-charts/Gauge';

export default function Gup({ value }) {
  return (
    <Gauge
      value={value}
      startAngle={0}
      endAngle={360}
      innerRadius="80%"
      outerRadius="100%"
      needleColor="white"
      arcColor="rgba(255, 255, 255, 0.5)"
      
    />
  );
}
import Alert from '@mui/material/Alert';
<Alert severity="warning">This is a warning Alert.</Alert>