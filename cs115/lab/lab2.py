############################################################
# Name: Kevin Cheng
# Pledge: I pledge my honor that I have abided by the Stevens Honor System.
# CS115 Lab 2
#
############################################################

def dot( L, K ):
    """ int dot( int[] L, int[] K )
        takes the dot product of the two "vectors" L and K.
        @param L: any list of numbers
        @param K: any list of numbers with the same length as L
        @return: a number equal to L[0] * K[0] + L[1] * K[1] ...
    """
    if ( L == [] ):
        return 0
    return dot( L[1:], K[1:] ) + L[0] * K[0]
print( "dot:", dot( [ 6, 2, 5 ], [ 2, 1, 8 ] ) ) #PASS

def explode( S ):
    """ char[] explode( String S )
        puts every character of S into an array
        @param S: any string
        @return: a list of characters containing every character in the original string
    """
    if ( S == "" ):
        return [] 
    return [ S[0] ] + explode( S[1:] )
print( "explode:", explode( "alsdfza" ) ) #PASS

def ind( e, L ):
    """ int ind( int e, List L )
        finds the location of e indexed within L
        @param e: any element within List L
        @param L: any list containing element e
        @return: the index of element e within list L, -1 otherwise
    """
    if ( L == [] or L == "" or L[0] == e ):
        return 0
    return ind( e, L[1:] ) + 1
print( "ind:", ind( 5, [1,6,7] ) ) #PASS

def removeAll( e, L ):
    """ List removeAll( int e, List L )
        removes all elements equal to elements e within list L
        @param e: the desired element to be removed within list L
        @param L: any list 
        @return: List L without any elements equal to element e
    """
    if ( L == [] ):
        return L
    if ( L[0] == e ):
        return removeAll( e, L[1:] )
    return [ L[0] ] + removeAll( e, L[1:] )
print( "removeAll:", removeAll( "a", explode( "azdagajaa" ) ) ) #PASS

def myFilter( f, L ):
    """ List myFilter( boolean function f, List L )
        removes all elements that doesn't pass the function test f
        @param f: any function that takes one parameter and returns either true or false
        @param L: any list
        @return: List L containing only the elements that returned true when passed through function f
    """
    if ( L == [] ):
        return []
    if ( not f( L[0] ) ):
        return myFilter( f, L[1:] )
    return [ L[0] ] + myFilter( f, L[1:] )
print( "myFilter:", myFilter( lambda x: ( x % 2 == 0 ), list( range( 0, 10 ) ) ) ) #PASS

def deepReverse( L ):
    """ List deepReverse( List L )
        reverses the order of elements within the list,
        including the order of elements of lists within the parameter list L
        @param L: the list to be reversed
        @return: List L with all elements, including elements within lists within L, reversed in order
    """
    if ( L == [] ):
        return L
    if ( isinstance( L[-1], list ) ):
        L[-1] = deepReverse( L[-1] )
    return [ L[-1] ] + deepReverse( L[:-1] )
print( "deepReverse1:", deepReverse( [1, [2, 3]] ) ) #PASS
print( "deepReverse2:", deepReverse( [1, [2, [3, 4], [5, [6, 7], 8]]] ) ) #PASS
