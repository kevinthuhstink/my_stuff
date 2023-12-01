############################################################
# Name: Kevin Cheng
# Pledge: I pledge my honor that I have abided by the Stevens Honor System.
# CS115 Lab 4
#
############################################################

def knapsack( capacity, items ): 
    ''' List knapsack( int capacity, List items ) {{{
    you are a renowned thief looking to steal the most money possible
    but you're weighed down and can only store up to a certain capacity
    @param capacity: the max "weight" of combined items you can carry
    @param items: a list of items
                  each item is represented by its weight in the first element
                  and its monetary value in its second element
    @return: a list with the total value of items stolen
             and the combination of items stolen 
    }}} '''
    sack = knapsack_h( capacity, items )
    return [ sack_value( sack ), sack ]


def knapsack_h( capacity, items ):
    ''' List knapsack_h( int capacity, List items ) {{{
    identical to knapsack except only the list of items is returned
    @param capacity: the max "weight" of combined items you can carry
    @param items: a list of items
                  each item is represented by its weight in the first element
                  and its monetary value in its second element
    @return: the combination of items stolen 
    }}} '''

    if capacity <= 0 or items == []:
        #base case, we are done here
        return []
    item = items[0] #List in the form [ weight, value ]
    item_weight = items[0][0] #int
    loseit = knapsack_h( capacity, items[1:] )
    if item_weight > capacity:
        #if we can't fit the item in the bag we have no choice but to lose it
        return loseit
    useit = [item] + knapsack_h( capacity - item_weight, items[1:] )
    #if we can choose between taking or leaving then we have to calculate values for both scenarios
    value_loseit = sack_value( loseit ) 
    value_useit = sack_value( useit )
    if value_useit > value_loseit:
        return useit 
    return loseit 

def sack_value( sack ): #{{{
    ''' int sack_value( List sack ) {{{
    @param sack: list of stolen goods with some assigned monetary value
    @return: the combined value of all goods within the sack
    i hate this flesh prison
    }}} '''
    if sack == []:
        return 0
    return sack[0][1] + sack_value( sack[1:] ) #}}}

#{{{ test cases
'''
print( knapsack(76, [[36, 35], [10, 28], [39, 47], [8, 1], [7, 24]]) )
print( knapsack(24, [[36, 35], [10, 28], [39, 47], [8, 1], [7, 24]]) )
print( knapsack(6, [[1, 4], [5, 150], [4, 180]]) )
print( knapsack(25, [[36, 35], [10, 28], [39, 47], [8, 1], [7, 24]]) )
print( knapsack(0, [[1, 1000], [2, 3000], [4, 55000]]) )
print( knapsack(20, []) )
'''
#}}}
