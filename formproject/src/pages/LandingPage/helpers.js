
export const formatJson = (employeeId, employeeFirstName, employeeLastName, emailAddress, hiredDate, agencyNumber, registrationNumber, job ) => {

    return {
        "employeeId": employeeId,
        "employeeFirstName": employeeFirstName,
        "employeeLastName": employeeLastName,
        "emailAddress": emailAddress,
        "hiredDate": hiredDate,
        "agencyNumber": agencyNumber,
        "registrationNumber": registrationNumber,
        "job": job
    }
}