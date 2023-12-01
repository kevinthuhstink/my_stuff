############################################################
# Name: Kevin Cheng
# Pledge: I pledge my honor that I have abided by the Stevens Honor System
# CS115 Lab 1
#
############################################################

""" boolean same( String s )
returns true if s contains the same alphanumeric letter (non-case sensitive) in its first and last char
returns false otherwise
"""
def same( word ):
    word_len = len( word );
    char1 = word[0].lower()
    char2 = word[ word_len - 1 ].lower()
    if ( char1 == char2 ):
        return True
    return False

""" int consecutiveSum( int x, int y )
sums the numbers between x and y exclusive and returns their total
"""
def consecutiveSum( x, y ):
    return ( x + y ) * ( y - x - 1 ) // 2 
