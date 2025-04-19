import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReceiptForm from './ReceiptForm'
import ReceiptHistory from './ReceiptHistory'

function App() {
  const [receipts, setReceipts] = useState(() => {
    const savedReceipts = localStorage.getItem('receipts')
    return savedReceipts ? JSON.parse(savedReceipts) : []
  })

  useEffect(() => {
    localStorage.setItem('receipts', JSON.stringify(receipts))
  }, [receipts])

  const addReceipt = (newReceipt) => {
    setReceipts((prevReceipts) => [...prevReceipts, newReceipt])
  }

  const updateReceipt = (index, updatedReceipt) => {
    setReceipts((prevReceipts) => {
      const newReceipts = [...prevReceipts]
      newReceipts[index] = updatedReceipt
      return newReceipts
    })
  }

  const deleteReceipt = (index) => {
    setReceipts((prevReceipts) => prevReceipts.filter((_, i) => i !== index))
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={
              <ReceiptForm 
                receipts={receipts} 
                addReceipt={addReceipt} 
                updateReceipt={updateReceipt} 
                deleteReceipt={deleteReceipt} 
              />
            } 
          />
          <Route 
            path="/history" 
            element={<ReceiptHistory receipts={receipts} updateReceipt={updateReceipt} deleteReceipt={deleteReceipt} />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
