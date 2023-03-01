import pymysql
from datetime import *

conn = pymysql.connect(
    host='sql9.freesqldatabase.com',
    database='sql9601759',
    user='sql9601759',
    password='VHBB3I6Evw',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

cursor = conn.cursor()

# query = """ CREATE TABLE employee (
#             person_id integer NOT NULL PRIMARY KEY,
#             first_name VARCHAR(50) NOT NULL,
#             last_name VARCHAR(50) NOT NULL,
#             email_address VARCHAR(500) NOT NULL,
#             agency_number integer,
#             hired_date VARCHAR(15) NOT NULL,
#             registration_date DATE NOT NULL,
#             job_title VARCHAR(100) NOT NULL
#             )
#         """

# query = """INSERT INTO employee ( person_id, first_name, last_name, email_address, agency_number, hired_date, registration_number )
#             VALUES ( %s,%s,%s,%s,%s,%s,%s);
#         """
query = "SELECT * FROM employee WHERE person_id = %s"
# cursor.execute(query, (1234567, "Tommy","Nguyen","t@gmail.com","345","feb-03-2018","678"))
cursor.execute(query,4567890)
# conn.commit()
row = cursor.fetchall()
#
print(row)
