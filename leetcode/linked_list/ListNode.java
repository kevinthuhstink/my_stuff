/* standard linked list node implementation
 * for leetcode problems
 */

public class ListNode {
    
    int val;
    ListNode next;

    public ListNode() {
        this.val = -1;
        this.next = null;
    }

    public ListNode( int init ) {
        this.val = init;
        this.next = null;
    }
    
    public ListNode( int init, ListNode init_next ) {
        this.val = init;
        this.next = init_next;
    }

    public static String toString( ListNode head ) {
        String s = "[ ";
        while ( head != null ) {
            s += head.val + " ";
            head = head.next;
        }
        return s + "]";
    }
}
