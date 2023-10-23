/* custom implementation for LRUcache
 */
import java.util.AbstractMap;
public class DoubleNode {
    
    AbstractMap.SimpleEntry<Integer, Integer> val;
    DoubleNode next;
    DoubleNode prev;

    public DoubleNode() {
        this.val = null;
        this.next = null;
        this.prev = null;
    }

    public DoubleNode( int key, int val ) {
        this.val = new AbstractMap.SimpleEntry<>( key, val );
        this.next = null;
        this.prev = null;
    }

    public static String toString( DoubleNode head ) {
        String s = "[ ";
        while ( head != null ) {
            s += head.val + " ";
            head = head.next;
        }
        return s + "]";
    }
}
