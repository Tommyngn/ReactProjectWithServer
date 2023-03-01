import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Drawer } from '@mui/material';
import dayjs  from 'dayjs';
import JobTitleSelect from '../../../shared/components/JobTitleSelect';
import { UseEmployeeContext } from '../../../shared/contexts/EmployeeInformationContext';
import { months } from '../../../shared/constants/months';

const employeeUpdate = async (currentEmployee, firstName, lastName, email, job, hired, setListOfEmployees) => {
    const employeeFirstName = firstName !== "" ? firstName : currentEmployee.employeeFirstName
    const employeeLastName = lastName !== "" ? lastName : currentEmployee.employeeLastName
    const emailAddress = email !== "" ? email : currentEmployee.emailAddress

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...currentEmployee,
            employeeFirstName: employeeFirstName,
            employeeLastName: employeeLastName,
            emailAddress: emailAddress,
            job: job,
            hiredDate: hired
        })
    };

    const response = await fetch("http://localhost:3000/update", requestOptions).then((response) => {
        console.log(response)
        if (response.status === 200){
            return response.json()
        } else{
            return response.status
        }
    }).catch((error) => {
        console.log(error)
    })
    if (response !== 401) {
        setListOfEmployees(response)
    }
};


const EditModal = ({isOpen, setIsOpen}) => {
    const [value, setValue] = useState(dayjs())
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [job, setJob] = useState("")
    const [hired, setHired] = useState(dayjs())
    const { 
        currentEmployee: [currentEmployee],
        listOfEmployees: [,setListOfEmployees]
     } = UseEmployeeContext();

     useEffect(() => {
        if (currentEmployee) {
            setValue(dayjs(currentEmployee.hiredDate))
        }
     },[currentEmployee])

    return (
        <div>
        <Drawer anchor='right' open={isOpen} onClose={() => {setIsOpen(false);}}>
                <Box sx={{width: 300, padding: 3}}>
                    <Grid container spacing={2} justifyContent="space-around">
                        <Grid item xs={12}>
                            <TextField label={currentEmployee ? currentEmployee.employeeFirstName : "First Name"} variant='outlined' onChange={(event) => {setFirstName(event.target.value)}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label={currentEmployee ? currentEmployee.employeeLastName : "Last Name"} variant='outlined' onChange={(event) => {setLastName(event.target.value)}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label={currentEmployee ? currentEmployee.emailAddress : "Email"} variant='outlined' onChange={(event) => {setEmail(event.target.value)}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <JobTitleSelect job={currentEmployee ? currentEmployee.job : 0} changeJob={setJob}/>
                        </Grid>
                        <Grid item xs={12}>
                            <DatePicker 
                            label="Hired Date" 
                            value={value}
                            renderInput={(params) => <TextField {...params} />} 
                            onChange={(newValue) => {
                                setValue(newValue);
                                const dateArray = value['$d'].toString().split(" ")
                                const month = months[dateArray[1]]
                                const fulldate = `${dateArray[3]}-${month}-${dateArray[2]}`
                                console.log(fulldate)
                                setHired(fulldate)
                                }
                            }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={() => {
                                employeeUpdate(currentEmployee, firstName, lastName, email, job, hired, setListOfEmployees)
                                setIsOpen(false)
                            }}>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </div>
    )
};

export default EditModal;