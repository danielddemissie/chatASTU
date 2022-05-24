import React from 'react';
import { Box } from '@mui/material/';

export default function Chat({ username, text }) {
  return (
    <div>
      <Box>
        <span
          style={{
            color: 'teal',
            fontSize: 20,
            marginRight: 10,
          }}
        >
          {username}
        </span>
        <span>{text}</span>
      </Box>
    </div>
  );
}
