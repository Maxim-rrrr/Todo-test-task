import React from 'react'
import Grid from '@material-ui/core/Grid'
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

export default function Row({task}) {
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
                    disabled 
                />
            </Grid>
            <Grid item xs={1} className={'table-tasks__field'}>
            {
                !!task.edit && 
                <Tooltip title="Edited by admin" aria-label="Edited by admin">
                    <EditIcon/>
                </Tooltip>
            }
            </Grid>
        </Grid>
    </Grid>
  )
}
