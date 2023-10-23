import java.util.*;
public class subsets {
    public List<List<Integer>> solve( int nums[] ) {
        if ( nums.length == 0 ) {
            List<List<Integer>> list = new ArrayList<>();
            list.add( new ArrayList<>() );
            return list;
        }
        //tree down the possibilities
        //1 exists and 1 doesnt exist
        //and for each option it branches into n exists and n doesnt
        List<List<Integer>> exists = solve( Arrays.copyOfRange( nums, 1, nums.length ) );
        for ( List<Integer> make_exist : exists )
            make_exist.add( nums[0] );
        List<List<Integer>> doesnt = solve( Arrays.copyOfRange( nums, 1, nums.length ) );
        exists.addAll( doesnt );
        return exists;
    }
}
