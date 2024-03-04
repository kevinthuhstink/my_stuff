from random import randint

class Database:
    ''' Stores an array of items as the database's data, and
        generates unique ids for each entry in the database. '''

    def __init__(self):
        self.data = []
        self.__idnum = 0
        self.gen_table_rows()


    def gen_table_rows(self, entries=8):
        ''' Generates some random data entries to mess around with.

            Each data entry has a time, task, status, and id.
            Time and task are randomly generated,
            the status is 'init', and id is a unique integer that increments
            for every item created, so no two items have the same id.
            entries: The number of entries in the newly initialized data.
            '''

        def gen_rand_str(len_bounds=(8,16)):
            ''' Creates a random string of lowercase letters with random length.
                len_bounds: The min/max length of generated strings.
                '''
            rand_str = ""
            for i in range(randint(len_bounds[0], len_bounds[1])):
                rand_str += chr(randint(97, 122))
            return rand_str

        for i in range(entries):
            entry = {
                "time": randint(0, 999),
                "name": gen_rand_str(),
                "status": "init " + str(entries),
                "id": self.gen_id(),
                }
            self.data.append(entry)


    def gen_id(self):
        ''' Function that generates ids for unique data entries.
            The first entry is given id 0, the second gets id 1, etc.
            '''
        self.__idnum += 1
        return self.__idnum - 1


    def add(self, entry):
        ''' Adds a new entry to the database.

            entry: A dictionary containing keys: name, time, and status.
            return: The newly created database entry.
            '''
        new_task = {
            'name': entry['name'],
            'time': entry['time'],
            'status': entry['status'],
            'id': self.gen_id()
            }
        self.data.append(new_task)
        return new_task


    def remove(self, item_id):
        ''' Removes the entry with a given item_id.

            item_id: The id of the entry to remove.
            return: The recently deleted data entry if the id was found
                    and deleted without errors,
                    None if the id doesn't exist in the database
                    '''
        for i in range(len(self.data)):
            entry = self.data[i]
            if item_id == entry['id']:
                tmp = entry
                self.data = self.data[:i] + self.data[i + 1:]
                return entry
        return None
