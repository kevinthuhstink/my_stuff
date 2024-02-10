public class reverse_list {

    public ListNode solve( ListNode head ) {
        if ( head == null ) return null;
        ListNode r_last = new ListNode( head.val );
        ListNode next = head.next;
        while ( next != null ) {
            ListNode add = new ListNode( next.val );
            add.next = r_last;
            r_last = add;
            head = next;
            next = next.next;
        }
        return r_last;
    }

    public static void main( String[] args ) {
        ListNode test = new ListNode( 1, new ListNode( 2 ) );
        reverse_list attempt = new reverse_list(); 
        System.out.println( ListNode.toString( attempt.solve( test ) ) );
        System.out.println( ListNode.toString( attempt.solve( null ) ) );
    }
}
