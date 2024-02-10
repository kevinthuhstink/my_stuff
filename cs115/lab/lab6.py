'''
Created on 10/18/2023 
@author:   Kevin Cheng 
Pledge:    I pledge my honor that I have abided by the Stevens Honor System. 

CS115 - Lab 6
'''

# binary {{{
def isOdd(n):
    '''Returns whether or not the integer argument is odd.'''
    return n % 2 == 1;
# 42 in base 2 is 101010

# the least significant bit in an odd base-10 number will be 1
# the least significant bit in an even base-10 number will be 0

# 1010 -> 101 and 1011 -> 101 represents integer division by 2

# let Y = N//2
# if N is odd, then its base 2 representation is Y with a '1' added to the right
# if N is even, then its base 2 representation is Y with a '0' added to the right
# this is because dividing by 2 in binary looks like
# nnnnx -> nnnn, where n is either 1 or 0
# finding N from Y goes in the opposite direction, nnnn -> nnnnx (base 2)
# we check for N being odd or even to determine what 'x' is supposed to be

def numToBinary(n):
    '''Precondition: integer argument is non-negative.
    Returns the string with the binary representation of non-negative integer n.
    If n is 0, the empty string is returned.'''
    if n == 0:
        return ""
    if isOdd( n ):
        return numToBinary( n // 2 ) + "1"
    return numToBinary( n // 2 ) + "0"

def binaryToNum(s):
    '''Precondition: s is a string of 0s and 1s.
    Returns the integer corresponding to the binary representation in s.
    Note: the empty string represents 0.'''
    if s == "":
        return 0
    if s[-1] == '1':
        return 1 + 2 * binaryToNum( s[:-1] )
    return 2 * binaryToNum( s[:-1] )

def increment(s):
    '''Precondition: s is a string of 8 bits.
    Returns the binary representation of binaryToNum(s) + 1.'''
    if s == "":
        return ""
    # find the first 0 (from the right) and convert everything to the right of that to 0
    if s[-1] == '0':
        return s[:-1] + '1'
    return increment( s[:-1] ) + '0'
#print( increment( '11111111' ) )
#print( increment( '00000011' ) )
    

def count(s, n):
    '''Precondition: s is an 8-bit string and n >= 0.
    Prints s and its n successors.'''
    if n == 0:
        print( s )
        return
    print( s )
    count( increment( s ), n - 1 )
#count( '1111111', 8 )
# binary end }}}

# 59 in ternary is 2012 
# 2012 = 2*1 + 1*3 + 2*27 = 2 + 3 + 54 = 59
def numToTernary(n):
    '''Precondition: integer argument is non-negative.
    Returns the string with the ternary representation of non-negative integer
    n. If n is 0, the empty string is returned.'''
    # copy paste from numtobinary
    if n == 0:
        return ""
    if n % 3 == 1:
        return numToTernary( n // 3 ) + '1'
    if n % 3 == 2:
        return numToTernary( n // 3 ) + '2'
    return numToTernary( n // 3 ) + '0'

def ternaryToNum(s):
    '''Precondition: s is a string of 0s, 1s, and 2s.
    Returns the integer corresponding to the ternary representation in s.
    Note: the empty string represents 0.'''
    # copy paste from binarytonum 
    if s == "":
        return 0
    if s[-1] == '1':
        return 1 + 3 * ternaryToNum( s[:-1] )
    if s[-1] == '2':
        return 2 + 3 * ternaryToNum( s[:-1] )
    return 3 * ternaryToNum( s[:-1] )
