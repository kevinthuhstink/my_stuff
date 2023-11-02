#define HASH_MAP
#ifndef LINKED_LIST
#include "../linked_list/linked_list.h"
#endif
#ifndef _FILE_ACCESS
#include <fcntl.h>
#include <sys/stat.h>
#include <dirent.h>
#endif
#define _HASHMAP_DEFAULT_SIZE 16

struct hash_map {
	struct linked_node* values[_HASHMAP_DEFAULT_SIZE];
	double hashval;
	int size;
	int capacity;
};

struct hash_map* newHashMap();
void freeHashMap( struct hash_map* data );
