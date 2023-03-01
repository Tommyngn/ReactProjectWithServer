
def validateDeleteData(data, cursor):
    query = 'SELECT *  FROM employee WHERE person_id = %s'
    cursor.execute(query, int(data))
    result = cursor.fetchone()
    print(result)

    if result:
        return True
    return False
