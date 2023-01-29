import React from 'react'
import Grid from '@material-ui/core/Grid'
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import tabelStore from '../../store/TableTasksStore'
import updateStore from '../../store/FormUpdateTaskStore'

export default function RowAdmin({task}) {
  return (
    <Grid item xs={12}>
        <Grid container spacing={1} className="table-tasks__item">
            <Grid item xs={3} className={'table-tasks__field'}>{task.user_name}</Grid>
            <Grid item xs={3} className={'table-tasks__field'}>{task.email}</Grid>
            <Grid item xs={4} className={'table-tasks__field'}>{task.text}</Grid>
            <Grid item xs={1} className={'table-tasks__field'}>
                <Checkbox
                    checked = {!!task.completed}
                    color="primary" 
                    onChange={() => tabelStore.setCompletedTask(task.id, !task.completed)}
                />
            </Grid>
            <Grid item xs={1} className={'table-tasks__field'}>
                <Tooltip title="Edit">
                    <IconButton aria-label="Edit" onClick={() => updateStore.openPopup(task)}>
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    </Grid>
  )
}
