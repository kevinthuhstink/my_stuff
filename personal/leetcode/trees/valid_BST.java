public class valid_BST {
    //requires all nodes to the left to be less
    //and all nodes to the right to be more
    public boolean solve( TreeNode root ) {
        return solve_h( root.left, null, root.val ) && solve_h( root.right, root.val, null );
    }

    //limits the possible values of nodes down to a range within min and max
    //determined by if its the left or right child
    public boolean solve_h( TreeNode root, Integer min, Integer max ) {
        if ( root == null )
            return true;
        //we use null to represent a min or max that hasnt been set yet
        if ( min == null ) {
            if ( root.val >= max ) return false;
        }
        else if ( max == null ) {
            if ( root.val <= min ) return false;
        }
        else if ( root.val >= max || root.val <= min )
            return false;
        //the left children takes a new max
        //right children takes a new min
        return solve_h( root.left, min, root.val ) && solve_h( root.right, root.val, max );
    }
}
