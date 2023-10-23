import java.util.ArrayList;
import java.util.List;
public class level_order {

    /* notes
     * [0] corresponds to layer 1
     * grab the node vals in that layer and put them in the solution list
     * move the layer down and the list layer up
     */
    //adds a node value to the list
    public void insert_val( TreeNode root, List<List<Integer>> vals, int val_index ) {
        if ( vals.size() <= val_index )
            vals.add( new ArrayList<Integer>() );
        vals.get( val_index ).add( root.val );
    }

    public List<List<Integer>> solve( TreeNode root ) {
        List<List<Integer>> vals = new ArrayList<>();
        solve_h( root, vals, 0 );
        return vals;
    }

    public void solve_h( TreeNode root, List<List<Integer>> vals, int layer ) {
        if ( root == null )
            return;
        insert_val( root, vals, layer );
        solve_h( root.left, vals, layer + 1 );
        solve_h( root.right, vals, layer + 1 );
    }
}
