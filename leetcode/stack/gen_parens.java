import java.util.Stack;
import java.util.ArrayList;

public class gen_parens {

    /* observation 1
     * whenever there are n open parentheses, filling in the rest with closed parentheses
     * will always result in a solution
     */

    public String[] solve( int n ) {
        ArrayList<String> sol_set = new ArrayList<String>();
        Stack<String> parens = new Stack<>();
        //track the number of open and closed parentheses to know
        //when to cut the next open parentheses in line
        int o_p = 0;
        int c_p = 0;

        while ( true ) {
            while ( o_p < n ) {
                parens.push( "(" );
                o_p++;
            }
            while ( c_p != o_p ) {
                parens.push( ")" );
                c_p++;
            }
            System.out.println( parens.toString() );

            //all closed and open parentheses have been added
            //insert unique solution
            String sol = new String();
            for ( String p : parens )
                sol = sol.concat( p );
            sol_set.add( sol );

            //keep cutting more layers of closed parens if cp==op
            String popped;
            while ( ( popped = parens.pop() ).equals( ")" ) || c_p + 1 >= o_p ) {
                if ( parens.empty() ) {
                    String[] sol_a = new String[ sol_set.size() ];
                    return sol_set.toArray( sol_a );
                }
                if ( popped.equals( ")" ) ) c_p--;
                else o_p--;
            }
            o_p--;
            if ( parens.empty() ) break;
            parens.push( ")" );
            c_p++;

            System.out.println( "END OF WHILE LOOP, stack = " + parens.toString() );
        }
        String[] sol = new String[1];
        sol[0] = "PARENS TERMINATION FAILURE";
        return sol;
    }

    public static void main( String[] args ) {
        gen_parens attempt = new gen_parens();
        String[] test = attempt.solve( 4 );
        for ( String s : test ) 
            System.out.println( s );
    }
}
