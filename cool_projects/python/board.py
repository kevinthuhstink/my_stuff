"""
===============================================================================

        Author: Kevin Cheng

   Description: A collection of problems based around a board and pieces.

===============================================================================
"""


class Board:
    def __init__(self, length):
        self.length = length
        self.__board = []
        for row in range(length):
            self.__board.append([])
            for col in range(length):
                self.__board[row].append('.')

    def __str__(self):
        board_str = ""
        for row in self.__board:
            board_str += str(row) + '\n'
        return board_str

    def get_board(self):
        return self.__board

    def deep_copy(self):
        board_copy = []
        for row in self.__board:
            new_row = []
            board_copy.append(new_row)
            for col in row:
                new_row.append(col)
        return board_copy

    def add_queen(self, pos):
        """ Adds a queen to the square at pos """
        row = pos[0]
        col = pos[1]
        self.__board[row][col] = 'Q'

    def remove_piece(self, pos):
        """ Removes the piece at the square designated by pos """
        row = pos[0]
        col = pos[1]
        self.__board[row][col] = '.'

    def queens_check_open(self, pos):
        """ Checks if a piece can be placed on the square at pos """
        row = pos[0]
        col = pos[1]
        for i in range(self.length):
            if self.__board[i][col] == 'Q' or self.__board[row][i] == 'Q':
                return False
        i = 1  # up right diagonals
        while row + i < self.length and col + i < self.length:
            if self.__board[row + i][col + i] == 'Q':
                return False
            i += 1
        i = 1  # down right diagonals
        while row - i >= 0 and col - i >= 0:
            if self.__board[row - i][col - i] == 'Q':
                return False
            i += 1
        i = 1  # down left diagonals
        while row + i < self.length and col - i >= 0:
            if self.__board[row + i][col - i] == 'Q':
                return False
            i += 1
        i = 1  # up left diagonals
        while row - i >= 0 and col + i < self.length:
            if self.__board[row - i][col + i] == 'Q':
                return False
            i += 1
        return True


def n_queens(n):
    """ Solves the n-queens problem.

    Given a chessboard of n x n dimensions,
    give every combination of queen positions,
    so that each queen cannot "attack" any other queen. """

    def n_queens_helper(curr_row_num):
        nonlocal board, solution_set
        if curr_row_num == board.length:
            solution_set.append(board.deep_copy())
            return

        for col in range(board.length):
            curr_pos = (curr_row_num, col)
            if not board.queens_check_open(curr_pos):
                continue
            board.add_queen(curr_pos)
            n_queens_helper(curr_row_num + 1)
            board.remove_piece(curr_pos)

    if n < 1:
        return [[]]
    solution_set = []
    board = Board(n)
    n_queens_helper(0)
    return solution_set


def knights_tour():
    """ Tours a knight around a chessboard.

    Given a chessboard of n x n dimensions,
    give an array representing the chessboard with only queens placed,
    so that each queen cannot "attack" any other queen. """
    pass


"""
for sol in n_queens(8):
    print(sol) """
