'''
Created on 11/1/2023
@author:   Kevin Cheng
Pledge:    I pledge my honor that I have abided by the Stevens Honor System.

CS115 - Hw 6
'''
# Number of bits for data in the run-length encoding format.
# The assignment refers to this as k.
COMPRESSED_BLOCK_SIZE = 5

# Number of bits for data in the original format.
MAX_RUN_LENGTH = 2 ** COMPRESSED_BLOCK_SIZE - 1
# TODO convert to binary forms
#      k is the length of each binary "block" found in the array thing

'''
# for the checkerboard pattern "10"*32,
# since each bit changes the "prev" parity,
# each bit requires one block in its compressed form to fully capture the image
# plus the initial 0 block to indicate the image starts with a 1
# it requires 33 * COMPRESSED_BLOCK_SIZE '''
def compress( S ):
    ''' str compress( str S )
    compression of an input string S
    @param S: a string containing only '0's and '1's. (s is a binary string)
    @return: a run-length encoding of the input string
             contains chars { x1, x2, x3... xn } such that
             x1 is the number of consecutive 0s until the first 1 in the original input string
             x2 is the number of consecutive 1s until the next 0
             for the entire input binary string
             each number in the sequence is a COMPRESSED_BLOCK_SIZE-bit binary number '''
    if S == "":
        return ""
    if S[0] == '1':
        return '0' * COMPRESSED_BLOCK_SIZE + compress_h( S, 0, '1' )
    return compress_h( S, 0, '0' )

def compress_h( S, curr, prev ):
    ''' str compress_h( str S, int curr, int prev )
    @param S: a string containing only '0's and '1's. (s is a binary string)
        curr: the running count of consecutive '0's or '1's
        prev: whichever bit (0/1) has the "consecutive value"
    @return: a run-length encoding of the input string
             contains chars { x1, x2, x3... xn } such that
             x1 is the number of consecutive 0s until the first 1 in the original input string
             x2 is the number of consecutive 1s until the next 0
             for the entire input binary string
             each number in the sequence is a COMPRESSED_BLOCK_SIZE-bit binary number '''
    if S != "" and S[0] == prev: #this block keeps going
        return compress_h( S[1:], curr + 1, prev );
    #finish this block up if we hit EOS or something other than prev
    if S != "":
        prev = S[0]
    # calc the base2 num of how many consecutive digits we have
    currbin = base2( curr )
    if len( currbin ) < COMPRESSED_BLOCK_SIZE: #padding 0s if we need itj
        pad0 = COMPRESSED_BLOCK_SIZE - len( currbin ) 
        currbin = '0' * pad0 + currbin
    currbin = currbin[-1 * COMPRESSED_BLOCK_SIZE:] #limit to block size
    if S == "":
        return currbin
    return currbin + compress_h( S[1:], 1, prev )

def uncompress( C, curr = '0' ):
    ''' str uncompress( list bits, char curr )
    @param C: a run-length encoding of any binary string 
        curr: the current bit to replicate using the run-length encoding
    @return: the original binary sequence that was compressed into the run-length encoding'''
    if C == "":
        return ""
    num = base10( C[:COMPRESSED_BLOCK_SIZE] )
    ret = curr * num
    if curr == '0':
        curr = '1'
    else:
        curr = '0'
    return ret + uncompress( C[COMPRESSED_BLOCK_SIZE:], curr )

def compression( S ):
    ''' float compression( str S )
    @param S: any binary string
    @return: a number representing the compression factor from S to its run-length encoding'''
    return len( S ) / len( compress( S ) )

def base2( n ):
    '''Precondition: integer argument is non-negative.
    Returns the string with the binary representation of non-negative integer n.
    If n is 0, the empty string is returned.'''
    if n == 0:
        return ""
    if n % 2 == 1:
        return base2( n // 2 ) + "1"
    return base2( n // 2 ) + "0"

def base10( s ):
    '''Precondition: s is a string of 0s and 1s.
    Returns the integer corresponding to the binary representation in s.
    Note: the empty string represents 0.'''
    if s == "":
        return 0
    if s[-1] == '1':
        return 1 + 2 * base10( s[:-1] )
    return 2 * base10( s[:-1] )

# compression on small strings really really sucks
s1 = "1001"
test1 = compress( s1 )
print( test1, '\n',uncompress( test1 ),'\n', compression( s1 ) )

# this compression sucks in general
penguin = "00011000"+"00111100"*3+"01111110"+"11111111"+"00111100"+"00100100"
test2 = compress( penguin )
print( test2, '\n', uncompress( test2 ),'\n', compression( penguin ) )

# lets get that cool looking sequence that breaks COMPRESSED_BLOCK_SIZE 
brutal = '0' * 33
test3 = compress( brutal )
print( test3, '\n',uncompress( test3 ), '\n',compression( brutal ) )
# 6.6 compression factor but it destroyed 32 bits in the process

''' I. Lai is Lying
Laiuncompress and Laicompress are inverses of each other:
    operating one on the other will always return the same input
If every image was compressed somewhat using Laicompress, then what Laiuncompress does
is it creates some new information out of less information
Creating 64 bits out of less than 64 bits always creates some inaccuracy that
the Laiuncompress algorithm always has to "assume",
which means the Laicompress and Laiuncompress combination cannot always return the same
input when operated on each other.'''
