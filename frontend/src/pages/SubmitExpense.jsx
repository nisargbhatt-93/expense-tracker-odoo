import React, {useState} from 'react'
import axios from 'axios'
import Tesseract from 'tesseract.js'

export default function SubmitExpense(){
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [file, setFile] = useState(null)

  const handleOCR = async (file) =>{
    const { data: { text } } = await Tesseract.recognize(file, 'eng')
    // naive extraction: find first number as amount
    const match = text.match(/\d+[\.,]?\d*/)
    if(match) setAmount(match[0])
    const dateMatch = text.match(/\d{4}-\d{2}-\d{2}/)
    if(dateMatch) setDate(dateMatch[0])
    setDescription(text.split('\n').slice(0,2).join(' '))
  }

  const submit = async (e) =>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    const fd = new FormData()
    fd.append('amount', amount)
    fd.append('currency', currency)
    fd.append('category', category)
    fd.append('description', description)
    fd.append('date', date)
    if(file) fd.append('receipt', file)
    try{
      await axios.post('http://localhost:8000/expenses/', fd, {headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data'}})
      alert('Submitted')
    }catch(err){
      alert('Error')
    }
  }

  return (
    <div style={{padding:20}}>
      <h2>Submit Expense</h2>
      <form onSubmit={submit}>
        <div><input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" /></div>
        <div><input value={currency} onChange={e=>setCurrency(e.target.value)} placeholder="Currency" /></div>
        <div><input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" /></div>
        <div><input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" /></div>
        <div><input type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
        <div><input type="file" accept="image/*" onChange={e=>{setFile(e.target.files[0]); handleOCR(e.target.files[0])}} /></div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
