import java.util.Arrays;

public class binary_search {
    
    public int solve( int[] nums, int target ) {
        int index;
        int p_hi = nums.length - 1;
        int p_lo = 0;
        while ( p_hi >= p_lo ) {
            index = ( p_hi - p_lo ) / 2 + p_lo;
            if ( nums[ index ] == target ) return index;
            else if ( target < nums[ index ] ) p_hi = index - 1;
            else p_lo = index + 1;
        }
        return -1;
    }
}
