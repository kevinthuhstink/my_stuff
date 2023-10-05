public class cycle {
    public boolean solve( ListNode head ) {
        if ( head == null ) return false;
        //the slug travels slowly while the hare runs quickly
        //the list terminates with a null if it isn't cyclic,
        //and the hare's gonna get there first
        ListNode slug = head, hare = head.next;
        while ( hare != null && hare.next != null ) {
            //within a cyclic LinkedList, the two runners will eventually meet at one point,
            //the cyclic node
            if ( slug == hare ) return true;
            slug = slug.next;
            hare = hare.next.next;
        }
        return false;
    }
}
