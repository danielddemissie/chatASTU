import { Box } from '@mui/material/';
import { nameCapitalize } from '../utils/axios';

export default function Chat({ msg, username, sender }) {
  return (
    <div>
      <Box
        sx={{
          marginTop: 5,
          marginLeft: sender === username ? 3 : 20,
          backgroundColor: '#f3f3f3',
          padding: 3,
          border: '1px solid #fff',
          borderRadius: 5,
        }}
      >
        <span
          style={{
            fontSize: 20,
            marginRight: 5,
            backgroundColor: 'teal',
            borderRadius: '50%',
            padding: 10,
            color: '#fff',
          }}
        >
          {nameCapitalize(username.charAt(0) + username.charAt(1))}
        </span>
        <p style={{ display: 'inline-block' }}>{msg}</p>
      </Box>
    </div>
  );
}
