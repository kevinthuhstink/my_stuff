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
        ''' Creates a random solution for the current game. '''

        sol_character = randint(0, len(self.characters) - 1)
        sol_weapon = randint(0, len(self.weapons) - 1)
        sol_room = randint(0, len(self.rooms) - 1)

        self.solution = {
                "Character": self.characters[sol_character],
                "Weapon": self.weapons[sol_weapon],
                "Room": self.rooms[sol_room]
                }


    def distribute_cards(self):
        #write your implementation below
        pass

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


    # HELPER FUNCTIONS
    def print_fields(self, fields):
        ''' Prints game information.

            fields: A list containing strings that correspond to game
                state variables.
                Possible values in fields are 'solution', 'players',
                'characters', 'weapons', 'rooms', 'scoring_sheets',
                and 'player_locations' '''

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
