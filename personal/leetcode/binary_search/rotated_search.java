public class rotated_search {
    /* rotated_search is super similar to rotated_min
     */
    public boolean solve( int[] nums, int target ) {
        //1. three indices pointers, lo/hi represent the bounds for the target
        //   m represents the current search item
        int p_lo = 0;
        int p_hi = nums.length - 1;
        int m = 0;
        //1a. fuck edge cases where p_ex is target or would've contained target
        if ( nums[ p_lo ] == target ) return true;
        else if ( nums[ p_hi ] == target ) return true;
        else if ( nums[ p_hi ] < target && nums[ p_lo ] > target ) return false;

        //2. use binary search to wittle down the search range
        //   since we are having lo/hi take m, they will never cross
        while ( p_hi - p_lo > 1 ) {
            m = ( p_lo + p_hi ) / 2;
            /* 2a. rotated_search edit
             * the conditional becomes the check for ranges that
             * certainly cant contain target
             * ex. 4 5 6 7 0 1 2 target = 6
             * target certainly can't be within the range (7,2)
             */
            if ( nums[ m ] < nums[ m - 1 ] ) return true;
            else if ( nums[ m ] < nums[ p_hi ] ) p_hi = m;
            else p_lo = m;
        }
        //3. precision (usually we end before step 3)
        //m = Math.min( nums[ p_hi ], nums[ p_lo ] );
        System.out.println( p_lo + " " + p_hi );
        return false;
    }
    public static void main( String[] args ) {
        rotated_min attempt = new rotated_min();
        int[] params = { 10,2,3,4,5,6,7,8,9 };
        System.out.println( attempt.solve( params ) );
    }
}
