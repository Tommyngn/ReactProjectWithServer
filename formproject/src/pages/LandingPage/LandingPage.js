import React, {useState, useEffect} from 'react'
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import EditModal from './components/EditModal';
import EmployeeInfoRow from './components/EmployeeInfoRow';
import JobTitleSelect from '../../shared/components/JobTitleSelect';
import { UseEmployeeContext } from '../../shared/contexts/EmployeeInformationContext';
import { formatJson } from './helpers';
import { months } from '../../shared/constants/months';

const employeeAdd = async (data, setListOfEmployees) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const response = await fetch("http://localhost:3000/add", requestOptions).then((response) => {
        if (response.status === 200){
            return response.json()
        } else{
            return response.status
        }
    }).catch((error) => {
        console.log(error)
    })
    console.log(response)
    if (response !== 401) {
        setListOfEmployees(response)
    }
}

const LandingPage = () => {
    const [value, setValue] = useState(dayjs());
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [employees, setEmployees] = useState([])
    const { 
        employeeId: [employeeId, setEmployeeId],
        currentEmployee: [,setCurrentEmployee],
        employeeFirstName: [employeeFirstName, setEmployeeFirstName],
        employeeLastName: [employeeLastName, setEmployeelastName],
        emailAddress: [emailAddress, setEmailAddress],
        agencyNumber: [agencyNumber, setAgencyNumber],
        registrationNumber: [registrationNumber, setRegistrationNumber],
        hiredDate: [hiredDate, setHiredDate],
        job: [job, setJob],
        listOfEmployees: [listOfEmployees ,setListOfEmployees]
     } = UseEmployeeContext();

    useEffect(() => {
        if (listOfEmployees.length > 0) {
            setEmployees(listOfEmployees)
        }
    })

    return (
        <div style={{paddingLeft: "2%"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label="Employee ID" variant='outlined' value={employeeId} onChange={(event) => {setEmployeeId(event.target.value)}}/>
                </Grid>
                <Grid item xs={2}>
                    <TextField label="First Name" variant='outlined' value={employeeFirstName} onChange={(event) => {setEmployeeFirstName(event.target.value)}}/>
                </Grid>
                <Grid item xs={10}>
                    <TextField label="Last Name" variant='outlined' value={employeeLastName} onChange={(event) => {setEmployeelastName(event.target.value)}}/>
                </Grid>
                <Grid item xs={2}>
                    <TextField label="Email Address" variant='outlined' value={emailAddress} onChange={(event) => {setEmailAddress(event.target.value)}}/>
                </Grid>
                <Grid item xs={10}>
                    <DatePicker 
                        label="Hired Date" 
                        value={value}
                        renderInput={(params) => <TextField {...params} />} 
                        onChange={(newValue) => {
                            setValue(newValue);
                            const dateArray = value['$d'].toString().split(" ")
                            const month = months[dateArray[1]]
                            const fulldate = `${dateArray[3]}-${month}-${dateArray[2]}`
                            setHiredDate(fulldate)
                            }
                        }
                    />
                </Grid>
                <Grid item xs={2} >
                    <JobTitleSelect job={job} changeJob={setJob}/>
                </Grid>
                <Grid item xs={10}>
                    <TextField label={"Agency Number"} variant='outlined' value={agencyNumber} onChange={(event) => {setAgencyNumber(event.target.value)}}/>
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        variant='contained' 
                        onClick={() => { employeeAdd(formatJson
                            (
                                employeeId,
                                employeeFirstName, 
                                employeeLastName,
                                emailAddress,
                                hiredDate,
                                agencyNumber,
                                registrationNumber,
                                job
                            ), setListOfEmployees)
                            setEmployeeId("")
                            setEmployeeFirstName("")
                            setEmployeelastName("")
                            setEmailAddress("")
                            setAgencyNumber("")
                            setRegistrationNumber("")
                            setJob("")
                            setHiredDate(dayjs())
                            }
                        }
                    >
                        Add
                    </Button>
                </Grid>
                { employees.length > 0 ? employees.map((employee) => {
                    return <EmployeeInfoRow employee={employee} openModal={() => {
                        const l = listOfEmployees.filter(e => e.employeeId === employee.employeeId )
                        setCurrentEmployee(l[0])
                        setEditModalOpen(true)
                    }}/>
                }) : <></> }
                <EditModal isOpen={editModalOpen} setIsOpen={setEditModalOpen} />
            </Grid>
        </div>
    )

};

export default LandingPage;