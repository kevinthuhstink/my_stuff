/*
 * =====================================================================================
 *
 *       Filename:  hash_map.c
 *    Description:  hash map using h(k) = floor( M * kA mod 1 )
 *
 *         Author:  kevinthuhstink
 *
 * =====================================================================================
 */
#include "hash_map.h" 
//TODO: each linked list needs to contain a key-value pair
//		hashmap_put, hashmap_replace 
//		hashmap_tostr()

/*  instantiates a new hash map
 *  defaults to 16 keys, doubles in size every time capacity is reached
 *  uses linked lists to bypass collisions 
 *  @return: a pointer to a new hash map */
struct hash_map* hashmap_new() {
	struct hash_map* _new = malloc( sizeof( struct hash_map ) );
	_new->capacity = 16;
	_new->size = 0;
	//values are instantiated when values are added in

	//grab hashval from the random memory file
	int frandom = open( "/dev/random", O_RDONLY ), _pre;
	read( frandom, &_pre, sizeof( double ) );
	double hash = (double) _pre; //mantissa 0s are bad
	if ( hash < 0 )
		hash *= -1;
	//printf( "preprocessed hashval: %lf\n", hash );
	//convert from ridiculous number to decimal
	while ( hash > 1 )
		hash /= 2;
	_new->hashval = hash;
	return _new;
}

/* returns a string containing all the data contained within a hashmap
 * @param data: the hashmap to be serialized
 * @return: a string containing:
 *			the hash value of the hashmap,
 *			all key-value pairs contained within the hashmap
 *			(nil) if data is a NULL pointer */
char* hashmap_tostr( struct hash_map* data ) {
	if ( data == NULL )
		return NULL;
}

/*  frees the hashmap and all elements contained within it
 *  does nothing if linked list pointer is null
 *  @param data: the hashmap to be freed */
void hashmap_free( struct hash_map* data ) {
	if ( data == NULL )
		return;
	for ( int i = 0; i < data->size; i++ )
		freell( data->values[i] );
	free( data );
	return;
}
