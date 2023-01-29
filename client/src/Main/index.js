import Container from '@material-ui/core/Container';
import FormCreateTask from "./FormCreateTask.js";
import TableTasks from '../components/TableTasks/index.js';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'


const Main = () => {
    return (
        <div className='main'>
            <Link to="/admin" className='login-btn'>
                <Button variant="contained" color="primary">
                    Login
                </Button>
            </Link>

            <Container maxWidth="md">
                <TableTasks/>
                <FormCreateTask/>
            </Container>
        </div>
    )
}

export default Main