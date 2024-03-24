#include "linked-list.h"

struct node {
    struct node *next;
    struct node *prev;
    int data;
};

struct node* init_node(int data) {
    struct node* new = malloc(sizeof(struct node));
    new->next = NULL;
    new->prev = NULL;
    new->data = data;
    return new;
}

struct linked_list* init_linked_list() {
    struct linked_list* new = malloc(sizeof(struct linked_list));
    new->head = NULL;
    new->tail = NULL;
    new->len = 0;
    return new;
}

void add(struct linked_list* list, int data) {
    if (list == NULL) {
        printf("NULL list reference");
        exit(1);
    }

    struct node* node = init_node(data);
    node->next = list->head;
    list->head = node;
    if (list->tail == NULL)
        list->tail = node;

    list->len++;
}

int get(struct linked_list* list, int index) {
    if (list == NULL) {
        printf("NULL list reference");
        exit(1);
    }
    if (index >= list->len) {
        printf("list index out of bounds\n");
        exit(1);
    }

    struct node* ptr = list->head;
    for (int i = 0; i < index; i++) {
        ptr = ptr->next;
    }
    return ptr->data;
}

char* linked_list_tostr(struct linked_list* list) {
    if (list == NULL) {
        printf("NULL list reference");
        exit(1);
    }
}
