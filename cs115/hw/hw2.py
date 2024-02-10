'''
Created on 9/25/2023
@author:   Kevin Cheng 
Pledge:    I pledge my honor that I have abided by the Stevens Honor System.
CS115 - Hw 2
'''
import sys
# Be sure to submit hw2.py.  Remove the '_template' from the file name.

# Allows up to 10000 recursive calls.
# The maximum permitted limit varies from system to system.
sys.setrecursionlimit(10000)

# Leave the following lists in place. {{{
scrabbleScores = \
   [ ['a', 1], ['b', 3], ['c', 3], ['d', 2], ['e', 1], ['f', 4], ['g', 2],
     ['h', 4], ['i', 1], ['j', 8], ['k', 5], ['l', 1], ['m', 3], ['n', 1],
     ['o', 1], ['p', 3], ['q', 10], ['r', 1], ['s', 1], ['t', 1], ['u', 1],
     ['v', 4], ['w', 4], ['x', 8], ['y', 4], ['z', 10] ]

Dictionary = ['a', 'am', 'at', 'apple', 'bat', 'bar', 'babble', 'can', 'foo',
              'spam', 'spammy', 'zzyzva']

# }}}
# Implement your functions here.

def letterScore( letter, scoreList ): #{{{
    ''' int letterScore( char letter, List scoreList ) {{{
    @param letter: a lowercase letter in the english alphabet
    @param scoreList: a list that associates a letter to its score in scrabble

    @return: the score associated with the letter parameter 
    }}} '''
    if ( scoreList[0][0] == letter ):
        return scoreList[0][1]
    return letterScore( letter, scoreList[1:] )
#print( "letterScore z:", letterScore( 'z', scrabbleScores ) ) #10 }}}

def wordScore( S, scoreList ): #{{{ 
    ''' int letterScore( String S, List scoreList ) {{{
    @param S: any String of english letters
    @param scoreList: a list that associates a letter to its score in scrabble

    @return: the score associated with the entire word
    }}} ''' 
    if ( S == "" ):
        return 0
    return letterScore( S[0], scoreList ) + wordScore( S[1:], scoreList )
#print( "wordScore z:", wordScore( 'aaaaaaz', scrabbleScores ) ) #16 }}}

def scoreList( rack ): #{{{
    ''' List scoreList( List rack ) {{{
    @param rack: a list of letters, representing the letters to be organized into words in scrabble
    
    @return: a list of the possible words that can be made with the letters on the rack, associated with their scores
    }}} '''
    return scoreList_h( rack, Dictionary ) #}}}

def scoreList_h( rack, d ): #{{{
    ''' List scoreList_h( List rack, List d ) {{{
    helper function for scoreList

    @param rack: a list of letters, representing the letters to be organized into words in scrabble
    @param d: a dictionary of possible words that can be made
    
    @return: a list of the possible words that can be made with the letters on the rack, associated with their scores
    }}} '''
    #base case, ran through the entire dictionary
    if ( d == [] ):
        return []
    #otherwise see if the rack can construct d[0]
    if ( constructWord( rack, d[0] ) ):
        return [[ d[0], wordScore( d[0], scrabbleScores ) ]] + scoreList_h( rack, d[1:] )
    return scoreList_h( rack, d[1:] ) #}}}

def constructWord( rack, word ): #{{{
    ''' boolean constructWord( List rack, String word ) {{{
    @param rack: a list of letters, representing the letters to be organized into words in scrabble
    @param word: the word to be tested if it can be constructed by the given rack of letter
    
    @return: true if the word can be constructed by the letters in rack, false otherwise
    }}} '''
    if ( word == "" ):
        return True
    if ( word[0] not in rack ):
        return False 
    #chop that letter off the rack and keep going
    #locate the first index of word[0] in the rack
    i_char = rack.index( word[0] )
    return constructWord( rack[0:i_char] + rack[i_char + 1:], word[1:] ) #}}}

''' {{{ testing scoreList 
print( "scoreList test1:", scoreList( ["a", "s", "m", "o", "f", "o"] ) )
print( "scoreList test2:", scoreList( [] ) )
print( "scoreList test3:", scoreList( ['z','z','y','v','a','b','a','t'] ) )
}}} '''

def bestWord( rack ): #{{{
    ''' List bestWord( List rack ) {{{
    @param rack: a list of letters, representing the letters to be organized into words in scrabble

    @return: the best word that can be made with the currect rack
             if no word can be made with the rack, an empty string with score 0 with will be returned instead
    }}} '''
    word_list = scoreList( rack )
    return bestWord_h( word_list ) #}}}

def bestWord_h( word_list ): #{{{
    ''' List bestWord_h( List word_list ) {{{
    @param word_list: a list of words that can be made from the rack given in the original function parameter

    @return: the highest scoring word in the word list, with its score
    }}} '''
    if ( word_list == [] ):
        return [ "", 0 ]
    best_word = bestWord_h( word_list[1:] )
    if ( word_list[0][1] > best_word[1] ):
        return word_list[0]
    return best_word #}}}

''' testing bestWord {{{
print( "bestWord test1:", bestWord( ["a", "s", "m", "o", "f", "o"] ) )
print( "bestWord test2:", bestWord( [] ) )
print( "bestWord test3:", bestWord( ['z','z','y','v','a','b','a','t'] ) )
print( "bestWord test3:", bestWord( ['z','z','y'] ) )
}}} '''
