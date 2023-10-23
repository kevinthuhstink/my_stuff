public class lowest_common_ancestor {
    /* since root represents a binary search tree,
     * if p > root > q then root must be their lowest common ancestor
     * otherwise if both p and q are on one side of the root
     * then the lowest common ancestor is somewhere on that side of the root
     */
    public TreeNode solve( TreeNode root, TreeNode p, TreeNode q ) {
        //if either p or q is equal to root then thats the lca
        if ( p.val == root.val || q.val == root.val )
            return root;
        if ( ( p.val < root.val && root.val < q.val ) || //check if root is between p and q
             ( q.val < root.val && root.val < p.val ) )
            return root;
        //otherwise p and q are both on one side of root
        if ( p.val < root.val )
            return solve( root.left, p, q );
        return solve( root.right, p, q );
    }
}
