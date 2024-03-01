from random import randint

class Clue:


    def __init__(self,players,characters,weapons,rooms):
        self.players = players
        self.characters = characters
        self.weapons = weapons
        self.rooms = rooms
        self.scoring_sheets = {player: {} for player in self.players}
        self.player_locations = {player: {} for player in self.players}

    def make_solution(self):
        ''' Creates a random solution for the current game.

            Also initializes private fields for the remaining available
            characters and weapons for each player to have when setting up
            the game.
            '''

        sol_char, available_chars = grab_random(self.characters)
        sol_wep, available_weps = grab_random(self.weapons)
        sol_room, available_rooms = grab_random(self.rooms)

        self.solution = {
                "Character": sol_char,
                "Weapon": sol_wep,
                "Room": sol_room
                }

        self.__available_characters = available_chars
        self.__available_weapons = available_weps
        self.__available_rooms = available_rooms


    def distribute_cards(self):
        ''' Distributes one unique character and uniqe weapon to each player
            in the game.

            Accomplishes this by replacing the players array of string names
            with dicts containing the player name, its character, and its weapon.
            '''

        player_setup = []
        for player in self.players:
            character, other_chars = grab_random(self.__available_characters)
            weapon, other_weps = grab_random(self.__available_weapons)
            room, other_rooms = grab_random(self.__available_rooms)

            player_setup.append({
                "Name": player,
                "Character": character,
                "Weapon": weapon,
                "Room": room
                })

            self.__available_characters = other_chars
            self.__available_weapons = other_weps
            self.__available_rooms = other_rooms

        self.players = player_setup



    def move_player(self,player):
        #write your implementation below
        pass

    def make_suggestion(self,player,character,weapon,room):
        #write your implementation below
        pass

    def make_accusation(self,player,character,weapon,room):
        #write your implementation below
        pass

    def update_scoring_sheet(self,player,suggestion,response):
        #write your implementation below
        pass

    def print_fields(self, fields):
        ''' Prints game information.

            fields: A list containing strings that correspond to game
                state variables.
                Possible values in fields are 'solution', 'players',
                'characters', 'weapons', 'rooms', 'scoring_sheets',
                and 'player_locations' '''

        # PUBLIC FIELDS
        if 'solution' in fields:
            print(self.solution)
        if 'players' in fields:
            print(self.players)
        if 'characters' in fields:
            print(self.characters)
        if 'weapons' in fields:
            print(self.weapons)
        if 'rooms' in fields:
            print(self.rooms)
        if 'scoring_sheets' in fields:
            print(self.scoring_sheets)
        if 'player_locations' in fields:
            print(self.player_locations)

        #PRIVATE FIELDS
        if 'available_characters' in fields:
            print(self.__available_characters)
        if 'available_weapons' in fields:
            print(self.__available_weapons)


def grab_random(choices):
    ''' Selects a random item from a list.

        From the possible entries in choices, selects one and returns it
        and the list without that choice.

        choices: Any list.
        return: A tuple containing a randomly selected item, and
                the choices list without the selected item. '''

    selection = randint(0, len(choices) - 1)
    leftover = choices[:selection] + choices[selection + 1:]
    return choices[selection], leftover
