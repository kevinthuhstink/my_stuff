public class good_nodes {
    
    /* to track what a good node has to be we need the max
     * node min val is -10_000
     */
    public int solve( TreeNode root ) {
        return solve_h( root, -10001 );
    }
    public int solve_h( TreeNode root, int max ) {
        if ( root == null )
            return 0;
        if ( root.val < max )
            return solve_h( root.left, max ) + solve_h( root.right, max );
        return 1 + solve_h( root.left, root.val ) + solve_h( root.right, root.val );
    }
}
