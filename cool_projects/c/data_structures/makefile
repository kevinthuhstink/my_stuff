_SUFFIXES:

all: linked_list.o hash_map.o
	gcc driver.c linked_list.o hash_map.o -o test.out
	./test.out $(ARGS)

linked_list.o: linked_list/linked_list.c
	gcc -c linked_list/linked_list.c
hash_map.o: hash_map/hash_map.c
	gcc -c hash_map/hash_map.c

run: test.out
	./test.out

clear:
	rm *.out
	rm *.o
