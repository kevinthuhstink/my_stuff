import java.util.*;
public class combination_sum {
    public List<List<Integer>> solve( int[] candidates, int target ) {
        return solve_h( candidates, new ArrayList<Integer>(), 0, target );
    }

    public List<List<Integer>> solve_h( int[] candidates, ArrayList<Integer> curr, int sum, int target ) {
        if ( candidates.length == 0 ) {
            List<List<Integer>> list = new ArrayList<>();
            return list;
        }
        
        int _this = candidates[0], size = candidates.length;
        if ( sum + _this == target ) { //solution found, add to what we have
            List<List<Integer>> add_s = solve_h( Arrays.copyOfRange( candidates, 1, size ), curr, sum, target );
            List<Integer> sol = new ArrayList<>( curr );
            sol.add( _this );
            add_s.add( sol );
            return add_s;
        }

        if ( sum + _this > target )
            return solve_h( Arrays.copyOfRange( candidates, 1, size ), curr, sum, target );
        List<List<Integer>> next = solve_h( Arrays.copyOfRange( candidates, 1, size ), curr, sum, target );
        ArrayList<Integer> using = new ArrayList<>( curr ); //unfortunately java is pass by reference-value
        using.add( _this );
        List<List<Integer>> use = solve_h( candidates, using, sum + _this, target );
        
        use.addAll( next );
        return use;
    }
}
