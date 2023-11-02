#define LINKED_LIST
#ifndef _BASEDEFS
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <errno.h>
#endif

struct linked_node {
    char* strval;
	int key;
	int val;
    struct linked_node* next;
    struct linked_node* prev;
};

//operations on singular nodes
struct linked_node* newllnode( char* val );
struct linked_node* lladd( char* val, struct linked_node* head );
struct linked_node* lladdat( char* val, struct linked_node* head, int index );
int llset( int val, struct linked_node* head );
int llsetkv( int k, int v, struct linked_node* node );
char* llstrset( char* strval, struct linked_node* head );

//operations on the entire list
struct linked_node* llsearch( char* val, struct linked_node* head );
struct linked_node* llremove( char* val, struct linked_node* head );
char* strllnode( struct linked_node* head );
char* strll( struct linked_node* node );
struct linked_node* makell( char* data );
void freell( struct linked_node* head );

//why this isnt predefined confuses me
char* strdup( const char* s );
