import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SubmitExpense from './pages/SubmitExpense'
import AdminSettings from './pages/AdminSettings'
import ApprovalsQueue from './pages/ApprovalsQueue'
import History from './pages/History'
import AppShell from './components/AppShell'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppShell>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/submit" element={<SubmitExpense/>} />
        <Route path="/admin" element={<AdminSettings/>} />
        <Route path="/queue" element={<ApprovalsQueue/>} />
        <Route path="/history" element={<History/>} />
      </Routes>
      </AppShell>
    </BrowserRouter>
  </React.StrictMode>
)
