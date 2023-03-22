import React, { useState, useContext, createContext, useMemo, useEffect } from 'react';
import dayjs from 'dayjs';


const EmployeeContext = createContext({})

export const UseEmployeeContext = () => useContext(EmployeeContext);

const EmployeeInformationContext = ({children}) => {

    const [employeeId, setEmployeeId] = useState("");
    const [currentEmployee, setCurrentEmployee] = useState(null)
    const [employeeFirstName, setEmployeeFirstName] = useState("");
    const [employeeLastName, setEmployeelastName] = useState("")
    const [emailAddress, setEmailAddress] = useState("");
    const [agencyNumber, setAgencyNumber] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [hiredDate, setHiredDate] = useState(dayjs());
    const [job, setJob] = useState("")
    const [listOfEmployees, setListOfEmployees] = useState([]);

    const getInitialData = async () => {

        const response = await fetch("https://react-form-app.herokuapp.com/welcome").then((response) => {
            return response.json()
        }).catch((error) => {
            console.log(error)
        })
        setListOfEmployees(response)
    }

    useEffect(() => {
        getInitialData()
    },[])

    const memoValue = useMemo(()=> ({
        employeeId: [employeeId, setEmployeeId],
        currentEmployee: [currentEmployee, setCurrentEmployee],
        employeeFirstName: [employeeFirstName, setEmployeeFirstName],
        employeeLastName: [employeeLastName, setEmployeelastName],
        emailAddress: [emailAddress, setEmailAddress],
        agencyNumber: [agencyNumber, setAgencyNumber],
        registrationNumber: [registrationNumber, setRegistrationNumber],
        hiredDate: [hiredDate, setHiredDate],
        job: [job, setJob],
        listOfEmployees: [listOfEmployees, setListOfEmployees]
    }), [
       employeeId,
       currentEmployee,
       employeeFirstName,
       employeeLastName,
       emailAddress,
       agencyNumber,
       registrationNumber,
       hiredDate,
       job,
       listOfEmployees 
    ])

    return (
        <EmployeeContext.Provider value={memoValue}>
            {children}
        </EmployeeContext.Provider>
    )
};

export default EmployeeInformationContext;