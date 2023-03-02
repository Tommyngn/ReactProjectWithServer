from datetime import *
def validatePostData(data, cursor):
    errors = []

    cursor.execute('SELECT * FROM employee WHERE person_id = %s', int(data['employeeId']))
    result = cursor.fetchone()

    if result != None:
        errors.append({'errors': 'personal Id already exists'})

    if data.get('employeeId').isdigit() is False or len(data.get('employeeId')) < 7 or len(data.get('employeeId')) > 7:
        errors.append({'error': 'Invalid personal ID'})

    if data.get('employeeFirstName').isalpha() is False or data.get('employeeFirstName') == "":
        errors.append({'error': 'Not a proper first name'})

    if data.get('employeeLastName').isalpha() is False or data.get('employeeLastName') == "":
        errors.append({'error': 'Not a proper last name'})

    if len(data.get('emailAddress')) == 0:
        errors.append({'error': 'email is empty'})

    symbolcheck = 0
    periodcheck = 0
    for i in data.get('emailAddress'):
        if i == ' ':
            errors.append({'error': 'Theres a space in the email address'})
            break
        elif i == '@':
            symbolcheck += 1
        elif i == '.':
            periodcheck += 1

    if periodcheck == 0 or symbolcheck != 1:
        errors.append({'error': 'Not a valid email address'})

    datestring = data['hiredDate'][0:10].split('-')
    dateObject = datetime(int(datestring[0]),int(datestring[1]),int(datestring[2])).date()
    if dateObject > date.today():
        errors.append({'error': 'Hire date can not be in the future'})

    if data.get('employeeId') != "" and data.get('agencyNumber').isdigit() == False:
        errors.append({'error': 'agency number is empty or not a valid number'})

    return errors


