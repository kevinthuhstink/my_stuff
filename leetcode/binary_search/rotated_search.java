public class rotated_search {
    /* rotated_search is super similar to rotated_min
     */
    public int solve( int[] nums, int target ) {
        //1. three indices pointers, lo/hi represent the bounds for the target
        //   m represents the current search item
        int p_lo = 0;
        int p_hi = nums.length - 1;
        int m = 0;
        //1a. fuck edge cases where p_ex is target or would've contained target
        if ( nums[ p_lo ] == target ) return p_lo;
        else if ( nums[ p_hi ] == target ) return p_hi;
        else if ( nums[ p_hi ] < target && nums[ p_lo ] > target ) return -1;

        //2. use binary search to wittle down the search range
        //   since we are having lo/hi take m, they will never cross
        //   since we check m for target, p_ex will never be target 
        while ( p_hi - p_lo > 1 ) {
            m = ( p_lo + p_hi ) / 2;
            /* 2a. rotated_search edit
             *     the conditional becomes the check for ranges that
             *     certainly cant contain target
             *     ex. 4 5 6 7 0 1 2 target = 6
             *     target certainly can't be within the range (7,2)
             */
            if ( nums[ m ] == target ) return m;
            //2b. four conditionals based on the location of min and target
            //    relative to pointers 
            if ( ( nums[ m ] < nums[ p_lo ] && //case 1: min is in range ( p_lo, m )
                 ( target < nums[ m ] || target > nums[ p_lo ] ) ) || //then target < m or target > p_lo
                 ( nums[ m ] > nums[ p_lo ] && //case 2: min is not in range
                 ( nums[ p_lo ] < target && target < nums[ m ] ) ) ) //then p_lo < target < m
                p_hi = m;
            else p_lo = m;
        }
        //3. check p_hi and p_lo themselves now that they are adjacent
        System.out.println( p_lo + " " + p_hi );
        if ( nums[ p_lo ] == target ) return p_lo;
        else if ( nums[ p_hi ] == target ) return p_hi;
        return -1;
    }
    public static void main( String[] args ) {
        rotated_search attempt = new rotated_search();
        //int[] params = { 10,2,3,4,5,6,7,8,9 };
        //int[] params = { 2,3,4,5,6,7,8,9,0 };
        //int[] params = { 2,3 };
        int[] params = { 4,5,6,7,0,1,2 };
        System.out.println( attempt.solve( params, 5 ) );
    }
}
