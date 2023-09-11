//@a to run the [filename] macro
import java.util.Stack;

public class eval_rpn {

    public int solve( String[] tokens ) {
        String _OPS = "+-*/";
        Stack<Integer> eq_nums = new Stack<>();
        for ( String s : tokens ) {
            int op;
            //if pushing the integer value of s throws an exception,
            //then s must be an operator
            try { 
                eq_nums.push( Integer.valueOf( s ) );
            }
            catch ( NumberFormatException e ) {
            //operate on the pop values in the stack
            //0 +, 1 -, 2 *, 3 /
            op = _OPS.indexOf( s.charAt( 0 ) );
            Integer n = eq_nums.pop();
            Integer m = eq_nums.pop();
            if ( op == 0 ) eq_nums.push( m + n );
            if ( op == 1 ) eq_nums.push( m - n );
            if ( op == 2 ) eq_nums.push( m * n );
            if ( op == 3 ) eq_nums.push( m / n );
            //System.out.println( "operated " + m + _OPS.charAt( op ) + n + " -> " + eq_nums.peek() );
            }
        }
        return eq_nums.pop();
    }

    public static void main( String[] args ) {
        eval_rpn attempt = new eval_rpn();
        String[] params = {"10","6","9","3","+","-11","*","/","*","17","+","5","+"};
        int test = attempt.solve( params );
        System.out.println( test );
    }
}
