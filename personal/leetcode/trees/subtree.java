public class subtree {

    public boolean check_same(TreeNode p, TreeNode q) {
        if ( p == null && q == null )
            return true;
        if ( p == null || q == null )
            return false;
        boolean test = p.val == q.val;
        return test && check_same( p.left, q.left ) && check_same( p.right, q.right );
    }

    public boolean solve( TreeNode root, TreeNode subroot ) {
        if ( root == null && subroot == null )
            return true;
        if ( root == null || subroot == null )
            return false;
        if ( root.val != subroot.val )
            return solve( root.left, subroot ) || solve( root.right, subroot );
	//root.val == subroot.val
        return check_same( root, subroot ) ||
	       solve( root.left, subroot ) || solve( root.right, subroot );
    }
}
