import java.util.*;

public class trap_water {

    /* observations
     * the trapped water represents a pyramid that fills the gaps of heights
     * until it touches the top of the height-array
     *
     * it's possible to represent the "filled" array with nums, and the total
     * trapped water is h_filled - height
     * using one pointer, it's possible to fill the array from either the left or right
     * and h_filled will equal the overlap between l_fill and r_fill
     *
     * water_container.java is this but simplified, slightly
     * the concept of moving the smaller pointer still stands
     */

    /* observations 2
     * because the water is dependent on surrounding heights,
     * two pointers should be started adjacent to each other
     * pointer right should progress until it finds a peak
     * a peak is a height where the next height is lower than the current one
     * use the dual pointers to rewrite the array h_filled
     * note that writing to h_filled always writes lower pointer
     * use the index pl to write to h_filled
     * backtrack to index max if there is a [localmax] != [truemax] case
     */

    /* sample run through on { 0,1,0,2,1,0,1,3,0,1,0,3 } = 9:
     * pointers on 0
     * write to h_filled[0] ( h_filled always takes pl since pl<pr )
     * move pr to 1, peak found
     * pr > pl, invoke backtracking ( no result )
     * write heights[pl] up to h_filled[pr]
     * fly pl to pr
     * move pr to 0 to 2, peak found
     * pr > pl, invoke backtracking ( no result )
     * write heights[pl] up to h_filled[pr]
     * move pr to 1 to 0 to 1 to 3, peak found
     * pr > pl, invoke backtracking ( no result )
     * write heights[pl] up to h_filled[pr]
     * 
     * 3 IS THE MAX HEIGHT OF THE ARRAY, NOW WE WRITE heights[pr] to h_filled because pr<pl
     *
     * move pr to 0 to 1, peak found
     * write heights[pr] up to h_filled[pr]
     * move pr to 0 to 3, END OF ARRAY
     * pr > pl, invoke backtracking to find a pl <= pr
     * write remaining heights to h_filled
     *
     * return the difference between h_filled and heights
     */

    /* sample run through on { 4,0,1,0,4,2,0,1,0,2 } = 16
     * pointers on 4
     * pl_max = 4
     * write 4 to h_filled[0]
     * move pr to 0 to 1, max found
     * write 1 up to h_filled[pr]
     * move pr to 0 to 4, max found
     * pr > pl, invoke backtracking to find a pl <= pr
     * pl found, rewriting lower to h_filled
     * move pr to 2 to 0 to 1, max found
     * write pr to h_filled[pr]
     * move pr to 0 to 2, max found, END OF ARRAY
     * pr > pl, invoke backtracking
     * pl found, rewriting lower
     * end of array
     *
     * return the differece
     */

    public void a_print( int[] a, String a_name ) {
        System.out.print( a_name + ": [ " );
        for ( int i : a )
            System.out.print( i + " " );
        System.out.println( "]" );
    }

    public int solve( int[] height ) {
        if ( height.length < 3 ) return 0;
        int[] h_filled = new int[ height.length ];
        int pl = 0;
        int pr = 0;
        a_print( height, "height" );

        //fill h_filled
        while ( pl != ( height.length - 1 ) ) {
            //find a peak of pr, make sure to stop when pr hits end of array or before peak
            //System.out.println( "finding the peak of pr" );
            while ( pr < height.length - 1 && height[ pr ] < height[ pr + 1 ] ) {
                h_filled[ pr ] = height[ pr ]; //incase we don't fill shit
                pr++;
                System.out.println( "moving pr to index " + pr + " containing " + height[ pr ] );
            }

            //if pr > pr-1, try to locate a higher left bound to reset filling
            if ( pr != 0 && height[ pr ] > height[ pr - 1 ] ) {
                int pl_backtrack = pl; //index represents the location where pl will return to
                while ( pl_backtrack >= 0 ) {
                    //but we must stop when the left bound is higher
                    if ( height[ pl_backtrack ] >= height[ pr ] ) {
                        pl = pl_backtrack;
                        break;
                    }
                    //some cases the right bound is higher, so set pl to the highest left bound
                    if ( height[ pl_backtrack ] > height[ pl ] ) {
                        System.out.println( "pl backtracked to " + pl + " with val " + height[ pl ] );
                        pl = pl_backtrack;
                    }
                    pl_backtrack--;
                }
            }

            //push pl to pr and write heights in
            int lower;
            if ( height[ pr ] > height[ pl ] ) lower = height[ pl ];
            else lower = height[ pr ];
            System.out.println( "PRE FILL: pl: " + pl + " pr: " + pr ); 
            //currently, pl is located at the height-wall element
            h_filled[ pl ] = height[ pl ];
            while ( pl != pr ) {
                pl++;
                if ( height[ pl ] <= lower ) //make sure we don't fill random 0s if we don't find a bound from the left
                    h_filled[ pl ] = lower; //required after pl++ because lower overwrites the height of the height element
                else h_filled[ pl ] = height[ pl ];
            }
            h_filled[ pr ] = height[ pr ];
            System.out.println( "moving pl to index " + pl + " containing " + height[ pl ] );
            a_print( h_filled, "h_filled" );
            System.out.println( "pl: " + pl + " pr: " + pr ); 
            System.out.println(); 
            pr++;
        }

        //subtract the two arrays and return the difference
        int sol = 0;
        for ( int i = 0; i < height.length; i++ )
            sol += h_filled[i] - height[i];
        return sol;
    }

    public static void main( String[] args ) {
        int[] param = { 0,1,2,0,3,0,1,2,0,0,4,2,1,2,5,0,1,2,0,2 };
        trap_water attempt = new trap_water();
        int test = attempt.solve( param );
        System.out.println( test );
    }
}
