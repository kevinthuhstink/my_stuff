public class invert_tree {
    public TreeNode solve( TreeNode root ) {
        if ( root == null )
            return root;
        TreeNode holder = root.right;
        root.right = root.left;
        root.left = holder;
        solve( root.left );
        solve( root.right );
        return root;
    }
}
