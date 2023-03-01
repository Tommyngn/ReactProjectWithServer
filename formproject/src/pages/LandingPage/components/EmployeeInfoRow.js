import React from 'react'
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { UseEmployeeContext } from '../../../shared/contexts/EmployeeInformationContext';

const employeeDelete = async (data, setListOfEmployees) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const response = await fetch(`http://localhost:3000/delete/${data}`, requestOptions).then((response) => {
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
}

const employeeGet = async (data, setCurrentEmployee) => {

    const response = await fetch(`http://localhost:3000/get/${data}`).then((response) => {
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
        setCurrentEmployee(response[0])
    }
}


const EmployeeInfoRow = ({employee, openModal}) => {
    const {listOfEmployees: [,setListOfEmployees], currentEmployee: [,setCurrentEmployee]} = UseEmployeeContext()

    return (
        <Grid container spacing={2}>
            <Grid item>
                <Typography variant='overline'>
                    {`${employee.employeeFirstName} ${employee.employeeLastName}`}
                </Typography>
            </Grid>
            <Grid item>
                <Button onClick={() => {
                    employeeDelete(employee.employeeId,setListOfEmployees)
                }}>
                    Delete
                </Button>
            </Grid>
            <Grid item>
                <Button onClick={() => {
                    employeeGet(employee.employeeId, setCurrentEmployee)
                    openModal()
                }}>
                    Edit
                </Button>
            </Grid>
        </Grid>
    )


};

export default EmployeeInfoRow;