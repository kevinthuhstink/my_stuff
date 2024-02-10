import java.util.*;

public class two_sumII {

    public int[] solve( int[] nums, int target ) {
        int p_lo = 0;
        int p_hi = 1;
        while ( nums[ p_lo ] + nums[ p_hi ] != target ) {
            if ( nums[ p_lo ] + nums[ p_hi ] < target ) {
                p_lo++;
                p_hi++;
            }
            else
                p_lo--;
        }
        int[] sol = { p_lo + 1, p_hi + 1 };
        return sol;
    }

    public static void main( String[] args ) {
        two_sumII attempt = new two_sumII();
        int[] params = { 2,3,4 };
        int target = 6;
        int[] test = attempt.solve( params, target );
        System.out.println( test[0] + " " + test[1] );
    }
}
