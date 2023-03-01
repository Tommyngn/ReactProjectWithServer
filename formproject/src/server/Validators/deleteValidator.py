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


def validateDeleteData(data):
    query = 'SELECT *  FROM employee WHERE person_id = %s'
    cursor.execute(query, int(data))
    result = cursor.fetchone()
    print(result)

    if result:
        return True
    return False
