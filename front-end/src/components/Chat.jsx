import React from 'react';
import { Box } from '@mui/material/';

export default function Chat({ text }) {
  return (
    <div>
      <Box
        sx={{
          marginTop: 2,
          marginLeft: 3,
        }}
      >
        <span
          style={{
            color: 'teal',
            fontSize: 20,
            marginRight: 10,
          }}
        >
          {text.split(' ')[0]}
        </span>
        <span>{text}</span>
      </Box>
    </div>
  );
}
