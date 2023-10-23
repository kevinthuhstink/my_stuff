import java.util.Arrays;
import java.util.ArrayDeque;
public class window_max {

    /* observations
     * 1 <= nums.length <= 100_000
     * -10_000 <= nums[i] <= 10_000
     * 1 <= k <= nums.length
     *
     * suppose the max for this set of numbers is w_r
     * then it would be the max for k indexes
     * the index of sol is the same as the index of w_l
     *
     * all elements to the left of a max would be effectively gone
     * then consider the next max once the max has been max for k elements
     * a deque of indexes representing the incoming maxes for the window
     * remove when the max has run its course
     * pop when we have an incoming max
     * only push is necessary
     *
        //1. maxes contain the list of potential maxes for the window as it moves down the array
        //   the bottom of deque should be the current max
        //   remove it when the window is out of its range
        //   all elements above that should be strictly decreasing
        //   because those elements become the new botttom when the max is removed
     */
    public int[] solve( int[] nums, int k ) {
        int[] sol = new int[ nums.length - k + 1 ];
        if ( k == 1 ) return nums; //i don't feel like dealing with this edge case

        //the window is bounded by w_r inclusive and w_r - k exclusive
        //w_r starts adding elements at k - 1
        ArrayDeque<Integer> maxes = new ArrayDeque<>();
        //1. fill the deque with values from the first window
        //2. once w_r hits k-1 we can start filling in using deque bottom
        for ( int w_r = 0; w_r < nums.length; w_r++ ) {
            //ensure maxes is strictly decreasing so that we can keep picking up maxes for windows
            while ( !maxes.isEmpty() && nums[ maxes.peek() ] <= nums[w_r] ) {
                maxes.pop();
            }
            maxes.push( w_r );
            //the current max needs to leave once its k indexes behind w_r
            if ( maxes.peekLast() <= w_r - k )
                //System.out.println( "poll: " + maxes.pollLast() );
                maxes.pollLast();
            //System.out.println( maxes.peekLast() + " compare " + w_r );
            //insert the max into sol
            //we start adding in when w_r hits k-1 ( window is from 0 to k-1 == array of len k )
            if ( w_r >= k - 1 )
                sol[ w_r - k + 1 ] = nums[ maxes.peekLast() ];
            //System.out.println( maxes.toString() );
        }
        return sol;
    }

    public static void main( String[] args ) {
        window_max attempt = new window_max();
        int[] params1 = { 1,3,-1,-2,-1,5,4,3,4 };
        int paramk1 = 3;
        int[] params2 = { 5,1,-1,-2,-3,5,4,3,2 };
        int paramk2 = 6;
        System.out.println( Arrays.toString( attempt.solve( params1, paramk1 ) ) );
        System.out.println( Arrays.toString( attempt.solve( params2, paramk2 ) ) );
    }
}    
