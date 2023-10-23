import java.util.*;

public class daily_temp {

    /* solve daily temperatures
     *
     * 1. start from the back of temps 
     *    sol[maximum warm day] = 0
     *      //any "true max" as seen from the back will equal 0 since
     *      //there is no more day warmer than it
     *
     * 2. find the next day warmer than it by popping off everything in the stack
     *    until we find a day warmer than it,
     *    then push the day to the stack
     *
     *    if the stack gets full cleared, day is a new "true max" and log a 0
     *
     * 3. repeat until we hit the top of the array
     */

    public int[] solve( int[] temperatures ) {
        int[] sol = new int[ temperatures.length ];
        Stack<Integer> max_index = new Stack<>();
        /* day_i is the index of the current day we're testing
         * max_i is the index of the next warmest days, or the top of the stack
         * the stack contains all of the warmest days up until the maximum we've found
         */

        for ( int day_i = temperatures.length - 1; day_i >= 0; day_i-- ) {
            //now look for the day warmer than current day
            while ( !max_index.empty() && temperatures[ max_index.peek() ] <= temperatures[ day_i ] )
                max_index.pop();
            if ( max_index.empty() ) sol[ day_i ] = 0;
            else {
                int max_i = max_index.peek();
                sol[ day_i ] = max_i - day_i;
            }
            max_index.push( day_i );
        }
        return sol;
    }

    public static void main( String[] args ) {
        daily_temp attempt = new daily_temp();
        int[] params = { 89,62,70,58,47,47,46,76,100,70 };
        int[] test = attempt.solve( params );
        for ( int i : test )
            System.out.print( i + " " );
        System.out.println();
    }
}
