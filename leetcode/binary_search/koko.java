public class koko {
    //3.
    //helper function to calculate hours to consume the list of piles
    //at the predetermined rate test_sol bananas per hour
    public int helper( int piles[], int test_sol ) {
        int hours = 0;
        //int and double overflow is craaazy
        for ( int i : piles ) hours += (int) Math.ceil( (double) i / test_sol );
        return hours;
    }

    public int groupie( int piles[], int k ) {
        //1. find the possible range of solutions,
        //   a[len - 1] >= sol >= sum( a )/k
        //   p_lo >= sol >= p_hi
        int sum = 0;
        int max = 0;
        for ( int i : piles ) {
            sum += i;
            if ( i > max ) max = i;
        }
        int p_lo = (int) Math.floor( (float) sum / k );
        //check in case we get dumb values for summing piles
        p_lo = Math.max( 1, p_lo );
        int p_hi = max;
        int sol = p_hi;

        //2. iterate through valid solutions by using binary search through the range
        while ( p_lo < p_hi ) {
            sol = ( p_lo + p_hi ) / 2;
            System.out.println( "p_lo , sol , p_hi : " + p_lo + " " + sol + " " + p_hi );
            int test_sol;
            //we don't return sol immediately to avoid a false positive
            //ie. hours = piles.length + 1
            //and the solution is the second highest value in piles,
            //any value between true solution and max value is a false positive
            if ( ( test_sol = helper( piles, sol ) ) <= k ) p_hi = sol; //gradually pull p_hi toward the true solution
            //else if ( test_sol < k ) p_hi = sol - 1;
            else p_lo = sol + 1;
            System.out.println( "test_sol : " + test_sol );
        }
        //reset sol once p_lo and p_hi have converged
        System.out.println( "p_lo , sol , p_hi : " + p_lo + " " + sol + " " + p_hi );
        sol = p_lo;
        return Math.max( sol, 1 );
    }

    public static void main( String[] args ) {
        koko attempt = new koko();        
        //int[] params = { 4,11,20,23,70 };
        //int[] params = { 4,11,20,23,2 };
        //int[] params = { 30,11,23,4,20 };
        //int[] params = { 14,15 };
        //int[] params = { 980628391,681530205,734313996,168632541 };
        int[] params = { 1000000000,1000000000 };
        System.out.println( attempt.groupie( params, 3 ) );
    }
}
