from random import randint

class Database:
    ''' Stores an array of items as the database's data, and
        generates unique keys for each entry in the database. '''

    def __init__(self):
        self.data = []
        self.__keynum = 0
        self.gen_table_rows()


    def gen_table_rows(self, entries=8):
        ''' Generates some random data entries to mess around with.

            Each data entry has a time, task, status, and key.
            Time and task are randomly generated,
            the status is 'init', and key is a unique integer that increments
            for every item created, so no two items have the same key.
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
                "task": gen_rand_str(),
                "status": "init " + str(entries),
                "key": self.get_key(),
                }
            self.data.append(entry)


    def get_key(self):
        ''' Function that generates keys for unique data entries.
            The first entry is given key 0, the second gets key 1, etc.
            '''
        self.__keynum += 1
        return self.__keynum - 1


    def add(self, entry):
        ''' Adds a new entry to the database.

            entry: A dictionary containing keys: name, time, and status.
            return: The newly created database entry.
            '''
        new_task = {
            'name': entry['name'],
            'time': entry['time'],
            'status': entry['status'],
            'key': self.get_key()
            }
        self.data.append(new_task)
        return new_task


    def remove(self, item_id):
        ''' Removes the entry with a given item_id.

            item_id: The key of the entry to remove.
            return: The recently deleted data entry if the key was found
                    and deleted without errors,
                    None if the key doesn't exist in the database
                    '''
        for i in range(len(self.data)):
            task = self.data[i]
            if item_id == task['key']:
                tmp = task
                self.data = self.data[:i] + self.data[i + 1:]
                return task
        return None
