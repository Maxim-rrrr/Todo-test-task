import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import formStore from '../store/FormCreateTaskStore'
import tableStore from '../store/TableTasksStore';
import { observer } from "mobx-react-lite"
import { apiClient } from '../api/apiClient';

const FormCreateTask = observer(() => {
    const handleSubmit = () => {
        apiClient.tasks.add(tableStore.paginationSettings, formStore.fields).then(data => {
            if (data.success) {
                tableStore.setPaginationObject(data.paginationObject)
                formStore.clearFields()
                formStore.closePopup()
            } else {
                formStore.setFieldsError(data.errors)
            }
        })
    }

    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => formStore.openPopup()}>
                Add Task
            </Button>

            <Dialog open={formStore.isOpenPopup} onClose={() => formStore.closePopup()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create task</DialogTitle>

                <DialogContent>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    error={formStore.fieldsError['user_name']}
                                    helperText={formStore.fieldsError['user_name']}
                                    label="Name" 
                                    variant="outlined" 
                                    className='text-field'
                                    value={formStore.fields.user_name}
                                    onChange={event => formStore.fieldChange('user_name', event.target.value)}
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    error={formStore.fieldsError['email']}
                                    helperText={formStore.fieldsError['email']}
                                    label="Email" 
                                    variant="outlined" 
                                    className='text-field'
                                    value={formStore.fields.email}
                                    onChange={event => formStore.fieldChange('email', event.target.value)}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    error={formStore.fieldsError['text']}
                                    helperText={formStore.fieldsError['text']}
                                    label="Task"
                                    multiline
                                    minRows={4}
                                    variant="outlined"
                                    className='text-field'
                                    value={formStore.fields.text}
                                    onChange={event => formStore.fieldChange('text', event.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => formStore.closePopup()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSubmit()} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
})

export default FormCreateTask