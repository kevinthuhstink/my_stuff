public class merge_list {
    
    public ListNode solve( ListNode list1, ListNode list2 ) {
        //0 length lists edge cases zzzz
        if ( list1 == null )
            return list2;
        if ( list2 == null )
            return list1;

        //give head to the lesser of the two
        //required a seed listnode to start pushing nodes into the big list
        ListNode head = new ListNode(), mov = head; //mov moves down the lists
        //then walk down the rest of the nodes
        while ( list1 != null && list2 != null ) {
            System.out.println( "compare " + list1.val + " " + list2.val );
            if ( list1.val > list2.val ) {
                mov.next = list2;
                list2 = list2.next;
            }
            else {
                mov.next = list1;
                list1 = list1.next;
            }
            mov = mov.next;
        }
        //System.out.println( ListNode.toString( mov ) );
        //loop ends when we find a null
        if ( list1 == null )
            mov.next = list2;
        if ( list2 == null )
            mov.next = list1;
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
        for ( int i = 15; i > 8; i-- ) { //LinkedList of 7 nodes
            head2 = new ListNode( i ); 
            head2.next = next;
            next = head2;
        }
        System.out.println( ListNode.toString( head1 ) );
        System.out.println( ListNode.toString( head2 ) );
        merge_list attempt = new merge_list(); 
        System.out.println( ListNode.toString( attempt.solve( head1, head2 ) ) );
    }
}

