'''
Created on 10/10/2023 
@author:   Kevin Cheng 
Pledge:    I pledge my honor that I have abided by the Stevens Honor System. 

CS115 - Hw 3
'''

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' PROBLEM 0 {{{
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

def giveChange( amount, coins ): 
    ''' List giveChange( int amount, List coins ) {{{
    give the least number of coins, along with what coins used, required to make the amount
    @param amount: the total value we are trying to make using coins
    @param coins: a list of coin values we can use to produce amount
    @return: a list with the number of coins given to make change
             and the value of each coin used
    }}} '''
    change = solve_h( amount, coins )
    if change == None:
        return [ float( "inf" ), [] ]
    return [ len( change ), change ]


def solve_h( amount, coins ):
    ''' List solve_h( int amount, List coins ) {{{
    identical to giveChange except only the list of coin values is returned
    @param amount: the total value we are trying to make using coins
    @param coins: a list of coin values we can use to produce amount
    @return: a list containing the value of each coin used
    }}} '''

    if amount == 0:
        #base case, we are done here
        return []
    if coins == []:
        return None

    curr_coin = coins[0]
    loseit = solve_h( amount, coins[1:] )
    if curr_coin > amount:
        #if the coin is too big for amount then we have no choice but to lose it
        return loseit
    useit = solve_h( amount - curr_coin, coins )
    if useit == None:
        #sometimes using it causes us to miss any solution, in that case we lose it
        return loseit 
    #mitigate the annoying "list cannot be cat w/ null" since now useit must be a list
    useit = [curr_coin] + useit
    if loseit == None:
        #if we lose too many coins we are forced to use it
        return useit
    if len( useit ) < len( loseit ): 
        return useit 
    return loseit 
#}}}

# Here's the list of letter values and a small dictionary to use.
# Leave the following lists in place.
scrabbleScores = \
   [ ['a', 1], ['b', 3], ['c', 3], ['d', 2], ['e', 1], ['f', 4], ['g', 2],
     ['h', 4], ['i', 1], ['j', 8], ['k', 5], ['l', 1], ['m', 3], ['n', 1],
     ['o', 1], ['p', 3], ['q', 10], ['r', 1], ['s', 1], ['t', 1], ['u', 1],
     ['v', 4], ['w', 4], ['x', 8], ['y', 4], ['z', 10] ]

Dictionary = ['a', 'am', 'at', 'apple', 'bat', 'bar', 'babble', 'can', 'foo',
              'spam', 'spammy', 'zzyzva']

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' PROBLEM 1 {{{
' Implement wordsWithScore() which is specified below.
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def wordsWithScore(dct, scores):
    '''List of words in dct, with their Scrabble score.

    Assume dct is a list of words and scores is a list of [letter,number]
    pairs. Return the dictionary annotated so each word is paired with its
    value. For example, wordsWithScore(Dictionary, scrabbleScores) should
    return [['a', 1], ['am', 4], ['at', 2] ...etc... ]
    '''
    if dct == []:
        return []
    return [[ dct[0], wordScore( dct[0], scores ) ]] + wordsWithScore( dct[1:], scores )

def wordScore( S, scoreList ): #{{{ 
    ''' int letterScore( str S, List scoreList ) {{{
    @param S: any string of english letters
    @param scoreList: a list that associates a letter to its score in scrabble
    @return: the score associated with the entire word
    }}} ''' 
    if ( S == "" ):
        return 0
    return letterScore( S[0], scoreList ) + wordScore( S[1:], scoreList ) #}}}

def letterScore( letter, scoreList ): #{{{
    ''' int letterScore( char letter, List scoreList ) {{{
    @param letter: a lowercase letter in the english alphabet
    @param scoreList: a list that associates a letter to its score in scrabble
    @return: the score associated with the letter
    }}} '''
    if ( scoreList[0][0] == letter ):
        return scoreList[0][1]
    return letterScore( letter, scoreList[1:] ) #}}}
#}}}

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' PROBLEM 2
' For the sake of an exercise, we will implement a function
' that does a kind of slice. You must use recursion for this
' one. Your code is allowed to refer to list index L[0] and
' also use slice notation L[1:] but no other slices.
' (Notice that you cannot assume anything about the length of the list.)
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def take(n, L):
    '''Returns the list L[0:n], assuming L is a list and n is at least 0.'''
    if n == 0 or L == []:
        return []
    return [ L[0] ] + take( n - 1, L[1:] )


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' PROBLEM 3
' Similar to problem 2, will implement another function
' that does a kind of slice. You must use recursion for this
' one. Your code is allowed to refer to list index L[0] and
' also use slice notation L[1:] but no other slices.
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def drop(n, L):
    '''Returns the list L[n:], assuming L is a list and n is at least 0.'''
    if n == 0 or L == []:
        return L
    return drop( n - 1, L[1:] )


