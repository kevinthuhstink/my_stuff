import java.util.HashMap;
import java.util.Stack;
public class k_lists {

    /* notes I FUCKING KILLED ITTTTTTTTT
     * 0 <= k <= 10_000
     * where k represents the valber of lists
     * 0 <= k.length <= 500
     * every list is sorted in ascending order
     * the max valber of ListNodes is 10_000
     *
     * EXPLANATION
     * instead of lists[] being a fixed scan on LL k,
     * lists[] is a "sliding ribbon" on k, bending around consecutive minimums
     * the indices of each LL k can be put in a HashMap<Stack>
     * where K node.val -> V Stack indices k
     * and we keep grabbing from the stack and replacing that LL index
     * into whatever the next node's val is
     *
     * if we track the min as the smallest key corresponding to a stack
     * and max as the literal max of lists[]
     * when K max -> V Stack is empty,
     * the list has been completed
     */

    public ListNode solve( ListNode[] lists ) {
        if ( lists.length == 0 ) return null;
        ListNode seed = new ListNode(), walk = seed;
        int min = 10000, max = -10000, nodes = lists.length;
        //1. setup StackMap, first pass of min/max, put in our ks
        HashMap<Integer, Stack<Integer>> list_vals = new HashMap<>();
        for ( int k = 0; k < nodes; k++ ) {
            //skip empty ks
            if ( lists[k] == null ) continue;
            int val = lists[k].val;
            if ( val < min ) min = val;
            if ( val > max ) max = val;
            //K val -> V Stack<indices>
            list_vals.putIfAbsent( val, new Stack<Integer>() );
            Stack<Integer> k_stack = list_vals.get( val );
            k_stack.push( k );
        }
        //System.out.println( min + " " + max );
        if ( !list_vals.containsKey( max ) )
            return null; //what the fuck do you mean all the lists were null

        //2. loop elements until max Stack is empty
        while ( !list_vals.get( max ).empty() ) {
            //min might not point to anything useful
            //due to my half assed min updating system
            while ( !list_vals.containsKey( min ) )
                min++;
            //3. push lists[k] into the solution LL
            Stack<Integer> min_stack = list_vals.get( min );
            //k represents one of the min value nodes of lists[]
            int k = min_stack.pop(); 
            walk.next = lists[k];
            walk = walk.next;
            lists[k] = lists[k].next;
            
            //4. cycle new lists[k] back into a new stack
            //   unfortunately lists[k] might be null now
            //   in that case k doesn't exist in the stacks anymore
            if ( lists[k] != null ) { 
                int val = lists[k].val;
                //update max if val is the new max
                if ( val > max ) max = val;
                list_vals.putIfAbsent( val, new Stack<Integer>() );
                Stack<Integer> k_stack = list_vals.get( val );
                k_stack.push( k );
            }
            //update min if our stack is empty after cycling k
            if ( min_stack.empty() )
                min++; //literally the easiest way tbh
        }

        return seed.next;
    }
}
