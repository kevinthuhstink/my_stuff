'''
Created on 11/1/2023 
@author:   Kevin Cheng 
Pledge:    I pledge my honor that I have abided by the Stevens Honor System. 

CS115 - Lab 9
'''
from lib.mandelbrot import cs5png

def mult( c, n ):
    '''Multiplies c by n'''
    result = 0;
    for i in range( n ):
        result += c
    return result

def update( c, n ):
    '''Returns the value of z = z**2 + c
       with the given c, and z iterated n times,
       which is where c lands in the mandelbrot set after n iterations'''
    z = 0
    for i in range( n ):
        z = z**2 + c
    return z

def inMSet( c, n ):
    '''Returns true if complex number c is in the mandelbrot set, false otherwise
       The mandelbrot set is defined as all complex numbers that converge as more
       iterations of z = z**2 + c are taken
       If the magnitude of z hits 2 then the subsequent sequence of z values diverges'''
    z = 0
    for i in range( n ):
        z = z**2 + c
        if abs( z ) >= 2:
            return False
    return True
#print( inMSet( .3-.5j, 25 ) )

# changing and to or when graphing creates grid lines instead of points
def scale( pix, pixelMax, floatMin, floatMax ):
    ''' scale takes in
        pix, the CURRENT pixel column (or row)
        pixMax, the total # of pixel columns
        floatMin, the min floating-point value
        floatMax, the max floating-point value
        scale returns the floating-point value that corresponds to pix '''
    vrange = floatMax - floatMin
    vpos = pix / pixelMax
    return vpos * vrange + floatMin

def mset():
    width = 300
    height = 200
    image = PNGImage( width, height )

    for col in range( width ):
        for row in range( height ):
            # unscale the pixel down to range [-2 1]x[-1 1]
            vcol = scale( col, width, -2.0, 1.0 )
            vrow = scale( row, height, -1.0, 1.0 )
            c = vcol + vrow * 1j
            if inMSet( c, 25 ):
                image.plotPoint( col, row )
    image.saveFile()

# mset()
