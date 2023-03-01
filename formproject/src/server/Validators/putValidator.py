from datetime import *
import pymysql

conn = pymysql.connect(
    host='sql9.freesqldatabase.com',
    database='sql9601759',
    user='sql9601759',
    password='VHBB3I6Evw',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

cursor = conn.cursor()

def validatePutData(data):
    errors = []

    cursor.execute('SELECT * FROM employee WHERE person_id = %s', int(data['employeeId']))
    result = cursor.fetchone()

    if result == None:
        errors.append({'error': 'employee does not exist'})

    if data.get('employeeFirstName').isalpha() is False or data.get('employeeFirstName') == "":
        errors.append({'error': 'Not a proper first name'})

    if data.get('employeeLastName').isalpha() is False or data.get('employeeLastName') == "":
        errors.append({'error': 'Not a proper last name'})

    if len(data.get('emailAddress')) == 0:
        errors.append({'error': 'email is empty'})

    emailcheck = 0
    for i in data.get('emailAddress'):
        if i == ' ':
            errors.append({'error': 'Theres a space in the email address'})
        elif i == '@':
            emailcheck += 1
        elif i == '.':
            emailcheck += 1

    if emailcheck != 2:
        errors.append({'error': 'Not a valid email address'})

    datestring = data['hiredDate'][0:10].split('-')
    dateObject = datetime(int(datestring[0]), int(datestring[1]), int(datestring[2])).date()
    print(dateObject)
    if dateObject > date.today():
        errors.append({'error': 'Hire date can not be in the future'})

    return errors