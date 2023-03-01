def formatGetListResponse(data):
    result = []

    for i in data:
        d = {}
        d['employeeId'] = str(i['person_id'])
        d['employeeFirstName'] = i['first_name']
        d['employeeLastName'] = i['last_name']
        d['emailAddress'] = i['email_address']
        d['agencyNumber'] = str(i['agency_number'])
        d['hiredDate'] = i['hired_date']
        d['job'] = i['job_title']
        result.append(d)

    return result
