import java.util.*;

public class three_sum {

    /*
    private void add_sol( int x, int y, int z, List<List<Integer>> sol_set ) {
        List<Integer> sol = new ArrayList<>();
        sol.add( x );
        sol.add( y );
        sol.add( z );
        sol_set.add( sol );
    }
    */

    //true solution: each "dependency" requires one pointer to properly search throughly
    //having only two pointers causes doubles to be counted twice
    //a third allows you to skip all duplicate elements because that third pointer will
    //eventually get there
    public List<List<Integer>> solve(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();

        // Sort the array
        Arrays.sort(nums);

        for (int i = 0; i < nums.length - 2; i++) {
            // Skip duplicate elements for i
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }

            int j = i + 1;
            int k = nums.length - 1;

            while (j < k) {
                int sum = nums[i] + nums[j] + nums[k];

                if (sum == 0) {
                    // Found a triplet with zero sum
                    ans.add(Arrays.asList(nums[i], nums[j], nums[k]));

                    // Skip duplicate elements for j
                    while (j < k && nums[j] == nums[j + 1]) {
                        j++;
                    }

                    // Skip duplicate elements for k
                    while (j < k && nums[k] == nums[k - 1]) {
                        k--;
                    }

                    // Move the pointers
                    j++;
                    k--;
                } else if (sum < 0) {
                    // Sum is less than zero, increment j to increase the sum
                    j++;
                } else {
                    // Sum is greater than zero, decrement k to decrease the sum
                    k--;
                }
            }
        }
        return ans;
    }
    /* FAILED 3SUM ATTEMPT
     * Arrays.asList(): converts a list of params into a List
     public List<List<Integer>> solve( int[] nums ) {
     List<List<Integer>> sol_set = new ArrayList<>();

    /* kevin's convoluted system to remove annoying doubles from the input
     * put all values into a hashtable where <K> num -> <V> freqency
     * put all unique values into a hashset to be used in the two pointer section
     *
     * if occurences > 1 && value * -2 exists in the set,
     * or if Map.Entry<0, 3> exists
     * put them in the solution set
     *
     HashSet<Integer> reduce = new HashSet<>();
     Hashtable<Integer, Integer> occurences = new Hashtable<>();
     for ( int i : nums ) {
     reduce.add( i );
     occurences.putIfAbsent( i, 0 );
     occurences.replace( i, occurences.get( i ) + 1 );
     }

    //sift through the hashtable to find all doubles
    for ( Map.Entry<Integer, Integer> entry : occurences.entrySet() )
    if ( entry.getValue() > 1 && reduce.contains( entry.getKey() * -2 ) && entry.getKey() != 0 )
    add_sol( entry.getKey(), entry.getKey(), entry.getKey() * -2, sol_set );
    if ( occurences.containsKey( 0 ) && occurences.get( 0 ) > 2 )
    add_sol( 0,0,0, sol_set );

    //grab the int array from the HashSet
    int[] nums_reduce = reduce.stream().mapToInt(Number::intValue).toArray();
    Arrays.sort( nums_reduce );
    for ( int i : nums_reduce ) System.out.print( i + " " );
    System.out.println( "] <- nums_reduce" );

    two pointer section
     * the two pointers "require" ([req]) a third to make zero
     * if a zero is found then move the pointer matching [req]
     * if [req] == 0 move both
     *
     * if no zero is found move the opposite
     int p_lo = 0;
     int p_hi = nums_reduce.length - 1;
     while ( ( p_hi - p_lo ) > 1 ) {
     int req = 0 - nums_reduce[ p_hi ] - nums_reduce[ p_lo ];
     System.out.println( "triplet req p_hi p_lo: " + req + nums_reduce[ p_hi ] + nums_reduce[ p_lo ] );
     System.out.println( "indexes p_hi p_lo: " + p_hi + p_lo );
     for ( int i = p_lo + 1; i < p_hi; i++ ) {
     if ( nums_reduce[i] == req ) {
     add_sol( req, nums_reduce[ p_hi ], nums_reduce[ p_lo ], sol_set );
     break;
     }
     }

    //pointer setting
    if ( req >= 0 ) p_lo++; 
    else p_hi--;
     }
     return sol_set;
     }
     */

    public static void main( String[] args ) {
        three_sum attempt = new three_sum();
        int[] params = {  -1,0,1,2,-1,-4,-2,-3,3,0,4};
        List<List<Integer>> test = attempt.solve( params );
        for ( List<Integer> sol : test ) {
            System.out.print( "[ " );
            for ( Integer i : sol )
                System.out.print( i + " " );
            System.out.print( "]" );
        }
        System.out.println();
    }
}

