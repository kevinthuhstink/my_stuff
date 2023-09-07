import java.util.*;

public class top_k_freq {

    public int[] solve( int[] nums, int k ) {
        HashMap<Integer, Integer> nums_bucket = new HashMap<>();
        //create buckets for each number and grab the nth highest buckets
        for ( int i : nums ) {
            nums_bucket.putIfAbsent( i, 0 );
            nums_bucket.replace( i, nums_bucket.get( i ) + 1 );
        }

        ArrayList<Integer> freq = new ArrayList<>( nums_bucket.values() );
        Collections.sort( freq );
        int[] sol_set = new int[k];
        int sol_i = 0;
        int kth_freq = freq.get( freq.size() - k ).intValue();
        for ( Map.Entry<Integer, Integer> entry : nums_bucket.entrySet() ) {
            System.out.println( "entry: " + entry.getKey() + " -> " + entry.getValue() );
            if ( entry.getValue() >= kth_freq ) {
                System.out.println( "going in: " + entry.getKey() );
                sol_set[ sol_i ] = entry.getKey();
                sol_i++;
            }
        }
        return sol_set;
    }

    public static void main( String[] args ) {
        top_k_freq attempt = new top_k_freq();
        int[] params = { 1,1,1,2,2,3,4,4,4,4 };
        int k = 2;
        int[] test = attempt.solve( params, k );
        for ( int i : test )
            System.out.print( i + " " );
        System.out.println( "]" );
    }
}
