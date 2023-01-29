import {useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import store from '../../store/TableTasksStore'
import { observer } from "mobx-react-lite"

import RowUser from './Row';
import RowAdmin from './RowAdmin'

const TableTasks = observer(({admin}) => {
  useEffect(() => {
    store.getPagination()
  }, [])

  const arrowSort = (
    store.paginationSettings.direction === 'ASC' ?
    <ArrowDropUpIcon/> : <ArrowDropDownIcon/>
  )
  
  const Row = admin ? RowAdmin : RowUser
  
  if (store.paginationObject?.tasks) {
    return (
      <div className='table-tasks'>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1} className="table-tasks__item">
              <Grid item xs={3} className={'table-tasks__field table-tasks__field--sort'} onClick={() => store.setFieldSort('user_name')}>
                <span>Name</span>
                { store.paginationSettings.field === 'user_name' && arrowSort }
              </Grid>

              <Grid item xs={3} className={'table-tasks__field table-tasks__field--sort'} onClick={() => store.setFieldSort('email')}>
                <span>Email</span>
                { store.paginationSettings.field === 'email' && arrowSort }
              </Grid>

              <Grid item xs={4} className={'table-tasks__field'}>
                <span>Task</span>
              </Grid>
              
              <Grid item xs={1} className={'table-tasks__field table-tasks__field--sort'} onClick={() => store.setFieldSort('completed')}>
                <span>Completed</span>
                { store.paginationSettings.field === 'completed' && arrowSort }
              </Grid>
            </Grid>
          </Grid>
  
          {
            store.paginationObject.tasks.map(task => (
              <Row task={task} key={task.id} />
            ))
          }
  
          <Grid item xs={12}>
            <div className="table-tasks__panel">
              <ArrowBackIcon onClick={() => store.prevPage()} fontSize="large" className={'table-tasks__arrow-page'}/>
              {store.paginationSettings.page + 1} / {store.paginationObject.totalPage}
              <ArrowForwardIcon onClick={() => store.nextPage()} fontSize="large" className={'table-tasks__arrow-page'}/>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }

  return <></>
})

export default TableTasks