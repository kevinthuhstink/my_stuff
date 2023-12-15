#include "linked_list.h"
//TODO: compatibility with strings and ints for hashmap
//		print k-v pairs for hashmaps
//		naming convention: datastruct_func()

/*  instantiates a new linked list node
 *  @param strval: the data to be stored within that node, can store NULL
 *  @return: a newly instantiated node with next pointing to NULL */
struct linked_node* newllnode( char* strval ) {
	struct linked_node* new = malloc( sizeof( struct linked_node ) );
	if ( strval != NULL ) {
		char* carriage = malloc( strlen( strval ) );
		new->strval = strcpy( carriage, strval );
	}
	else
		new->strval = NULL;
	new->next = NULL;
	new->prev = NULL;
	return new;
}

/*  sets the int value of a linked node
 *  @param val: the int value of the node to be altered
 *  	  node: the node whos value should be altered
 *  @return: 0 if node val was set, 1 if node was NULL */
int llset( int val, struct linked_node* node ) {
	if ( node == NULL )
		return 1;
	node->val = val;
	return 0;
}

/*  sets a key-value pair for a linked node for hash maps
 *  @param k: the key 
 *  	   v: the value
 *  	node: the node to set values with
 *  @return: 0 if values were set, 1 if node was NULL */
int llsetkv( int k, int v, struct linked_node* node ) {
	if ( node == NULL )
		return 1; 
	node->val = v;
	node->key = k;
	return 0;
}

/*  replace the string value of a linked node
 *  @param val: the int value of the node to be altered
 *  	  node: the node whos value should be altered
 *	@return: the new strval of the node */
char* llstrset( char* strval, struct linked_node* node ) {
	if ( node == NULL )
		return NULL;
	char* str = malloc( strlen( strval ) );
	free( node->strval );
	node->strval = strcpy( str, strval );
	return strval;
}

/*  adds a new node to the end of the list
 *  @param strval: the strvalue of the node to be added
 *  	  head: the head of the linked list
 *	@return: a pointer to the new head of the list */
struct linked_node* lladd( char* strval, struct linked_node* head ) {
	struct linked_node* _new = newllnode( strval );
	if ( head == NULL )
		return _new;
	struct linked_node* cpy = head;
	while ( cpy->next != NULL )
		cpy = cpy->next;
	//printf( "transport to: %s\n", strllnode( cpy ) );
	cpy->next = _new;
	_new->prev = cpy;
	return head;
}

/*  adds a new node to a specified index of the list
 *  @param strval: the strvalue of the node to be added
 *  	  head: the head of the linked list
 *  	 index: the resulting index of the added node
 *	@return: a pointer to the added node
 *			 throws error and exits if index is out of bounds */
struct linked_node* lladdat( char* strval, struct linked_node* head, int index ) {
	if ( index < 0 ) {
		printf( "Error: List index %d out of bounds\n", index );
		exit( EXIT_FAILURE );
	}
	struct linked_node* _new = newllnode( strval );
	if ( head == NULL )
		return _new;
	struct linked_node* cpy = head;
	if ( index == 0 ) {
		_new->next = head;
		head->prev = _new;
		return _new;
	}
	for ( int i = index; cpy->next != NULL && i > 1; i-- )
		cpy = cpy->next;
	if ( cpy->next == NULL ) {
		_new->prev = cpy;
		cpy->next = _new;
	}
	else {
		_new->prev = cpy;
		_new->next = cpy->next;
		if ( cpy->next != NULL )
			cpy->next->prev = _new;
		cpy->next = _new;
	}
	return head;
}

/*  locates the first node containing a matching strvalue
 *  @param strval: the strvalue of the node being located
 *   	  head: the head of the linked list to search through
 *  @return: a pointer to the node, NULL if no node exists */
struct linked_node* llsearch( char* data, struct linked_node* head ) {
	while ( head != NULL ) {
		if ( head->strval != NULL && strcmp( head->strval, data ) == 0 )
			return head;
		head = head->next;
	}
	return NULL;
}

/*  removes the first occurence of a strvalue from a linked list
 *  frees the memory from the node that was removed
 *  note: error-prone when used on singly linked list
 *  @param strval: the strvalue to be removed
 *  	  head: the head of the linked list with the removed node
 *  @return: a pointer to the head of the new linked list */
struct linked_node* llremove( char* data, struct linked_node* head ) {
	if ( data == NULL || head == NULL )
		return head;
	struct linked_node* node = llsearch( data, head );
	if ( node == NULL )
		return head;
	if ( node->prev != NULL )
		node->prev->next = node->next;
	if ( node->next != NULL )
		node->next->prev = node->prev;
	head = node->next;
	node->next = NULL;
	node->prev = NULL;
	freell( node );
	return head;
}

//TODO:
char* ll_kv( struct linked_node* node ) {
	if ( node == NULL ) {
		str = malloc( 6 );
		strcat( str, "(nil)\0" );
		return str;
	}
}

/*  returns a string representation of a node
 *  @param node: a singular linked list node
 *  @return: a string representation of that node (without its pointer) */
char* strllnode( struct linked_node* node ) {
	char* str;
	if ( node == NULL ) {
		str = malloc( 6 );
		strcat( str, "(nil)\0" );
		return str;
	}
	if ( node->strval == NULL ) {
		str = malloc( 10 * sizeof( char ) );
		strcat( str, "[ (nil) ]" );
		return str;
	}

	size_t LEN = 5 + strlen( node->strval ); // [ str ]\0
	str = malloc( LEN * sizeof( char ) );
	strcpy( str, "[ " );
	strcat( str, node->strval );
	strcat( str, " ]" );
	return str;
}

/*  gives a string representation of a linked list
 *  @param head: the head of the linked list
 *  @return: a string representation of the given linked list */
char* strll( struct linked_node* head ) {
	size_t len = 6, MAX_SIZE = 64; //len starts as 6 to represent terminating NULL\0
	char* str = calloc( MAX_SIZE, sizeof( char ) );

	while ( head != NULL ) {
		char* strval = head->strval;
		//printf( "strval: %s\n", strval );
		size_t node_len = strlen( strval ) + 2;
		//required to remake str if the list is too big
		if ( len += node_len >= MAX_SIZE ) {
			//printf( "resizing str...\n" );
			MAX_SIZE *= 2;
			char* new_str = malloc( MAX_SIZE * sizeof( char ) );
			strcpy( new_str, str );
			free( str );
			str = new_str;
		}

		strcat( str, strval );
		strcat( str, "->" );
		head = head->next;
	}
	strcat( str, "(nil)\0" );
	return str;
}

/*  deserializes any linked list represented by a string
 *  LL strings should be in the format v1->v2->v3...->NULL
 *  @param data: string representation of a linked list
 *  @return: the head of a linked list with strvals specified by data */
struct linked_node* makell( char* data ) {
	//tokenize data using " -> "
	struct linked_node* node = NULL;
	struct linked_node* head = node;
	struct linked_node* prev;
	char* strval_tok = strdup( data );
	if ( strval_tok == NULL ) {
		printf( "data could not be copied for deserialization\n%s\n", strerror( errno ) );
		exit( EXIT_FAILURE );
	}

	char* curr_strval = strtok( strval_tok, "->" ); //initial setup for strtok
	while ( curr_strval != NULL ) {
		if ( strcmp( curr_strval, "(nil)" ) == 0 )
			break;
		struct linked_node* new_node = newllnode( curr_strval );
		curr_strval = strtok( NULL, "->" );
		if ( node == NULL ) {
			node = new_node;
			head = node;
			prev = head;
		}
		else {
			node->next = new_node;
			node = node->next;
			node->prev = prev;
			prev = node;
		}
	}
	free( strval_tok );
	return head;
}

/*  frees all the memory stored within the entire linked list
 *  does nothing if linked list pointer is null
 *  @param head: the head of the linked list */
void freell( struct linked_node* head ) {
	if ( head == NULL )
		return;
	if ( head->prev != NULL )
		head->prev->next = NULL;
	struct linked_node* next = head;
	while ( head != NULL ) {
		next = next->next;
		if ( head->strval != NULL ) //sometimes, ptr head->strval is not obtained through malloc() FIXED
			free( head->strval ); //and will cause munmap_chunk() to tell you "i cant free this stuff"
		free( head );
		head = next;
	}
}
