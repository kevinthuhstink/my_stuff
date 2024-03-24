#ifndef BASE_DEFS
#define BASE_DEFS
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <time.h>
#include <errno.h>
struct node;
#endif

#ifndef LINKED_LIST
#define LINKED_LIST
struct linked_list {
    struct node *head;
    struct node *tail;
    int len;
};
struct linked_list* init_linked_list();
void add(struct linked_list* list, int data);
int get(struct linked_list* list, int index);
char* linked_list_tostr(struct linked_list* list);
#endif
