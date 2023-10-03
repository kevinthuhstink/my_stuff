public class add_nums {

    /* the linked list represents the digits of the number in reverse order
     * add the two linked lists like you just learned how to do addition
     *
     * l1[0] + l2[0] = sol[0]
     * for all things in the two lists
     * cause int overflow is a bitch
     */
    public ListNode solve( ListNode l1, ListNode l2 ) {
        //we are doing additon like a little kid now
        boolean rollover = false;
        ListNode digit = new ListNode(), head = digit;
        while ( l1 != null || l2 != null ) {
            int val;
            if ( l1 == null ) val = l2.val;
            else if ( l2 == null ) val = l1.val;
            else val = l1.val + l2.val;

            if ( rollover == true ) val++;
            if ( val > 9 ) {
                val = val %  10;
                rollover = true;
            }
            else rollover = false;

            digit.next = new ListNode( val );
            digit = digit.next;
            if ( l1 != null ) l1 = l1.next;
            if ( l2 != null ) l2 = l2.next;
        }
        //we got one last digit that needs to be added from rollover
        //if we had to rollover larger than the list sizes
        if ( rollover == true )
            digit.next = new ListNode( 1 );
        return head.next;
    }

    public static void main( String[] args ) {
        ListNode head1 = null, next = null;
        for ( int i = 5; i > 0; i-- ) { //create a LinkedList of 5 nodes
            head1 = new ListNode( i ); 
            head1.next = next;
            next = head1;
        }
        next = null;
        ListNode head2 = null;
        for ( int i = 8; i > 2; i-- ) { //LinkedList of 6 nodes
            head2 = new ListNode( i ); 
            head2.next = next;
            next = head2;
        }
        ListNode digit9 = new ListNode( 9 );
        System.out.println( ListNode.toString( head1 ) );
        System.out.println( ListNode.toString( head2 ) );
        add_nums attempt = new add_nums(); 
        System.out.println( ListNode.toString( attempt.solve( head1, head2 ) ) );
        System.out.println( ListNode.toString( attempt.solve( digit9, head2 ) ) );
        //System.out.println( ListNode.toString( attempt.solve( head2 ) ) );
        //System.out.println( ListNode.toString( attempt.solve( head1, head2 ) ) );
    }
}
