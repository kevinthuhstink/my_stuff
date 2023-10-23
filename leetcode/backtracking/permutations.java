import java.util.*;
import java.util.stream.*;
public class permutations {
    public List<List<Integer>> solve( int[] nums ) {
        if ( nums.length == 0 ) {
            List<List<Integer>> list = new ArrayList<>();
            list.add( new ArrayList<Integer>() );
            return list;
        }

        int size = nums.length;
        List<List<Integer>> ret = new ArrayList<>();
        //all elements get to be first in line with permutations
        for ( int i = 0; i < size; i++ ) {
            int first = nums[i];
            int[] cut = Arrays.copyOfRange( nums, 0, i );
            int[] other_half = Arrays.copyOfRange( nums, i+1, size );

            //horribly complicated concat
            int[] cat = IntStream.concat(Arrays.stream(cut), Arrays.stream(other_half)).toArray();
            List<List<Integer>> next = solve( cat );
            for ( List<Integer> add : next )
                add.add( first );
            ret.addAll( next );
        }
        return ret;
    }
}
