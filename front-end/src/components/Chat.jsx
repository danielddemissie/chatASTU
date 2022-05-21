import React from 'react';
import { Card, CardHeader } from '@mui/material/';

export default function Chat({ username }) {
  return (
    <div>
      <Card>
        <CardHeader title={username} />
      </Card>
    </div>
  );
}
