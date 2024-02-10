import java.util.*;

public class search_2d {

    /* binary search through the first element of every subarray
     * grab the index of the greatest element less than target
     *
     * then run standard binary search through the array
     */
    public boolean solve( int[][] matrix, int target ) {

        //find which subarray
        int i_sub = 0;
        int p_hi = matrix.length - 1;
        int p_lo = 0;
        //make sure the two shits don't cross
        while ( p_hi - p_lo > 1 ) { 
            i_sub = ( p_hi - p_lo ) / 2 + p_lo;
            if ( matrix[ i_sub ][0] == target ) return true;
            else if ( target < matrix[ i_sub ][0] ) p_hi = i_sub;
            else p_lo = i_sub;
        }
        //array is either in p_hi or p_lo
        if ( target <= matrix[ p_hi ][0] ) i_sub = p_hi;
        else i_sub = p_lo;
        //System.out.println( "checking array no." + i_sub );
        //System.out.println( "hi - lo: " + p_hi + " " + p_lo );

        int[] arr_tar = matrix[ i_sub ];
        int index = 0;
        p_hi = arr_tar.length - 1;
        p_lo = 0;
        while ( p_hi >= p_lo ) {
            index = ( p_hi - p_lo ) / 2 + p_lo;
            if ( arr_tar[ index ] == target ) return true;
            else if ( target < arr_tar[ index ] ) p_hi = index - 1;
            else p_lo = index + 1;
        } 
        return false;
    }

    public static void main( String[] args ) {
        //int[][] params = { {1,3,5,7}, {10,11,16,20}, {23,30,34,60} };
        int[][] params = { {1,3,5,7}, {10,11,16,20}, {23,30,34,60}, {100,200,300,400} };
        //int[][] params = { {1,3,5,7}, {10,11,16,20} };
        search_2d attempt = new search_2d();
        System.out.println( attempt.solve( params, 100 ) );
    }
}
