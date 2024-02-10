import java.util.*;

public class longest_seq {

    public int solve( int[] nums ) {
        HashSet<Integer> nums_list = new HashSet<>();
        for ( int i : nums )
            nums_list.add( i );
        int max = 0;
        for ( Integer i : nums_list ) {
            int curr_max = 1;
            while ( nums_list.contains( i + 1 ) ) {
                curr_max++;
                i++;
            }
            if ( curr_max > max )
                max = curr_max;
        }
        return max;
    }

    public static void main( String[] args ) {
        longest_seq attempt = new longest_seq();
        int[] params = { 100,4,200,1,3,2 };
        int test = attempt.solve( params );
        System.out.println( test );
    }
}
