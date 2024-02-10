'''
Created on 10/11/2023 
@author:   Kevin Cheng 
Pledge:    I pledge my honor that I have abided by the Stevens Honor Pledge.

CS115 - Lab 5
'''
import time

words = []
HITS = 10
comps = {}

def fastED(first, second):
    '''Returns the edit distance between the strings first and second. Uses
    memoization to speed up the process.'''
    #base cases not required to be saved in memory
    if first == '':
        return len( second )
    if second == '':
        return len( first )
    if first[0] == second[0]:
        return fastED( first[1:], second[1:] )

    #ok so an edit wll be necessary
    test_case = (first, second)
    if test_case in comps:
        return comps[test_case]
    sub = 1 + fastED( first[1:], second[1:] )
    del1 = 1 + fastED( first[1:], second )
    del2 = 1 + fastED( first, second[1:] )
    comps[test_case] = min( sub, del1, del2 )
    return comps[test_case]

def getSuggestions(user_input):
    '''For each word in the global words list, determine the edit distance of
    the user_input and the word. Return a list of tuples containing the
    (edit distance, word).'''
    dists = lambda d_words: ( fastED( user_input, d_words ), d_words )
    return list( map( dists, words ) )

def spam(): #{{{
    '''Main loop for the program that prompts the user for words to check.
    If the spelling is correct, it tells the user so. Otherwise, it provides up
    to HITS suggestions.

    To exit the loop, just hit Enter at the prompt.'''
    while True:
        user_input = input('spell check> ').strip()
        if user_input == '':
            break
        if user_input in words:
            print('Correct')
        else:
            start_time = time.time()
            suggestions = getSuggestions(user_input)
            suggestions.sort()
            endTime = time.time()
            print('Suggested alternatives:')
            for suggestion in suggestions[:HITS]:
                print(' %s' % suggestion[1])
            print('Computation time:', endTime - start_time, 'seconds')
    print('Bye') #}}}

if __name__ == '__main__':
    f = open('3esl.txt') #f for file
    for word in f: #for each line in f
        words.append(word.strip()) #add its contents minus whitespace
    f.close() #close the file
    ''' {{{
    print( fastED( 'asiciclesfall', 'kwasciclesfall' ) )
    print( fastED( 'corsaceowc', 'owccorsace' ) )
    print( fastED( 'afterlife', 'ambidextrous' ) ) }}}'''
    spam() 
