public class reorder {

    /* for any list,
     * by inserting the last element between first and second element,
     * it places both elements in the right place
     * 
     * the full movement looks like
     * 1 2 3 4 5
     * 1 5 2 3 4 recurse on 2 3 4
     * 1 5 2 4 3
     */

    public ListNode solve( ListNode head ) {
        //base cases: empty, 1 length, or 2 length list
        if ( head == null || head.next == null || head.next.next == null )
            return head;

        //recursive cases
        //secure the first and last places
        //1. 1 -> last
        //   2 -> 3 -> ... last-1 -> null
        ListNode second = head.next; // 2 -> ...
        ListNode end = head; 
        while ( end.next.next != null )
            end = end.next; //have end represent last-1
        head.next = end.next; // 1 -> last
        end.next = null; // last-1 -> null
        head.next.next = second; // 1 -> last -> 2...
        //System.out.println( ListNode.toString( head ) );
        //System.out.println( ListNode.toString( second ) );

        //2. run it down with 2 as the first element
        //   because now the first two elements, 1 and last, are placed
        solve( second );
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
        reorder attempt = new reorder(); 
        System.out.println( ListNode.toString( attempt.solve( head1 ) ) );
        System.out.println( ListNode.toString( attempt.solve( head2 ) ) );
        //System.out.println( ListNode.toString( attempt.solve( head1, head2 ) ) );
    }
}
