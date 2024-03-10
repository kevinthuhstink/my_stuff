import csv
import os
from time import time
from random import randint

class Database:
    ''' Stores an array of items as the database's data, and
        generates unique ids for each entry in the database.

        Uses a csv to save data.
        Each data item must contain data for all fields in self.keys.
        Ineffeciently writes the entire catalog back and forth into the csv
        after every addition and removal operation.
        fname: The relative destination of a file to read saved data from.
        '''

    def __init__(self, keys, fname='data.csv'):
        self.data = []
        self.keys = keys
        self.__idnum = 0
        self.file = fname
        self.read_file()


    def read_file(self):
        ''' Reads the file specified by self.file and populates self.data
            with data.

            The file is a csv file that holds information about every
            data entry in the Database.
            Ignores all entries without a valid id.
            '''
        if not os.path.isfile(self.file):
            with open(self.file, 'w') as file:
                writer = csv.DictWriter(file, fieldnames=self.keys)
                writer.writeheader()
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
        entry['id'] = self.gen_id()
        entry['time'] = time()
        self.data.append(entry)
        with open(self.file, 'a') as file:
            writer = csv.DictWriter(file, fieldnames=self.keys)
            writer.writerow(entry)
        return entry


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


    def get_item(self, item_id):
        ''' Gets one item from the database.

            item_id: The id of the item to retrieve from the database.
            return: The item from the database.
                    None if the item doesn't exist in the database.
                    '''
        item_id = int(item_id)
        for entry in self.data:
            if entry['id'] == item_id:
                return entry
        return None


    def set_fields(self, item_id, fields):
        ''' Sets one data entry's value in the database.

            Searches for the item based on item_id, then sets the information
            in key to value.
            item_id: The id of the item to set information for
            fields: A dictionary with keys corresponding to database entry
                    fields and its values representing new values.
                    Converts numeric strings to numbers
            return: The entry that had its value set,
                    None if item_id couldn't be found
            '''
        entry = self.get_item(item_id)
        if not entry:
            return None
        for key in fields.keys():
            if fields[key].isnumeric():
                fields[key] = int(fields[key])
            if key in self.keys:
                entry[key] = fields[key]
        print(entry)
        return entry


    def match_values(self, values):
        ''' Checks if any entry has values that exist within the database.

            Checks every entry in the database.
            values: A list of key-value pairs.
            return: The first entry that has values that match the
                    key-value pairs in values,
                    None if no entry exists that matches all pairs.
                    '''
        for entry in self.data:
            entry_found = True
            for key in values.keys():
                value = values[key]
                if key not in entry.keys() or value != entry[key]:
                    entry_found = False
                    break
            if entry_found:
                return entry
        return None
