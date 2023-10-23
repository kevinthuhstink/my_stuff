import java.util.*;

public class f_largest_hist {

    /* the intended solution couldn't be found
     * using divide and conquer algorithm in its place
     *
     * area = h_shortest * ( i_final - i_initial + 1 )
     * 1. find the rectangle that spans the entire histogram
     * 2. divide the histogram into parts based on the shortest elements
     * 3. return the maximum of all the rectangles
     */

    /* base case: heights only contains one element
     * otherwise return area = h_shortest * ( i_final - i_initial + 1 )
     * and calculate the area of arrays cut by the smallest element
     */
    public int solve( int[] heights ) {
        int h_len = heights.length;
        System.out.println( "testing subarray " + Arrays.toString( heights ) );
        //base cases containing empty and len 1 arrays
        if ( h_len == 0 ) return 0;
        if ( h_len == 1 ) {
            return heights[0];
        }

        //grab the area of the array-span
        int min = (int) Math.pow( 10, 4 );
        for ( int i : heights )
            if ( i < min )
                min = i;
        int area = min * h_len;

        //grab the sub-arrays
        int prev_min = -1;
        for ( int i = 0; i <= h_len; i++ ) {
            if ( i == h_len || heights[i] == min ) {
                //off-case where the min is first element, no subarray
                if ( i == 0 ) {
                    prev_min = 0;
                    continue;
                }
                //off-case where the min is last element, no subarray
                if ( prev_min + 1 == h_len )
                    continue;

                System.out.println( "subarray indexes: " + ( prev_min + 1 ) + " " + i );
                int[] sub = Arrays.copyOfRange( heights, prev_min + 1, i );
                //cull the consecutive minimums
                while ( i < h_len - 1 && heights[ i + 1 ] == min )
                    i++;
                prev_min = i;
                int test_area = solve( sub );
                if ( test_area > area )
                    area = test_area;
            }
        }
        return area;
    }

    public static void main( String[] args ) {
        largest_hist attempt = new largest_hist();
        //int[] params = { 2,1,5,6,2,3 };
        //int[] params = { 2,4,1,1,4,3,1,6,1 };
        //int[] params = { 7,7,7,7,7,7 };
        //int[] params = { 8,7,9,5,3,6,4,7,4 };
        int[] params = new int[100];
        for ( int i = 0; i < 100; i++ )
            params[i] = 100 - i;
        System.out.println( attempt.solve( params ) );
    }
}
