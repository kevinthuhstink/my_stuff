import java.util.Stack;

public class parentheses {

    public boolean solve( String s ) {
        String _OPEN = "([{";
        String _CLOSE = ")]}";
        Stack<Character> s_stack = new Stack<>();
        for ( char c : s.toCharArray() ) {
            if ( _OPEN.indexOf( c ) > -1 )
                s_stack.push( c );
            else if ( s_stack.empty() || _OPEN.indexOf( s_stack.pop() ) != _CLOSE.indexOf( c ) )
                return false;
        }
        if ( s_stack.empty() )
            return true;
        return false;
    }

    public static void main( String[] args ) {
        parentheses attempt = new parentheses();
        String params = "()[]{()}";
        System.out.println( attempt.solve( params ) );
    }
}
