import java.util.*;

public class water_container {

    public int solve( int[] height ) {
        int sol = 0;
        int p_lo = 0;
        int p_hi = height.length - 1;
        //move the smaller pointer
        while ( p_lo != p_hi ) {
            System.out.println( "comparing " + height[ p_lo ] + " and " + height[ p_hi ] );
            int lower;
            if ( height[ p_lo ] < height[ p_hi ] ) {
                lower = height[ p_lo ];
                p_lo++;
            }
            else {
                lower = height[ p_hi ];
                p_hi--;
            }
            int area = lower * ( p_hi - p_lo + 1 );
            if ( area > sol ) sol = area;
            System.out.println( "sol is " + sol );
        }
        return sol;
    }

    public static void main( String[] args ) {
        water_container attempt = new water_container();
        int[] params = { 1,1 };
        int test = attempt.solve( params );
        System.out.println( test );
    }
}
