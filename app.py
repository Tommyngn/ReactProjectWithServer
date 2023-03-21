from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from Validators import postValidator, deleteValidator, putValidator
from formatters import getFormatter
from datetime import date
import pymysql

app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(app)

def dbConnection():
    conn = None
    try:
        conn = pymysql.connect(
            host='sql9.freesqldatabase.com',
            database='sql9601759',
            user='sql9601759',
            password='VHBB3I6Evw',
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
    except pymysql.Error as e:
        print(e)

    return conn

@app.route('/welcome')
def getEmployeeList():
    conn = dbConnection()
    cursor = conn.cursor()
    query = "SELECT * FROM employee"
    cursor.execute(query)
    result = getFormatter.formatGetListResponse(cursor.fetchall())
    return make_response(jsonify(result), 200)

@app.route('/')
def index():

    return app.send_static_file('index.html')

@app.route('/get/<id>', methods=['GET'])
def getSingleEmployee(id):
    conn = dbConnection()
    cursor = conn.cursor()
    query = "SELECT * FROM employee WHERE person_id = %s"
    cursor.execute(query, int(id))
    result = getFormatter.formatGetListResponse(cursor.fetchall())
    return make_response(jsonify(result), 200)

@app.route('/add', methods = ['POST'])
def addEmployee():
    conn = dbConnection()
    cursor = conn.cursor()
    data = request.get_json()
    print(data)
    errors = postValidator.validatePostData(data,cursor)
    if len(errors) > 0:
        return make_response(jsonify(errors), 401)

    query = """
                INSERT INTO employee (person_id, first_name, last_name, email_address, hired_date, agency_number, job_title,
                registration_date) VALUES( %s, %s, %s, %s, %s, %s, %s, %s)
            """
    cursor.execute(query, (int(data['employeeId']), data['employeeFirstName'], data['employeeLastName'],
                           data['emailAddress'], data['hiredDate'][0:10], int(data['agencyNumber']), data['job'], date.today()
                           ))
    conn.commit()
    query = "SELECT * FROM employee"
    cursor.execute(query)
    result = getFormatter.formatGetListResponse(cursor.fetchall())
    return make_response(jsonify(result), 200)


@app.route('/delete/<id>', methods=['POST'])
def removeEmployee(id):
    conn = dbConnection()
    cursor = conn.cursor()
    print(id)
    if deleteValidator.validateDeleteData(id, cursor) == False:
        return make_response((jsonify({'error': 'Employee does not exist'})), 401)
    query = "DELETE from employee WHERE person_id = %s"
    cursor.execute(query,int(id))
    conn.commit()
    query = "SELECT * FROM employee"
    cursor.execute(query)
    result = getFormatter.formatGetListResponse(cursor.fetchall())
    return make_response(jsonify(result), 200)


@app.route('/update', methods=['POST'])
def updateEmployee():
    conn = dbConnection()
    cursor = conn.cursor()
    data=request.get_json()
    print(data)
    errors = putValidator.validatePutData(data, cursor)
    if len(errors) > 0:
        return make_response(jsonify(errors), 401)
    query = """
                UPDATE employee SET first_name= %s, last_name = %s, email_address= %s,
                hired_date= %s, job_title = %s
                WHERE person_id = %s
            """
    cursor.execute(query, (data['employeeFirstName'], data['employeeLastName'], data['emailAddress'], data['hiredDate'][0:10],
                           data['job'], int(data['employeeId'])))
    conn.commit()
    query = "SELECT * FROM employee"
    cursor.execute(query)
    result = getFormatter.formatGetListResponse(cursor.fetchall())
    return make_response(jsonify(result), 200)


if __name__ == '__main__':
    app.run(host="localhost", port=3000, debug=True)