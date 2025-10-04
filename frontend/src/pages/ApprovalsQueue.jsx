import React, {useState, useEffect} from 'react'
import API from '../api/client'
import { Container, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material'

export default function ApprovalsQueue(){
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(null)
  const [comment, setComment] = useState('')
  useEffect(()=>{ fetchQueue() },[])
  const fetchQueue = async ()=>{
    const res = await API.get('/approvals/queue')
    setItems(res.data)
  }
  const openDialog = (item)=>{ setCurrent(item); setOpen(true); setComment('') }
  const action = async (approve)=>{
    await API.post('/approvals/approve', {expense_id: current.expense_id, approve, comment})
    setOpen(false)
    fetchQueue()
  }
  return (
    <Container>
      <h2>Approval Queue</h2>
      <List>
        {items.map(i=> (
          <ListItem key={i.id} secondaryAction={(
            <>
              <Button sx={{mr:1}} variant="contained" color="primary" onClick={()=>{setCurrent(i); setComment(''); setOpen(true)}}>Action</Button>
            </>
          )}>
            <ListItemText primary={`Expense ${i.expense_id} (order ${i.order})`} secondary={i.comment || `Approver role: ${i.approver_role || 'specific'}`} />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Approve / Reject</DialogTitle>
        <DialogContent>
          <TextField label="Comment" fullWidth multiline rows={3} value={comment} onChange={e=>setComment(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>action(false)}>Reject</Button>
          <Button variant="contained" onClick={()=>action(true)}>Approve</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
