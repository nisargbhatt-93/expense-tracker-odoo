import React, {useState, useEffect} from 'react'
import API from '../api/client'
import { Container, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

export default function History(){
  const [rows, setRows] = useState([])
  useEffect(()=>{ fetchHistory() },[])
  const fetchHistory = async ()=>{
    const res = await API.get('/expenses/me')
    setRows(res.data)
  }
  return (
    <Container>
      <h2>My Expenses</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Company Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(r=> (
            <TableRow key={r.id}>
              <TableCell>{r.id}</TableCell>
              <TableCell>{r.original_amount} {r.original_currency}</TableCell>
              <TableCell>{r.company_amount} {r.company_currency}</TableCell>
              <TableCell>{r.category}</TableCell>
              <TableCell>{r.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}
