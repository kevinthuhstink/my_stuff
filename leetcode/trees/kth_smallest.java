public class kth_smallest {

    //returns the number of nodes in the tree 
    public int num_nodes( TreeNode root ) {
        if ( root == null )
            return 0;
        return 1 + num_nodes( root.right ) + num_nodes( root.left );
    }

    //locate the node with k-1 elements to the left
    //basically binary search but trash
    public int solve( TreeNode root, int k ) {
        int l_size = num_nodes( root.left );
        if ( l_size == k - 1 )
            return root.val;

        if ( l_size > k - 1 )
            return solve( root.left, k );
        //we know we have to push down the right,
        //and we can reduce k by the number of nodes
        //on the left and the root node since we know
        //the kth node isn't contained within the left
        return solve( root.right, k - l_size - 1 );
    }
}
