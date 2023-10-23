public class group_reverse {
    
    /* notes
     * reverse the order of every k nodes in the group
     * 1 <= k <= len <= 5_000
     * 0 <= val <= 1_000
     *
     * in order to reverse the nodes in linear time
     * we require a list of the nodes in the k-group
     * and then in that list we string the nodes from the end to the front
     *
     * sample trace for k = 2
     * 1 -> 3 -> 2 -> 4 -> 5
     * front_tracer and back_tracer at 1
     * k_group puts 1 @ 0
     * front_tracer at 3
     * k_group puts 3 @ 1
     * tracer = k = 2
     *
     * 
     */
    
    public ListNode solve( ListNode head, int k ) {
        ListNode seed = new ListNode();
        //front tracer walks down k nodes
        //back tracer exists to make sure we can return the remainder of the list if our end < k
        ListNode front_tracer = head, back_tracer = front_tracer, walk = seed;
        ListNode[] k_group = new ListNode[k];
        int tracer = 0;

        while ( front_tracer != null ) {
            //1. insert the k-group into the list tracking those nodes
            if ( tracer < k ) {
                k_group[tracer] = front_tracer; //insert node into list
                front_tracer = front_tracer.next;
                tracer++;
            }

            //2. when the k-group is full, start from the end and string it down to 0
            //   insert the end-head into our solution list
            if ( tracer == k ) {
                back_tracer = front_tracer;
                for ( int i = k - 1; i >= 0; i-- ) {
                    walk.next = k_group[i];
                    walk = walk.next;
                }
		tracer = 0;
            }
        }
        //3. cycle until front_tracer hits null,
        //   then add whatever remains to the solution list
        walk.next = back_tracer;
        return seed.next;
    }
}
