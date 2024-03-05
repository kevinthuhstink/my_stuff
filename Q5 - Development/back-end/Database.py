import csv
import os
from time import time
from random import randint

class Database:
    ''' Stores an array of items as the database's data, and
        generates unique ids for each entry in the database.

        Uses a csv to save data.
        Each data item must contain data for all fields in self.keys.
        fname: The relative destination of a file to read saved data from.
        '''

    def __init__(self, fname='data.csv'):
        self.data = []
        self.keys = ['id', 'name', 'time', 'status']
        self.__idnum = 0
        self.file = fname
        self.read_file()


    def read_file(self):
        ''' Reads the file specified by self.file and populates self.data
            with data.

            The file is a csv file that holds information about every
            data entry in the Database.
            A cheap replacement for database frameworks.
            Ignores all entries without a valid id.
            '''
        if not os.path.exists(self.file):
            with open(self.file, 'x'):
                self.gen_db_entries()
                return

        with open(self.file, newline='') as file:
            reader = csv.DictReader(file)

            for entry in reader:
                if 'id' not in entry.keys():
                    continue

                for key in entry.keys():
                    if entry[key].isnumeric():
                        entry[key] = int(entry[key])

                if entry['id'] >= self.__idnum:
                    self.__idnum = entry['id'] + 1
                # print(entry)
                self.data.append(entry)


    def write_file(self):
        ''' Overwrites the previous database file with the information
            in this database.
            '''
        with open(self.file, mode='w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=self.keys)
            writer.writeheader()
            writer.writerows(self.data)
        return


    def gen_db_entries(self, entries=8):
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
                "id": self.gen_id(),
                "name": gen_rand_str(),
                "time": int(time()),
                "status": "init db: " + str(entries),
                }
            self.data.append(entry)


    def gen_id(self):
        ''' Function that generates ids for unique data entries.
            The first entry is given id 0, the second gets id 1, etc.
            '''
        self.__idnum += 1
        return self.__idnum - 1


    def add(self, entry):
        ''' Adds a new entry to this database, and appends the new data entry
            into the file specified by self.file.

            entry: A dictionary containing keys: name, time, and status.
            return: The newly created database entry.
            '''
        new_task = {
            'id': self.gen_id(),
            'name': entry['name'],
            'time': entry['time'],
            'status': entry['status']
            }
        self.data.append(new_task)
        print(self.data)
        self.write_file()
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
            if int(item_id) == entry['id']:
                tmp = entry
                self.data = self.data[:i] + self.data[i + 1:]
                self.write_file()
                return entry
        return None
