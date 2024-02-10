'''
Created on 10/18/2023
@author:   Kevin Cheng 
Pledge:    I pledge my honor that I have abided by the Stevens Honor System. 

CS115 - Hw 4
'''

def pascal_row( r ):
    ''' list pascal_row( int r ) {{{
    gives the nth row of pascal's triangle
    @param r: the row from pascal's triangle we want to see
    @return: a list containing each number from that row
             returns an empty list if r < 0 }}} '''
    if r < 0:
        return []
    if r == 0:
        return [1]
    prev = pascal_row( r - 1 )
    return construct_row( prev, 0 )

def construct_row( nums, prev ):
    ''' list construct_row( list nums ) {{{j
    gives what the next row in pascal's triangle looks like,
    based on the one provided
    @param nums: any row of numbers in pascal's triangle
    @param prev: the previous number in that row
    @return: the next row of numbers }}}'''
    if nums == []: # the last number 
        return [1]
    if prev == 0: # the first number
        return [1] + construct_row( nums[1:], 1 )
    curr = nums[0]
    return [prev + curr] + construct_row( nums[1:], curr )
    
def test_pascal_row():
    ''' void test_pascal_row(): {{{
    throws AssertionError if any test cases fail }}}'''
    assert construct_row( [1], 0 ) == [1,1]
    assert construct_row( [1,3,3,1], 0 ) == [1,4,6,4,1]
    assert pascal_row( -1 ) == []
    assert pascal_row( 0 ) == [1]
    assert pascal_row( 1 ) == [1,1]
    assert pascal_row( 10 ) == [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1]

def pascal_triangle( r ):
    ''' list pascal_triangle( int r ) {{{
    gives each row of pascal's triangle in a list, including row r
    @param r: the height of the triangle to be created
    @return: a 2d list containing rows of pascal's triangle
             returns an empty list if r < 0 }}} '''
    if r < 0:
        return []
    if r == 0:
        return [ pascal_row( 0 ) ]
    return pascal_triangle( r - 1 ) + [ pascal_row( r ) ]

def test_pascal_triangle():
    ''' void test_pascal_triangle(): {{{
    throws AssertionError if any test cases fail }}}'''
    assert pascal_triangle( -1 ) == []
    assert pascal_triangle( 0 ) == [[1]]
    assert pascal_triangle( 1 ) == [[1],[1,1]]
    assert pascal_triangle( 4 ) == [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
test_pascal_row()
test_pascal_triangle()
print( "All test cases passed" )
