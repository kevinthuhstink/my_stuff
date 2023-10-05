import java.util.HashMap;
import java.util.AbstractMap;
public class LRUCache {

    int capacity;
    HashMap<Integer, DoubleNode> cache;
    DoubleNode head, end;
    /* the representation of timings is going to be a doubly LinkedLists
     * the carraige of each node is going to be a pair of K,V
     * the head is the LeastRecentlyUsed entry
     * if we need to evict, do it from the head
     * if an element is accessed make it the new end
     *
     * LRU -> LRU + 1 ... MRU - 1 -> MRU
     * from the least recently used to the most
     */
    public LRUCache( int capacity ) {
        this.capacity = capacity;
        cache = new HashMap<>();
        head = null;
        end = null;
    }

    //moves a node to end once we've accessed it
    private void move_end( DoubleNode node ) {
        //moving nodes at the end or head
        if ( end == node )
            return;
        if ( head == node ) {
            head = node.next;
            head.prev = null;
            end.next = node;
            node.prev = end;
            end = node;
            return;
        }
        //moving a loose node
        if ( node.next == null && node.prev == null ) {
            end.next = node;
            node.prev = end;
            end = node;
	    return;
        }

        //grab the nodes that were pointing to our little guy
        DoubleNode back = node.prev;
        DoubleNode frnt = node.next;
        back.next = frnt;
        frnt.prev = back;
        //now node is completely isolated and needs to move to the end
        end.next = node;
        node.next = null;
        node.prev = end;
        end = node;
    }

    public int get( int key ) {
        //only dumbfucks run get on an empty cache
        if ( head == null )
            return -1;
        //no key means -1
        if ( !cache.containsKey( key ) || cache.get( key ).val.getKey() != key )
            return -1;
        DoubleNode node = cache.get( key );
        if ( node == null )
            return -1;

        move_end( node );
        return node.val.getValue();
    }

    public void put( int key, int value ) {
        DoubleNode node;
        //replace case
        if ( cache.containsKey( key ) && cache.get( key ).val.getKey() == key ) {
            node = cache.get( key );
            node.val.setValue( value );
        }
        //capacity case
        else if ( capacity > 0 ) {
            node = new DoubleNode( key, value );
            cache.put( key, node );
            capacity--;
        }
        //in the event key doesn't exist we need evict
        else {
            //how the hell do we get the key for the evicted node (contains value only)
            //fuggit just let multiple HashMap Ks point to the wrong K in LL
            node = head;
            node.val = new AbstractMap.SimpleEntry<>( key, value );
            cache.put( key, node );
        }

        //in all cases we need node as the end since it was just accessed
        if ( end == null ) { //in the event we are putting a first element in
            head = node;
            end = node;
            return;
        }
        
        move_end( node );
    }
}
