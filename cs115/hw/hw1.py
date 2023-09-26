############################################################
# Name: Kevin Cheng
# Pledge: I pledge my honor that I have abided by the Stevens Honor System
# CS115 HW 1
#
############################################################
from functools import reduce

""" double mult( num x, num y )
@param x: any real number
@param y: any real number
@return: the product of x and y
"""
def mult(x, y):
    return x * y

""" int factorial( int n )
@param n: any positive integer
@return: n * (n-1) * (n-2) * ... 2 * 1
"""
def factorial( n ):
    terms = list( range( 1, n+1 ) )
    return reduce( mult, terms )

""" double add( num x, num y )
@param x: any real number
@param y: any real number
@return: the sum of x and y
"""
def add(x, y):
    return x + y

""" double mean( num[] terms )
@param terms: a list of real numbers
@return: the arithmetic mean of all numbers in List terms
"""
def mean( terms ):
    return reduce( add, terms ) / len( terms )
