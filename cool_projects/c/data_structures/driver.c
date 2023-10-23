#include "headers.h"
char* _STRUCTS[_STRUCTS_CT];

void init_structs() {
    for ( int i = 0; i < _STRUCTS_CT; i++ )
        _STRUCTS[i] = malloc( 20 * sizeof( char ) );
    strcpy( _STRUCTS[0], "Linked List" );
    strcpy( _STRUCTS[1], "Hash Map" );
}

int testLL() {
//initialize linked list
    //initialize the linked list as 'we had good times together, don't forget that'
	//testing makell
	char* stralbum = "dissociating->self destruction worldwide broadcast->all the joy in life was gone once you left->the last thing she sent me->light at the end of the tunnel->ultradespair->borderline->whatever->blissful overdose->inertia status->die alone->sick, twisted, demented->her->goodbye->(nil)";
    struct linked_node* head = makell( stralbum );

	//makell & strll verification
	/*
    char* stralbum_cpy = strll( head );
    printf( "Comparing list strings...%d\n", strcmp( stralbum, stralbum_cpy ) );
	printf( "Original: %s\nCopy: %s\n", stralbum, stralbum_cpy );
    free( stralbum_cpy ); */

	//testing llsearch
	struct linked_node* slvt = llsearch( "her", head );
	printf( "%s\n%s\n", strll( slvt ), strll( head ) );
	/*
    printf( "\nSearching for 'her'...\n%s\n", strll( slvt ) );
	struct linked_node* dne = llsearch( "nhelv", head );
	printf( "Searching for absent node\n%s\n", strll( dne ) ); */

	//testing llremove
	llremove( "goodbye", slvt );
	printf( "\nRemoved 'goodbye'...\n%s\n%s\n", strll( slvt ), strll( head ) );
	slvt = llremove( "her", slvt );
	printf( "\nRemoved 'her'...\n%s\n%s\n", strll( slvt ), strll( head ) );

	//testing lladd, lladdat
	printf( "\nAdding 'goodbye'...\n" );
	slvt = lladd( "goodbye", slvt );
	printf( "%s\n%s\n", strll( slvt ), strll( head ) );
	printf( "\nAdding 'her'...\n" );
	lladdat( "her", slvt, 1 );
	printf( "%s\n%s\n", strll( slvt ), strll( head ) );
    freell( head );
	return 0;
}

int testHashMap() {
	struct hash_map* this = newhashmap();
	printf( "this hashval: %lf\n", this->hashval );
	return 0;
}

//note that argv[0] is the program name ( ./test.out )
//which means argc >= 1
int main( int argc, char* argv[] ) {
    init_structs();
	//no args has the equivalent of test all
    if ( argc == 1 ) {
		testLL();
		//testHashMap();
        return 0;
    }
	if ( strcmp( argv[1], "linked_list" ) == 0 ) {
		testLL();
		return 0;
	}
	else {
        printf( "choose something to test:\n" );
        for ( int i = 0; i < _STRUCTS_CT; i++ )
            printf( "%s\n", _STRUCTS[i] );
		return 0;
	}
}
