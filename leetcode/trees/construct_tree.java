import java.util.Arrays;
public class construct_tree {
    /* notes
     * the farthest left node is inorder[0]
     * the farthest right node is the same
     * the preorder list tells us which nodes we add,
     * the inorder list tells us where they are
     *
     * keep adding nodes to the left until it equals inorder
     * then add one to the right
     */
    public TreeNode solve( int[] preorder, int[] inorder ) {
        if ( preorder.length == 0 ) return null;
        TreeNode root = new TreeNode( preorder[0] );

        int[] cut_preorder, cut_inorder;
        //check if our node is the last in the left side
        //if it is we skip the left side stuff
        if ( preorder[0] == inorder[0] ) {
            cut_preorder = Arrays.copyOfRange( preorder, 1, preorder.length );
            //constructs the entire left side of the (sub)tree
            root.left = solve( cut_preorder, inorder );
        }

        //we need to cut the entire left + root of preorder/postorder to prep the right
        //first cut inorder up to root+1
        //then cut preorder up to whatever index inorder got cut to
        //( since the complete left sides will always have the same index )
        int find_inorder = 0, find_preorder = 0;
        while ( inorder[find_inorder] != root.val )
            find_inorder++;
        find_inorder++;
        //could be possible the entire thing was left side (root.val is the farthest right)
        if ( find_inorder == inorder.length )
            return null;

        cut_inorder = Arrays.copyOfRange( inorder, find_inorder, inorder.length );
        cut_preorder = Arrays.copyOfRange( preorder, find_inorder, preorder.length );
        //also possible is that right is null as well
        //what that looks like is the lists is inorder[0] doesnt exist in preorder
        //cause we already placed it in a previous step
        for ( int null_rcheck : cut_preorder ) {
            if ( null_rcheck == cut_preorder[0] ) {
                root.right = solve( cut_preorder, cut_inorder );
                return root;
            }
        }
        return root;
    }
}
