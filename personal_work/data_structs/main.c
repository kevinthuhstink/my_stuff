#include "linked-list/linked-list.h"

void test_linked_list() {
    struct linked_list* list = init_linked_list();
    printf("sizeof linked list: %lu\n", sizeof(list));
}

int main() {
    test_linked_list();
}
