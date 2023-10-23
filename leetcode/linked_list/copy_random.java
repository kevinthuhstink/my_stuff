public class copy_random {
    //LinkedList size <= 1_000
    //just figure out a way to do it

    /* it's possible to map a node to its random node
     * and then connect the nodes to the random nodes
     * of course this solution is memory efficient but very slow
     */

    public Node solve( Node head ) {
        if ( head == null ) return null;
        //head is the og, new_head is the copy
        //copy_thru needs to correspond with new_thru
        Node new_head = new Node( head.val ), copy_thru = head.next, new_thru = new_head;
        int size = 1; //records the size of the LinkedList for use with random
        while ( copy_thru != null ) {
            Node new_next = new Node( copy_thru.val );
            new_thru.next = new_next;
            copy_thru = copy_thru.next;
            size++;
        } //new_head represents the copied list, but the randoms are still null
        //iterate through the list one more time to grab the randoms as well

        copy_thru = head;
        new_thru = new_head;
        while ( copy_thru != null ) {
            //1. find the location that the random pointer points to
            Node thru_random = copy_thru.random;
            if ( thru_random == null ) { //off-case where random points to null
                new_thru.random = null;
                new_thru = new_thru.next;
                copy_thru = copy_thru.next;
                continue;
            }
            int index = size - 1;
            while ( thru_random != null ) { //last node has index size - 1
                index--;                    //first node has index 0 because it's going to iterate through size - 1 nodes
                thru_random = thru_random.next;
            } 

            Node new_random = new_head;
            while ( index > 0 ) {
                new_random = new_random.next;
                index--;
            }
            new_thru.random = new_random;
            copy_thru = copy_thru.next;
            new_thru = new_thru.next;
        }
        return new_head;
    }
}
