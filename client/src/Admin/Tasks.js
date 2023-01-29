import React from 'react'
import TableTasks from '../components/TableTasks/index.js';
import Container from '@material-ui/core/Container';
import FormUpdateTask from './FormUpdateTask'
import Button from '@material-ui/core/Button';

const Tasks = () => {
  const logout = () => {
    localStorage.removeItem('auth_token')
    document.location.reload()
  }

  return (
    <div className='main'>
      <div className="logout-btn">
        <Button className='' variant="contained" color="primary" onClick={logout}>
          Logout
        </Button>
      </div>

      <Container maxWidth="md">
          <TableTasks admin={true}/>
          <FormUpdateTask/>
      </Container>
    </div>
  )
}


export default Tasks