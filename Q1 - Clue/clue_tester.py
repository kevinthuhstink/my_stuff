from clue import Clue

def __main__():
    default_players = ["Player 1", "Player 2", "Player 3",
                       "Player 4", "Player 5", "Player 6"]
    # default_players = ["Player 1"]
    default_characters = ["Plum", "White", "Scarlet", "Green",
                          "Mustard", "Peacock"]
    default_weapons = ["Rope", "Dagger", "Wrench", "Pistol",
                       "Candlestick", "Lead Pipe"]
    default_rooms = ["Courtyard", "Game Room", "Study", "Dining Room",
                     "Garage", "Living Room", "Kitchen", "Bedroom", "Bathroom"]

    game = Clue(default_players, default_characters,
                default_weapons, default_rooms)
    game.make_solution()
    game.distribute_cards()
    # game.print_fields(['solution', 'available_characters', 'available_weapons', 'available_rooms'])
    # game.print_fields(['player_setup'])

    for player in game.players:
        game.move_player(player)
    # game.print_fields(['player_locations'])
    test = game.make_suggestion("Player 1", "Plum", "Rope",
                                game.player_locations["Player 1"])
    game.make_accusation("Player 1", "Plum", "Rope",
                         game.player_locations["Player 1"])
    game.print_fields(['players', 'player_locations', 'scoring_sheets'])
    game.print_fields(['player_setup'])


if __name__ == '__main__':
    __main__()
