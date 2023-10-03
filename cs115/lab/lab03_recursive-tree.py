############################################################
# Name: Kevin Cheng
# Pledge: I pledge my honor that I have abided by the Stevens Honor System.
# CS115 Lab 3
#
############################################################

def give_change( amount, coins ):
    ''' int change( int amount, List coins ) {{{
    change calculates the minimum number of coins required to create a value amount
        ex: 0.25$ can be produced with 5 nickels or 1 quarter, so change returns
            1 because the minimum number of coins ( 1 quarter ) is required to produce 0.25$
    @param amount: the number a combination of coins has to sum to
    @param coins: the value of coins available to produce amounts

    @return: the fewest number of coins necessary to produce amount
             inf if there is no way to construct amount with the given coins
    }}} '''
    if ( amount == 0 ):
        return [ 0, [] ]
    if ( coins == [] ):
        return [ float( "inf" ), [] ]
    #we need to add 1 to change[0] and the coin to change[1]
    if ( amount >= coins[0] ):
        curr_coin = coins[0]
        useIt = [ 1 + change( amount - curr_coin, coins ), [curr_coin] + give_change( amount - curr_coin, coins )[1] ]
        loseIt = give_change( amount, coins[1:] )
        if ( useIt[0] < loseIt[0] ):
            return useIt
        return loseIt
    return give_change( amount, coins[1:] )
 
def change( amount, coins ): #{{{
    if ( amount == 0 ):
        return 0
    if ( coins == [] ):
        return float( "inf" )
    if ( amount >= coins[0] ):
        return min( 1 + change( amount - coins[0], coins ), change( amount, coins[1:] ) )
    return change( amount, coins[1:] ) #}}}

#custom test cases {{{
print( give_change(10, [5]) )
print( give_change(48, [24] ) )
print( give_change(48, [1, 5, 10, 25, 50]) )
print( give_change(48, [1, 7, 24, 42]) )
print( give_change(25, [1,5,16] ) )
print( give_change(0, [1,5,16] ) )
print( give_change(178, [89, 1, 177] ) )
print( give_change(2, [3] ) )
#}}}
