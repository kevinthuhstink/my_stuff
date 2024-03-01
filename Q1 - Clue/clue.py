class Clue:


    def __init__(self,players,characters,weapons,rooms):
        self.players = players
        self.characters = characters
        self.weapons = weapons
        self.rooms = rooms
        self.scoring_sheets = {player: {} for player in self.players}
        self.player_locations = {player: {} for player in self.players}

    def make_solution(self):
        #write your implementation below
        pass

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
