import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { get, post, del, put } from './baseApi'
import './App.css';

function App() {
  const [message, setMessage] = useState('')
  const [tableData, setTableData] = useState([])
  const [httpMethod, setHttpMethod] = useState('GET')
  const [endpoint, setEndpoint] = useState('api/todos')
  const [id, setId] = useState('')

  const [todoItem, setTodoItem] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')

  const [errorMsg, setErrorMsg] = useState('')

  const [indexToIdMapping, setIndexToIdMapping] = useState({})

  useEffect(() => {
    tableData.map((item, index) => {
      const id = item._id
      indexToIdMapping[index+1] = id
    })
  }, [tableData])

  useEffect(() => {
    setId('')
    setTodoItem('')
    setDescription('')
    setType('')
  }, [httpMethod])

  const allParametersPresent = () => {
    if (todoItem === '' || description === '' || type === '') {
      setErrorMsg('Please fill in all parameter fields.')
      return false
    }
    return true
  }

  const itemIdPresent = () => {
    if (id === '') {
      setErrorMsg('Item Id not present.')
      return false
    }
    return true
  }

  const handleSubmit = () => {
    setMessage('')
    setTableData([])
    if (httpMethod === 'GET') {
      if (indexToIdMapping[id] === undefined) {
        setErrorMsg('Id is invalid.')
        return
      }
      const newEndpoint = id === '' ? endpoint : endpoint + '/' + indexToIdMapping[id]
      get(newEndpoint)
        .then((res)=>res.json())
        .then((data)=>{
          console.log(data)
          setMessage(data.message)
          setTableData(id === '' ? data.data : [data.data])
        })
    } else if (httpMethod === 'POST') {
      if (!allParametersPresent()) {
        return
      }
      setErrorMsg('')
      const newEndpoint = endpoint + '?todoItem=' + todoItem + '&description=' + description + '&type=' + type
      post(newEndpoint)
        .then((res)=>res.json())
        .then((data)=>{
          setMessage(data.message)
          setTableData([data.data])
        })
    } else if (httpMethod === 'DELETE') {
      if (!itemIdPresent()) {
        return
      }
      setErrorMsg('')
      const backendId = indexToIdMapping[id]
      console.log(backendId)
      del(endpoint + '/' + backendId)
        .then(res=>res.json())
        .then((data)=>{
          setMessage(data.message)
        })
      get(endpoint)
        .then((res)=>res.json())
        .then((data)=>{
          setTableData(data.data)
        })
    } else if (httpMethod === 'PUT') {
      if (!itemIdPresent() || !allParametersPresent()){
        return
      }
      setErrorMsg('')
      const backendId = indexToIdMapping[id]
      const newEndpoint = endpoint + '/' + backendId + '?todoItem=' + todoItem + '&description=' + description + '&type=' + type
      put(newEndpoint)
        .then((res)=>res.json())
        .then((data)=>{
          setMessage(data.message)
          setTableData([data.data])
        })
    }
  }

  const TodoTable = () => {
    return (
      <Table variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Description</th>
            <th>type</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => {
            return (
              <tr>
                <td>{index+1}</td>
                <td>{item.todoItem}</td>
                <td>{item.description}</td>
                <td>{item.type}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    );
  }

  const MethodDropdown = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          {httpMethod}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setHttpMethod('GET')}>GET</Dropdown.Item>
          <Dropdown.Item onClick={() => setHttpMethod('POST')}>POST</Dropdown.Item>
          <Dropdown.Item onClick={() => setHttpMethod('PUT')}>PUT</Dropdown.Item>
          <Dropdown.Item onClick={() => setHttpMethod('DELETE')}>DELETE</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  const EndpointDropdown = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          {endpoint}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setEndpoint('api/todos')}>api/todos</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  const ParameterInputs = () => {
    return (
      <Box display={'flex'} flexDirection={'column'}>
        <TextField label="Item Name" variant="outlined" size="small" sx={{ my: 0.5}}
          value={todoItem} onChange={(e) => setTodoItem(e.target.value)}/>
        <TextField label="Description" variant="outlined" size="small" sx={{ my: 0.5}}
          value={description} onChange={(e) => setDescription(e.target.value)}/>
        <TextField label="Type" variant="outlined" size="small" sx={{ my: 0.5}}
          value={type} onChange={(e) => setType(e.target.value)}/>
      </Box>
    )
  }

  const ApiSelection = () => {
    return (
      <Card sx={{ minWidth: '50vw', mb:2 , minHeight: '27vh'}}>
        <CardContent>
          <div class="row">
            <div class="col-md-3"><MethodDropdown /></div>
            <div class="col-md-3"><EndpointDropdown /></div>
            {httpMethod !== 'POST' &&
            <div class="col-md-4">
              <TextField label="Id" variant="outlined" size="small" value={id} onChange={(e)=>setId(e.target.value)} sx={{ my: 0.5}}/>
            </div>
            }
          </div>
          {(httpMethod === 'POST' || httpMethod === 'PUT') &&
            <div>
              <ParameterInputs />
            </div>
          }

          <div><button class="btn btn-primary" onClick={handleSubmit}>Submit</button></div>

          {message && <Typography>{message}</Typography>}

          {errorMsg && <Typography>{errorMsg}</Typography>}
        </ CardContent>
      </Card>
    )
  }

  return (
    <div className="App">
      <header className="App-header">

        <h1>OTOT-B</h1>

        <ApiSelection />

        {tableData && tableData.length > 0 && <TodoTable />}

      </header>
    </div>
  );
}

export default App;
