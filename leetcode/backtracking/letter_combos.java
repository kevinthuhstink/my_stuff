import java.util.*;
public class letter_combos {

	/* notes
	 */
	public List<String> solve( String digits ) {
		if ( digits.length() == 0 ) {
			List<String> _base = new ArrayList<>();
			return _base;
		}

		//call fxns in reverse order because order matters
		char curr = digits.charAt( digits.length() - 1 );
		List<String> prev = solve( digits.substring( 0, digits.length() - 1 ) );
		List<String> this_ans = new ArrayList<>();
		for ( int i = 0; i == 0 || i < prev.size(); i++ ) {
			String s;
			if ( prev.size() == 0 ) s = "";
			else s = prev.get( i );
			if ( curr == '2' ) {
				this_ans.add( s + "a" );
				this_ans.add( s + "b" );
				this_ans.add( s + "c" );
			}
			if ( curr == '3' ) {
				this_ans.add( s + "d" );
				this_ans.add( s + "e" );
				this_ans.add( s + "f" );
			}
			if ( curr == '4' ) {
				this_ans.add( s + "g" );
				this_ans.add( s + "h" );
				this_ans.add( s + "i" );
			}
			if ( curr == '5' ) {
				this_ans.add( s + "j" );
				this_ans.add( s + "k" );
				this_ans.add( s + "l" );
			}
			if ( curr == '6' ) {
				this_ans.add( s + "m" );
				this_ans.add( s + "n" );
				this_ans.add( s + "o" );
			}
			if ( curr == '7' ) {
				this_ans.add( s + "p" );
				this_ans.add( s + "q" );
				this_ans.add( s + "r" );
				this_ans.add( s + "s" );
			}
			if ( curr == '8' ) {
				this_ans.add( s + "t" );
				this_ans.add( s + "u" );
				this_ans.add( s + "v" );
			}
			if ( curr == '9' ) {
				this_ans.add( s + "w" );
				this_ans.add( s + "x" );
				this_ans.add( s + "y" );
				this_ans.add( s + "z" );
			}
		}
		return this_ans;
	}
}
