import './App.css';
import Web3 from 'web3'
import { useEffect, useState } from 'react'

import { TODOLIST_ABI, TODOLIST_ADDRESS } from './config'
import Tasks from './Tasks'
import CreateTasks from './CreateTasks'

const App = () => {
  const [acct, setAcct] = useState('')
  const [contract, setContract] = useState([])
  const [task, setTask] = useState([])
  const [taskCount, setTaskCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const loadBlockchainData = async () => {
    setLoading(true)
    console.log('Initiate app...')
    const provider = window.ethereum
    try {
      const web3 = await new Web3(provider)
      const acc = await (await web3.eth.requestAccounts())[0]
      setAcct(acc)

      const todo_list = new web3.eth.Contract(TODOLIST_ABI, TODOLIST_ADDRESS)
      setContract(todo_list)

      const taskCount = await todo_list.methods.taskCount().call()
        
      setTaskCount(taskCount)
      for (var i = 1; i <= taskCount; i++) {
        // methods.mymethod.call - call constant method sithout sending any transaction
        const temp_task = await todo_list.methods.tasks(i).call()
        setTask(t => {return [...t, temp_task]})
      }
      setLoading(false) 

    } catch (error) {
      console.log(`Load Blockchain Data Error: ${error}`)
    } 
  }
  

  const loadTasks = async () => {

    const taskCount = await contract.methods.taskCount().call()
    
    setTaskCount(taskCount)
    setTask(() => [])
    for (var i = 1; i <= taskCount; i++) {
      // methods.mymethod.call - call constant method sithout sending any transaction
      const temp_task = await contract.methods.tasks(i).call()
      setTask(t => {return [...t, temp_task]})
    }
  }

  const createTask = async (text) => {
    setLoading(true)
    console.log('Create task...')
    console.log(`Task: ${text}`)
    console.log(`Account: ${acct}`)

    const r = await contract.methods.createTask(text).send({from: acct})
    console.log(`Create successful...`)
    const hash = r['transactionHash']
    console.log(`Transaction Hash: ${hash}`)

    // ggetTransactionReceipt
    const web3 = await new Web3(window.ethereum)

    const tx = await web3.eth.getTransactionReceipt(hash)
    if(tx.status) {
      console.log(`Transaction success...`)
      await loadTasks()
    } else {
      console.log(`Transaction failed...`)
      alert('Failed transaction')
    }
    setLoading(false)
  }

  const completeTask = async (id) => {
    setLoading(true)
    console.log('Complete task...')
    console.log(`Task ID: ${id}`)
    console.log(`Account: ${acct}`)
    const r = await contract.methods.toggleCompleted(id).send({from: acct})

    console.log(`Toggle complete successful...`)
    const hash = r['transactionHash']
    console.log(`Transaction Hash: ${hash}`)

    const web3 = await new Web3(window.ethereum)

    const tx = await web3.eth.getTransactionReceipt(hash)
    if(tx.status) {
      console.log(`Transaction success...`)
      await loadTasks()
    } else {
      console.log(`Transaction failed...`)
      alert('Failed transaction')
    }

    setLoading(false)

  }


  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <>
      <h1>Hello</h1>
      <p>Your account: { acct }</p>
      <CreateTasks createTask={ createTask }/>
      {loading? (<p>Loading...</p>) : (<Tasks task={ task } completeTask={ completeTask }/>)}
    </>
  )

}



export default App;
