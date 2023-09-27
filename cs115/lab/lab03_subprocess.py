############################################################
# Name: Kevin Cheng
# Pledge: I pledge my honor that I have abided by the Stevens Honor System.
# CS115 Lab 3
#
############################################################

def change( amount, coins ):
    ''' int change( int amount, List coins ) {{{
    change calculates the minimum number of coins required to create a value amount
        ex: 0.25$ can be produced with 5 nickels or 1 quarter, so change returns
            1 because the minimum number of coins ( 1 quarter ) is required to produce 0.25$
    @param amount: the number a combination of coins has to sum to
    @param coins: the value of coins available to produce amounts

    @return: the fewest number of coins necessary to produce amount
             inf if there is no way to construct amount with the given coins
    }}} '''
    #base cases after coins are added to the amount
    if ( amount == 0 ):
        return 0
    if ( coins == [] ):
        return float( "inf" )
    #each time we reduce the amount by a coin value,
    #we can keep cutting the same coin value or try cutting with different coins
    if ( amount >= coins[0] ):
        return min( change( amount, coins[1:] ), 1 + change( amount - coins[0], coins ) )
    #if amount is less than coins then we are forced to check the next coin
    return change( amount, coins[1:] )
 
#custom test cases {{{
'''
print( change(48, [1, 5, 10, 25, 50]) )
print( change(48, [1, 7, 24, 42]) )
print( change(48, [24] ) )
print( change(25, [1,5,16] ) )
print( change(0, [1,5,16] ) )
print( change(178, [89, 1, 177] ) )
print( change(2, [3] ) )
'''
#}}}
