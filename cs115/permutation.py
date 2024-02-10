def permutation( s ):
    ''' List permutation( String s )
    returns a list of all permutations of s'''
    return permutations_h( s, 0 )

def permutations_h( s, index ):
    '''List permutations_h( String s, int index )
    helper function for permutation()
    grabs the index of each char at s and adds it to its permutations'''
    #our two base cases
    if index == len( s ):
        return []
    if ( len( s ) <= 1 ):
        return [s]
    #grab the char at index and permute with that gone
    #or move on without grabbing the char at that index
    cut_s = s[0:index] + s[index+1:]
    #permutations of cut_s needs to have the cut letter at the start
    #add_letter onto the permutations of cut_s gives all the permutations
    #of one letter at the beginning of the string
    perm_list = add_letter( s[index], permutations_h( cut_s, 0 ) )
    #we still require the permutations with other chars as the first letter
    #so increment index to indicate that we are taking a char from another location
    perm_list += permutations_h( s, index+1 )
    return perm_list
    
def add_letter( c, strings ):
    ''' List add_letter( char c, List s )
    adds c to the front of all strings in List s'''
    if strings == []:
        return []
    return [ c + strings[0] ] + add_letter( c, strings[1:] )

#print( add_letter( 'c', ['ab','bc','cd','de'] ) )
print( permutation( "bc" ) )
print( permutation( "abc" ) )
print( permutation( "aabc" ) )
'''notes
a zero/one length string is its own permutation
a two length string is itself + permutations of the one length
a three length string is each letter + permutations of the two length

for example, "abc"
requires 'a' to be added on to both permutations of "bc"
"bc" requires 'b' to be added onto 'c'
     requires 'c' to be added onto 'b'
'''
