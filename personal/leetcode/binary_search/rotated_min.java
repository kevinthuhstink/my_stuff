public class rotated_min {
    public int solve( int[] nums ) {
        //1. three indices pointers, lo/hi represent the bounds for the minimum
        //   m represents the current search item
        int p_lo = 0;
        int p_hi = nums.length - 1;
        int m = 0;
        //1a. fuck edge cases where p_ex is min
        if ( nums.length == 1 ) return nums[0];
        if ( nums[ p_lo ] < nums[ p_hi ] ) return nums[ p_lo ];
        if ( nums[ p_hi ] < nums[ p_hi - 1 ] ) return nums[ p_hi ];

        //2. use binary search to wittle down the search range
        //   since we are having lo/hi take m, they will never cross
        while ( p_hi - p_lo > 1 ) {
            m = ( p_lo + p_hi ) / 2;
            if ( nums[ m ] < nums[ m - 1 ] ) return nums[ m ];
            else if ( nums[ m ] < nums[ p_hi ] ) p_hi = m;
            else p_lo = m;
        }
        //3. precision (usually we end before step 3)
        //m = Math.min( nums[ p_hi ], nums[ p_lo ] );
        System.out.println( p_lo + " " + p_hi );
        return nums[ m ];
    }
    public static void main( String[] args ) {
        rotated_min attempt = new rotated_min();
        int[] params = { 10,2,3,4,5,6,7,8,9 };
        System.out.println( attempt.solve( params ) );
    }
}
