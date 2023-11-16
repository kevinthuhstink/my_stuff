'''
Created on 11/15/2023 
@author:   Kevin Cheng 
Pledge:    I pledge my honor that I have abided by the Stevens Honor System. 

CS115 - Lab 10
'''
import random

def createBoard( width, height ):
    ''' Creates a 2d list with width cols and height rows with all cells containing 0 '''
    board = []
    for col in range( width ):
        board += [ [0] * height ]
    return board;
#print( createBoard( 4, 2 ) ) # 4 cols 2 rows

def innerCells( width, height ):
    ''' Sets all cells not on the outer border of cells in the 2d list to 1 '''
    board = createBoard( width, height )
    if width < 3 or height < 3:
        return board
    for col in range( 1, width - 1 ):
        board[ col ] = [ [0] + [1] * ( height - 2 ) + [0] ]
    return board
#print( innerCells( 7,5 ) ) # 4 cols 2 rows

def randomCells( width, height ):
    ''' All cells on the outer border are 0, while all other cells are randomly assigned 0 or 1 '''
    board = createBoard( width, height )
    if width < 3 or height < 3:
        return board
    for col in range( width ):
        for row in range( height ):
            if col == 0 or col == width - 1 or row == 0 or row == height - 1:
                pass 
            else:
                board[col][row] = random.choice( [ 0,1 ] )
    return board
#print( randomCells( 7,5 ) ) # 4 cols 2 rows

def copy( board ):
    ''' Returns a deep copy of the input board '''
    cpy = []
    width = len( board )
    height = len( board[0] )
    #print( width, height )
    for col in range( width ):
        cpy += [ [] ]
        #print( cpy )
        for row in range( height ):
            #print( col, row )
            cpy[col] += [ board[col][row] ]
    return cpy
'''
test = randomCells( 7,5 ) # 4 cols 2 rows
print( test )
print( copy( test ) ) # 4 cols 2 rows 
print( id( test ) == id( copy( test ) ) ) '''

def innerReverse( board ):
    ''' Turns 0 to 1s and 1 to 0s within the outer margin of the board
        Cells on the outer margin are always 0 '''
    width = len( board )
    height = len( board[0] )
    if width < 3 or height < 3:
        return board
    for col in range( 1, width - 1 ):
        for row in range( 1, height - 1 ):
            prev = board[col][row]
            if prev == 1:
                board[col][row] = 0
            else:
                board[col][row] = 1
    return board

def nextLifeGeneration( boardState ):
    ''' Following Conway's Game of Life,
        1. All edge cells stay zero (0) (but see the extra challenges, below)
        2. A cell that has fewer than two live neighbors dies (because of loneliness)
        3. A cell that has more than 3 live neighbors dies (because of over-crowding)
        4. A cell that is dead and has exactly 3 live neighbors comes to life
        5. All other cells maintain their state
        Returns the next iteration of Conway's Game of Life given an input boardState '''
    width = len( boardState )
    height = len( boardState[0] )
    if width < 3 or height < 3:
        return boardState
    newA = copy( boardState )
    for col in range( 1, width - 1 ):
        for row in range( 1, height - 1 ):
            cell = ( col, row )
            newA[col][row] = ifLive( cell, boardState )
    return newA

def ifLive( cell, boardState ):
    ''' According to the rules of Conway's Game of Life,
        Returns 1 if a cell should be live and 0 if a cell should be dead '''
    row = cell[0]
    col = cell[1]
    liveNeighbors = 0
    if boardState[row-1][col]:
        liveNeighbors += 1 
    if boardState[row+1][col]:
        liveNeighbors += 1 
    if boardState[row][col+1]:
        liveNeighbors += 1 
    if boardState[row][col-1]:
        liveNeighbors += 1 
    if liveNeighbors == 3:
        return 1 
    if liveNeighbors == 2:
        return boardState[row][col]
    else:
        return 0

'''
_initBoard = randomCells( 5,5 )
print( _initBoard )
_initBoard = nextLifeGeneration( _initBoard )
print( _initBoard ) '''
