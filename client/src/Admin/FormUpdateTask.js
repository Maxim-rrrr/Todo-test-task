import React from 'react'
import updateStore from '../store/FormUpdateTaskStore'
import tableStore from '../store/TableTasksStore'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { observer } from "mobx-react-lite"
import { apiClient } from '../api/apiClient';

const FormUpdateTask = observer(() => {
    const handleSubmit = () => {
        apiClient.tasks.update(tableStore.paginationSettings, {
                id: updateStore.updateTask.id, 
                text: updateStore.updateTask.text, 
                edit: true
            }).then(data => {
                if (data.success) {
                    tableStore.setPaginationObject(data.paginationObject)
                    updateStore.closePopup()
                }
            })
    }

    return (
        <Dialog open={updateStore.isOpenPopup} onClose={() => updateStore.closePopup()} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit task</DialogTitle>

            <DialogContent>
                <form noValidate autoComplete="off">
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label="Name" 
                                variant="outlined" 
                                className='text-field'
                                value={updateStore.updateTask.user_name}
                                disabled
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label="Email" 
                                variant="outlined" 
                                className='text-field'
                                value={updateStore.updateTask.email}
                                disabled
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                label="Task"
                                multiline
                                minRows={4}
                                variant="outlined"
                                className='text-field'
                                value={updateStore.updateTask.text}
                                onChange={event => updateStore.fieldChange('text', event.target.value)}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => updateStore.closePopup()} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleSubmit()} color="primary">
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default FormUpdateTask