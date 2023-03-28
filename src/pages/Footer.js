import React from 'react'
import Typography from '@mui/material/Typography'
import { Avatar } from '@mui/material'
const Footer = () => {
  return (
      <>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', backgroundColor: 'black', color: 'white' ,flexDirection:'column'}}>
              <Typography variant="subtitle1" color="white">
                  copyright &copy; 2023
              </Typography>
              <Avatar 
                  style={{ marginLeft: '10px' }}
                  alt="R"
                  src="https://avatars.githubusercontent.com/u/90370450?v=4"
              />
          </div>
          
      </>
  )
}

export default Footer