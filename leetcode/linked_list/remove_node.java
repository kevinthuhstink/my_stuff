public class remove_node {

    public ListNode simple_solve( ListNode head, int n ) {
        if ( head.val == n ) return head.next;
        ListNode search = head.next;
        while ( search != null && search.next != null ) { //stops at last
            if ( search.next.val == n )
                search.next = search.next.next;
            search = search.next;
        }
        return head;
    }

    /* the search pointer needs to go the end
     * and the remove pointer should lag n nodes behind the search pointer
     *
     * once search hits the last node, remove.next -> remove.next.next
     */
    public ListNode solve( ListNode head, int n ) {
        //edge case when len 1
        if ( head.next == null ) return null;
        ListNode search = head, remove = null;

        //move search to the nth element
        for ( int len = 0; len < n; len++ )
            search = search.next;
        //System.out.println( ListNode.toString( search ) );
        //and let remove take head
        remove = head;
        //edge case remove first element
        if ( search == null )
            return head.next;
        while ( search.next != null ) { //stop at the last element
            search = search.next;
            remove = remove.next;
        }
        remove.next = remove.next.next;
        return head;
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
        for ( int i = 15; i > 9; i-- ) { //LinkedList of 6 nodes
            head2 = new ListNode( i ); 
            head2.next = next;
            next = head2;
        }
        System.out.println( ListNode.toString( head1 ) );
        System.out.println( ListNode.toString( head2 ) );
        remove_node attempt = new remove_node(); 
        System.out.println( ListNode.toString( attempt.solve( head1, 5 ) ) );
        System.out.println( ListNode.toString( attempt.solve( head2, 5 ) ) );
        //System.out.println( ListNode.toString( attempt.solve( head1, head2 ) ) );
    }
}
