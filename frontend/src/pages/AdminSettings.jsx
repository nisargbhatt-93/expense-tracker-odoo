import React, {useState, useEffect} from 'react'
import API from '../api/client'
import { Container, TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material'

export default function AdminSettings(){
  const [sequence, setSequence] = useState('')
  const [rules, setRules] = useState([])

  // new rule form state
  const [ruleType, setRuleType] = useState('percentage')
  const [threshold, setThreshold] = useState('')
  const [specificApproverId, setSpecificApproverId] = useState('')
  const [specificRole, setSpecificRole] = useState('')

  useEffect(()=>{ fetchRules(); fetchSequence() },[])

  const fetchRules = async ()=>{
    const res = await API.get('/admin/approval-rules')
    setRules(res.data)
  }
  const fetchSequence = async ()=>{
    const res = await API.get('/admin/approval-sequence')
    setSequence(JSON.stringify(res.data.sequence || []))
  }
  const saveSequence = async ()=>{
    let seq
    try{ seq = JSON.parse(sequence) }catch(e){ alert('Invalid JSON'); return }
    await API.post('/admin/approval-sequence', {sequence: seq})
    alert('Saved')
    fetchSequence()
  }

  const createRule = async ()=>{
    const payload = {
      rule_type: ruleType,
      threshold: threshold ? parseFloat(threshold) : null,
      specific_approver_id: specificApproverId || null,
      specific_role: specificRole || null,
      config: {}
    }
    try{
      await API.post('/admin/approval-rules', payload)
      alert('Rule created')
      setThreshold(''); setSpecificApproverId(''); setSpecificRole('')
      fetchRules()
    }catch(err){
      alert('Error creating rule')
      console.error(err)
    }
  }

  return (
    <Container>
      <Typography variant="h4">Admin Settings</Typography>
      <Box sx={{mt:2}}>
        <Typography>Approval Sequence (JSON array of role names or user ids)</Typography>
        <TextField fullWidth multiline rows={3} value={sequence} onChange={e=>setSequence(e.target.value)} />
        <Button sx={{mt:2}} variant="contained" onClick={saveSequence}>Save Sequence</Button>
      </Box>

      <Box sx={{mt:4}}>
        <Typography variant="h6">Create Approval Rule</Typography>
        <FormControl sx={{minWidth: 200, mt:1}}>
          <InputLabel id="rule-type-label">Rule Type</InputLabel>
          <Select labelId="rule-type-label" value={ruleType} label="Rule Type" onChange={e=>setRuleType(e.target.value)}>
            <MenuItem value={'percentage'}>Percentage</MenuItem>
            <MenuItem value={'specific'}>Specific Approver</MenuItem>
            <MenuItem value={'hybrid'}>Hybrid (OR)</MenuItem>
          </Select>
        </FormControl>

        {ruleType === 'percentage' || ruleType === 'hybrid' ? (
          <TextField sx={{mt:2}} label="Threshold (e.g. 0.6)" value={threshold} onChange={e=>setThreshold(e.target.value)} />
        ) : null}

        {ruleType === 'specific' || ruleType === 'hybrid' ? (
          <>
            <TextField sx={{mt:2}} label="Specific Approver ID (optional)" value={specificApproverId} onChange={e=>setSpecificApproverId(e.target.value)} />
            <TextField sx={{mt:2}} label="Specific Role (optional)" value={specificRole} onChange={e=>setSpecificRole(e.target.value)} />
          </>
        ) : null}

        <Box>
          <Button sx={{mt:2}} variant="contained" onClick={createRule}>Create Rule</Button>
        </Box>
      </Box>

      <Box sx={{mt:4}}>
        <Typography variant="h6">Existing Rules</Typography>
        {rules.map(r=> <Box key={r.id} sx={{p:1, border: '1px solid #eee', mt:1}}>{JSON.stringify(r)}</Box>)}
      </Box>
    </Container>
  )
}
