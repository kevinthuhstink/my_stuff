from random import randint

class Table:

    def __init__(self):
        self.data = []
        self.gen_table_rows()


    def add(self, task):
        task['key'] = len(self.data)
        self.data.append(task)
        return task


    def gen_table_rows(self, rows=16):
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
                "status": "good!",
                "key": i,
                }
            self.data.append(row)
