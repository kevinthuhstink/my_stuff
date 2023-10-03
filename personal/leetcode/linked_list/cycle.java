import java.util.HashMap;
import java.util.ArrayList;
public class cycle {
    public boolean solve( ListNode head ) {
        //list out all the nodes we've seen
        HashMap<Integer, ArrayList<ListNode>> seen = new HashMap<>();
        while ( head.next != null ) {
            int val = head.val;
            ArrayList<ListNode> node_list;
            //100% have not seen this node yet
            if ( !seen.containsKey( val ) ) {
                node_list = new ArrayList<>();
                node_list.add( head );
                seen.put( val, node_list );
            }
            //ruh roh this node might exist already
            else {
                node_list = seen.get( val );
                for ( ListNode seen_node : node_list )
                    if ( seen_node == head.next )
                        return false;
                node_list.add( head );
            }
            head = head.next;
        }
        return true;
    }
}
