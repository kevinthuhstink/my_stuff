############################################################
# Name: Kevin Cheng
# Pledge: I pledge my honor that I have abided by the Stevens Honor System.
# CS115 Lab 1
#
############################################################

from math import factorial
from functools import reduce

""" double add( num x, num y )
returns the sum of x and y
"""
def add(x, y):
    return x + y


""" double inverse( num x )
returns the reciprocal of x ( ie 1/x )
"""
def inverse(x):
    return 1 / x

""" double e( int n )
returns the taylor approximation of e, up to n terms
the taylor approximation of e is 1 + 1/(1!) + 1/(2!) ... 1/(n!) ...+ 0
"""
def e(n):
    terms = list( range( 1, n + 1 ) )
    #map iterates a function on every element in the array
    terms = map( factorial, terms )
    terms = map( inverse, terms )
    #reduce "reduces" all terms of the array into one single element using a function
    return 1 + reduce( add, terms )

print( e(2) )
