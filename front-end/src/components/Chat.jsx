import { Box } from '@mui/material/';

export default function Chat({ msg, username }) {
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
          {username}
        </span>
        <span>{msg}</span>
      </Box>
    </div>
  );
}
