from random import randint
from functools import reduce

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
            Throws an exception if any sets of cards are empty.
            '''
        sol_char, available_chars = grab_random(self.characters)
        sol_wep, available_weps = grab_random(self.weapons)
        sol_room, available_rooms = grab_random(self.rooms)
        if sol_char == None or sol_wep == None or sol_room == None:
            raise Exception("Game initialized with cards missing")

        self.solution = {
                "Character": sol_char,
                "Weapon": sol_wep,
                "Room": sol_room
                }

        self.__available_characters = available_chars
        self.__available_weapons = available_weps
        self.__available_rooms = available_rooms

    def distribute_cards(self):
        ''' Distributes the remaining cards available to each player once
            solutions have been decided in the game.

            Accomplishes this by replacing the players array of string names
            with dicts containing the player name, its character, and its weapon.
            return: A dictionary containing the cards distributed to each player.
            Throws an exception if there are less than 2 players in the game.
            '''

        def update_available_cards():
            ''' Determines whether or not available cards still exist to be
                distributed for each type of card.

                return: A dictionary mapping each card type to whether more
                    cards in that card type can be distrbuted.
                '''
            return {
                    "Character": self.__available_characters != [],
                    "Weapon": self.__available_weapons != [],
                    "Room": self.__available_rooms != []
                    }

        def cards_available(card_types):
            ''' Determines whether there exists cards that still need
                to be distributed among players.

                card_tuple: A tuple with booleans from update_available_cards.
                return: False if card_tuple contains all False, True otherwise.
                '''
            return (card_types["Character"] or
                    card_types["Weapon"] or
                    card_types["Room"])

        def init_player_setup():
            ''' Initializes a dictionary of players, where each player
                corresponds with a list of character, weapon, and room cards.
                '''
            player_setup = {}
            for player in self.players:
                player_setup[player] = {
                        "Character": [],
                        "Weapon": [],
                        "Room": [],
                        }
            return player_setup

        if len(self.players) < 2:
            raise Exception("Less than players in the game")

        draw_cycle = 0
        self.player_setup = init_player_setup()
        can_distribute = update_available_cards()

        while cards_available(can_distribute):
            player = self.players[draw_cycle % len(self.players)]
            char_card, other_chars = grab_random(self.__available_characters)
            wep_card, other_weps = grab_random(self.__available_weapons)
            room_card, other_rooms = grab_random(self.__available_rooms)

            if can_distribute["Character"]:
                self.player_setup[player]["Character"].append(char_card)
                self.__available_characters = other_chars
            if can_distribute["Weapon"]:
                self.player_setup[player]["Weapon"].append(wep_card)
                self.__available_weapons = other_weps
            if can_distribute["Room"]:
                self.player_setup[player]["Room"].append(room_card)
                self.__available_rooms = other_rooms

            draw_cycle += 1
            can_distribute = update_available_cards()

        return self.player_setup

    def move_player(self,player):
        ''' Assigns a player a random new room.
            Throws an exception if player isn't in the game.
            '''
        if player not in self.players:
            raise Exception("Player not in the game.")

        prev_room = self.player_locations[player]
        new_room = grab_random(self.rooms)[0]
        while new_room == prev_room:
            new_room = grab_random(self.rooms)[0]
        self.player_locations[player] = new_room

    def make_suggestion(self,player,character,weapon,room):
        ''' Allows a player to make a suggestion by choosing a character,
            weapon and room.

            All other players respond with one card if they have cards
            that match the suggestion. Otherwise, they reply with 'None'.
            player: The player making the suggestion.
            character: The game character they're suggesting.
            weapon: The game weapon player is suggesting as the murder weapon.
            room: The room player is claiming as the murder room.
                  room must be the same room player is in right now.
            return: A tuple containing the original suggestion
                    and responses from each other player.

            Throws an exception if the room that's suggested isn't the
            room the player is in.
            Throws an exception if the suggesting player isn't in the game.
            Throws an exception if suggeested values aren't in the game.
            '''

        if player not in self.players:
            raise Exception("Player making suggestion isn't in the game.")
        if self.player_locations[player] != room:
            raise Exception("Suggested room not the same as the room player is currently in.")
        if character not in self.characters:
            raise Exception("Suggested character isn't in the game.")
        if weapon not in self.weapons:
            raise Exception("Suggested weapon isn't in the game.")
        if room not in self.rooms:
            raise Exception("Suggested room isn't in the game.")

        suggestion = {
                "Character": character,
                "Weapon": weapon,
                "Room": room
                }
        responses = {}

        # allow eliminated players to respond to suggestions
        for other_player in self.player_setup.keys():
            if player == other_player:
                continue
            cards = self.player_setup[other_player]
            matches = []

            if character in cards["Character"]:
                matches.append(character)
            elif weapon in cards["Weapon"]:
                matches.append(weapon)
            elif room in cards["Room"]:
                matches.append(room)

            if matches == []:
                responses[other_player] = None
            else:
                responses[other_player] = grab_random(matches)[0]

        return suggestion, responses

    def make_accusation(self,player,character,weapon,room):
        ''' Allows a player to make an accusation by choosing whatever they
            think are the three cards in the solution.

            Checks the accusation with the cards in the solution.
            Eliminates that player from the game if their accusation is wrong.
            Player can't make any future accusations, but still responds to
            suggestions as if they were still in the game.
            player: The player making the accusation.
            character: The game character they're accusing.
            weapon: The game weapon they're claiming as the murder weapon.
            room: The room they're claiming as the murder room.
                  room must be the same room player is in right now.
            return: True if the accusation is correct, False otherwise.

            Throws an exception if the room that's accused isn't the
            room the player is in.
            Throws an exception if the suggesting player isn't in the game.
            Throws an exception if suggeested values aren't in the game.
            '''
        if player not in self.players:
            raise Exception("Player making accusation isn't in the game.")
        if self.player_locations[player] != room:
            raise Exception("Accused room not the same as the room player is currently in.")
        if character not in self.characters:
            raise Exception("Suggested character isn't in the game.")
        if weapon not in self.weapons:
            raise Exception("Suggested weapon isn't in the game.")
        if room not in self.rooms:
            raise Exception("Suggested room isn't in the game.")

        if (self.solution["Character"] == character and
            self.solution["Weapon"] == weapon and
            self.solution["Room"] == room):
            return True

        self.players.remove(player)
        del self.player_locations[player]
        del self.scoring_sheets[player]
        return False

    def update_scoring_sheet(self,player,suggestion,response):
        ''' Updates the player's scoring sheet after making a suggestion.

            suggestion: The suggestion made by the player.
            response: The responses from the other players to the suggestion.
            Throws an exception if player isn't in the game.
            '''
        if player not in self.players:
            raise Exception("Player making accusation isn't in the game.")

        for suggest_val in suggestion.values():
            if suggest_val in response.values():
                self.scoring_sheets[player][suggest_val] = False
            else
                self.scoring_sheets[player][suggest_val] = True


    # HELPER FUNCTIONS BELOW
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
        if 'player_setup' in fields:
            print(self.player_setup)
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
        if 'available_rooms' in fields:
            print(self.__available_rooms)


def grab_random(choices):
    ''' Selects a random item from a list.

        From the possible entries in choices, selects one and returns it
        and the list without that choice.

        choices: Any list.
        return: A tuple containing a randomly selected item, and
                the choices list without the selected item.
                If the choices list is empty, returns (None, None) instead.
                '''
    if len(choices) == 0:
        return None, None
    selection = randint(0, len(choices) - 1)
    leftover = choices[:selection] + choices[selection + 1:]
    return choices[selection], leftover


def player_room(game, player):
    ''' Returns the room player is currently in given a game of Clue. '''
    return game.player_locations[player]
