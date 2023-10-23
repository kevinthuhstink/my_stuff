import java.util.List;
import java.util.ArrayList;
public class right_view {

    /* notes
     * the left side will be shown only if its longer than the right side
     * you can overwrite the left side with the right side
     */

    public List<Integer> solve( TreeNode root ) {
        List<Integer> vals = new ArrayList<>();
        solve_h( root, vals, 0 );
        return vals;
    }

    public void solve_h( TreeNode root, List<Integer> vals, int depth ) {
        if ( root == null )
            return;
        if ( depth >= vals.size() )
            vals.add( root.val );
        else
            vals.set( depth, root.val );
        solve_h( root.left, vals, depth + 1 );
        //since we traversed left first the right nodes will overwrite the left nodes
        //either way we end up traversing the whole tree anyways
        solve_h( root.right, vals, depth + 1 );
    }
}
