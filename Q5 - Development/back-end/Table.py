from random import randint

class Table:

    def __init__(self):
        self.data = []
        self.__keynum = 0
        self.gen_table_rows()


    def gen_table_rows(self, rows=8):
        ''' Generates some number of random rows to mess around with. '''

        def gen_rand_str():
            ''' Creates a random string between length 8 and 16. '''
            rand_str = ""
            for i in range(randint(8, 16)):
                rand_str += chr(randint(97, 122))
            return rand_str

        for i in range(rows):
            row = {
                "time": randint(0, 999),
                "task": gen_rand_str(),
                "status": "init " + str(rows),
                "key": self.get_key(),
                }
            self.data.append(row)


    def get_key(self):
        self.__keynum += 1
        return self.__keynum - 1


    def add(self, data):
        new_task = {
                'task': data['task'],
                'time': data['time'],
                'status': data['status'],
                'key': self.get_key()
                }
        self.data.append(new_task)
        return new_task
