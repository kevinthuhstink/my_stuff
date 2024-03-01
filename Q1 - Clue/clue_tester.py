from clue import Clue

def __main__():
    default_players = ["Player 1", "Player 2", "Player 3",
                       "Player 4", "Player 5", "Player 6"]
    default_characters = ["Plum", "White", "Scarlet", "Green",
                          "Mustard", "Peacock"]
    default_weapons = ["Rope", "Dagger", "Wrench", "Pistol",
                       "Candlestick", "Lead Pipe"]
    default_rooms = ["Courtyard", "Game Room", "Study", "Dining Room",
                     "Garage", "Living Room", "Kitchen", "Bedroom", "Bathroom"]

    game = Clue(default_players, default_characters,
                default_weapons, default_rooms)
    game.make_solution()
    game.print_fields(['solution'])


if __name__ == '__main__':
    __main__()
