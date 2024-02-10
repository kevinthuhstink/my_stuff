/* CS 284-E HW2
 * Author: Kevin Cheng
 * Pledge: I pledge my honor that I have abided by the Stevens Honor System.
 * TODO figure out what to do for the IndexOutOfBounds
 */
import java.util.ArrayList;

public class IDLList<E> {

    class Node<E> {
        E data;
        Node<E> next;
        Node<E> prev;

        /**
         * Constructor for node elements within the IDList.
         * @param elem the data stored within the node to be created
         */
        Node(E elem) {
            this.data = elem;
        }

        /**
         * Constructor for node elements within the IDList
         * that also specify the nodes this node points to.
         * @param elem the data stored within the node to be created
         * @param prev the node with index prior to this node
         * @param next the node with index subsequent to this node
         */
        Node(E elem, Node<E> prev, Node<E> next) {
            this.data = elem;
            this.next = next;
            this.prev = prev;
        }
    }

    private Node<E> head;
    private Node<E> tail;
    private int size;
    ArrayList<Node<E>> indices;

    /**
     * Constructor for the IDList
     * Instantiates a list with zero nodes.
     */
    public IDLList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        indices = new ArrayList<Node<E>>();
    }

    /**
     * Adds a new node to the linked list with its data set to elem,
     * and its position within the list specified by index.
     * @param index the position within the linked list the new node will have
     * @param elem  the data stored within the node to be added
     * @return      always returns true if no errors are encountered
     */
    public boolean add(int index, E elem) {
        if (index < 0 || index > size)
            //throw new IndexOutOfBoundsException();
            return true;
        if (index == size)
            return this.append(elem);
        if (index == 0)
            return this.add(elem);

        Node<E> newPrev = this.indices.get(index - 1);
        Node<E> newNext = this.indices.get(index);
        Node<E> _new = new Node<E>(elem, newPrev, newNext);
        newPrev.next = _new;
        newNext.prev = _new;
        this.indices.add(index, _new);
        this.size++;
        return true;
    }

    /**
     * Adds a new node as the head of the linked list.
     * @param elem the data stored within the node to be added
     * @return     always returns true if no errors are encountered
     */
    public boolean add(E elem) {
        Node<E> node = new Node<E>(elem, null, this.head);
        if (size == 0)
            this.tail = node;
        if (this.head != null)
            this.head.prev = node;
        this.head = node;
        this.indices.add(0, node);
        this.size++;
        return true;
    }

    /**
     * Adds a new node to the end of the linked list.
     * @param elem the data stored within the node to be added
     * @return     always returns true if no errors are encountered
     */
    public boolean append(E elem) {
        Node<E> node = new Node<E>(elem, this.tail, null);
        if (size == 0)
            this.head = node;
        if (this.tail != null)
            this.tail.next = node;
        this.tail = node;
        this.indices.add(size, node);
        this.size++;
        return true;
    }

    /**
     * Retrieves the element stored at a given index.
     * @param index the index of the element to be retrieved from the list
     * @return      the element stored at the list index
     */
    public E get(int index) {
        if (index < 0 || index > size)
            //throw new IndexOutOfBoundsException();
            return null;
        return this.indices.get(index).data;
    }

    /**
     * Retrieves the element stored at the head of the list.
     * @return the element stored in the head node
     */
    public E getHead() {
        if (this.head == null)
            //throw new AbsentInformationException()
            return null;
        return this.head.data;
    }

    /**
     * Retrieves the element stored at the tail of the list.
     * @return the element stored in the tail node
     */
    public E getLast() {
        if (this.tail == null)
            //throw new AbsentInformationException()
            return null;
        return this.tail.data;
    }

    /**
     * @return the size of the list
     */
    public int size() {
        return this.size;
    }

    /**
     * Removes the node at the head of the list.
     * @return the element that was removed from the list
     */
    public E remove() {
        if (this.size == 0)
            throw new IllegalStateException();
        Node<E> node = this.indices.remove(0);
        this.head = node.next;
        if (this.head == null)
            this.tail = null;
        this.size--;
        return node.data;
    }

    /**
     * Removes the node at the tail of the list.
     * @return the element that was removed from the list
     */
    public E removeLast() {
        if (this.size == 0)
            throw new IllegalStateException();
        Node<E> node = this.indices.remove(this.size - 1);
        this.tail = node.prev;
        if (this.tail == null)
            this.head = null;
        this.size--;
        return node.data;
    }

     /**
     * Removes the node at the tail of the list.
     * @param index the index of the element to be removed from the list
     * @return      the element that was removed from the list
     */
    public E removeAt(int index) {
        if (index < 0 || index >= size)
            throw new IllegalStateException();
        if (index == size - 1)
            return this.removeLast();
        if (index == 0)
            return this.remove();

        Node<E> node = this.indices.remove(index);
        Node<E> rmPrev = node.prev;
        Node<E> rmNext = node.next;
        rmNext.prev = rmPrev;
        rmPrev.next = rmNext;
        this.size--;
        return node.data;
    }

     /**
     * Removes the first occurrence of elem in the list.
     * @param elem the element to be removed
     * @return     true if an element was removed, false otherwise
     */
    public boolean remove(E elem) {
        if (size == 0)
            return false;

        int findIndex = -1;
        for (int i = 0; i < size; i++) {
            if (this.indices.get(i).data.equals(elem)) {
                findIndex = i;
                break;
            }
        }

        if (findIndex == -1)
            return false;
        this.removeAt(findIndex);
        return true;
    }

     /**
     * @return a String representation of the list
     */
    @Override
    public String toString() {
        if (this.size == 0)
            return "[]";

        ArrayList<String> elems = new ArrayList<String>();
        for (Node<E> node : this.indices) {
            if (node.data == null)
                elems.add("(nil)");
            else
                elems.add(node.data.toString());
        }
        return "[" + String.join(" <-> ", elems) + "]";
    }
}
