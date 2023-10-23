public class max_path {
    
    /* notes
     * 1 <= nodes <= 30_000
     *
     * if you have a node, you can only move in one of two directions:
     * down to the left
     * down to the right
     * up to the root
     *
     * for the first node in our sequence there are three,
     * but for every node after that there are two
     * because we used one path into the node to get there
     *
     * since we are given the root,
     * instead the directions change
     * the root is allowed to move in both directions
     * while all nodes under it can only move in one
     *
     * our strategy must be useit/loseit
     * for any tree,
     * there must contain a subtree with the true max sum
     * the current node reveals nothing about its subtrees
     * we may need to treat all nodes in the tree as the root
     * and calc max path through all of them
     */

    //gives the "max" value of a subtree 
    //note that we can only walk one path down the left or right
    int subtree_max( TreeNode root ) {
        if ( root == null ) return Integer.MIN_VALUE;
        if ( root.left == null && root.right == null ) return root.val;
        int l_sum = subtree_max( root.left ), r_sum = subtree_max( root.right ), curr = root.val;
        if ( root.right == null )
            return Math.max( curr, curr + l_sum );
        if ( root.left == null )
            return Math.max( curr, curr + r_sum );
        
        //choose a path or drop the path entirely
        if ( curr + l_sum < curr && curr + r_sum < curr )
           return curr; //drop paths
        return Math.max( curr + l_sum, curr + r_sum );
    }

    //this method treats every node as the root and spits out its maxvalue
    //we may run into TLE O(n^2) but since we only have 30k nodes we might not
    public int solve( TreeNode root ) {
        if ( root == null ) return Integer.MIN_VALUE;
        //calc the max for itself 
        //technically different from subtree_max cause we can decide to incorporate both paths
        int l_sum = subtree_max( root.left ), r_sum = subtree_max( root.right ), curr = root.val, max;
        //choose one, both, or drop
        if ( curr + l_sum < curr && curr + r_sum < curr )
           max = curr; //drop both
        else if ( l_sum < 0 )
            max = curr + r_sum; //drop l
        else if ( r_sum < 0 )
            max = curr + l_sum; //drop r
        else
            max = curr + l_sum + r_sum; //use both

        int l_max = solve( root.left ), r_max = solve( root.right );
        if ( max > l_max && max > r_max )
            return max; //set this as the new max path
        return Math.max( l_max, r_max );
    }
}
