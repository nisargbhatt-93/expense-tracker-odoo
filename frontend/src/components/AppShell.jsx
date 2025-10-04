import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' }
  }
})

export default function AppShell({children}){
  return (
    <ThemeProvider theme={theme}>
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{flex:1}}>Expense Manager</Typography>
          <Button color="inherit" href="/dashboard">Dashboard</Button>
          <Button color="inherit" href="/submit">Submit</Button>
          <Button color="inherit" href="/admin">Admin</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{p:3}}>{children}</Box>
    </div>
    </ThemeProvider>
  )
}
