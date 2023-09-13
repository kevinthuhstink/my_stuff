/*
 * =====================================================================================
 *
 *       Filename:  love.c
 *
 *    Description:  kevin and his quest for half baked love
 *
 *        Version:  1.0
 *       Revision:  prompts you to choose what kind of quotes you would like 
 *
 *         Author:  kevinthuhstink 
 *
 * =====================================================================================
 */
#include "header.h"

size_t QUOTE_SIZE = 4000;

/* rand_quote()
 * prints a random quote into the console
 * returns the number of the quote that got printed
 */
int rand_quote() {
    return 0;
} 

/* you manually put in
 * ARGS=[quote-list]
 * when using makefile to determine which quotes list you want
 *
 * if no args are provided, program defaults to all_quotes
 */

int main( int argc, char *argv[] ) {
    LIST_NAME = malloc( 256 );
    strcat( LIST_NAME, "quotes/" );
    //printf( "argc: %d\n", argc );
    if ( argc == 1 ) {
        strcat( LIST_NAME, "all_quotes.txt" );
        printf( "LIST_NAME: %s\n", LIST_NAME );
    }
    else if ( argc == 2 ) {
        if ( strcmp( argv[0], "all" ) == 0 )
            strcat( LIST_NAME, "all_quotes.txt" );
        else
            strcat( LIST_NAME, argv[1] );
        printf( "LIST_NAME: %s\n", LIST_NAME );
    }
    else {
        printf( "multiple quote lists not implemented yet, maybe in a later revision!\n" );
        return 1;
    }

    /*  main body goes here */

    return 0;
}
