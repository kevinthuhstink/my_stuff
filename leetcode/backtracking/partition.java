import java.util.*;
public class partition {
	
	 /* notes
	  * each palindrome has sub-palindromes
	  * for example baab has
	  * { baab }
	  * { b,aa,b }
	  * { b,a,a,b }
	  * only add a solution into the solution set if str _in is a pal
	  * "cacbaab" is the possibilities of "cac" convoluted on "baab"
	  * { cac } { c,a,c }
	  * operated on
	  * { baab } { b,aa,b } { b,a,a,b }
	  */
	public List<List<String>> solve( String s ) {
		List<List<String>> ans = new ArrayList<>();
		solve_h( s, new ArrayList<String>(), ans );
		return ans;
	}

	public void solve_h( String s, List<String> curr, List<List<String>> ans ) {
		if ( s.length() == 0 ) {
			ans.add( curr );
			return;
		}

		int len = s.length();
		for ( int i = 1; i <= len; i++ ) {
			String sub = s.substring( 0, i );
			if ( check( sub ) ) { 
				//watch for final partition when i = len
				int sublen = sub.length();
				String next;
				if ( i == len ) next = "";
				else next = s.substring( i + 1, len );
				//we need new fxn calls for each way to partitio sub
				//all palindromes are double counted
				//because of "b b" and "bb" from [bb], "aba" and "a b a" from [aba]
				//and "b b" from [b,b], "a b a" from [a b a]
				//for ( int j = 0; j == 0 || j <= sublen / 2 - 1; j++ ) {
				List<String> parts = new ArrayList<>( curr );
				parts.add( sub );
				solve_h( next, parts, ans );
				//}
			}
		}
		return;
	}

	//get the possible partitions for one single palindrome
	//creates j partitions and leaves the rest alone

	/* this entire function was useless.
	 * the recursive calls on solve_h would hit every palindrome
	 * even without partitioning the already existing palindromes
	 * because each 1 length string is already a palindrome, so it calls solve_h again
	 * so the for loop would catach all palindromes, working from each char as a new starting point
	 * which means there's no need for sub-partitioning 
	 */
	public List<String> _partition( String s, int j ) {
		List<String> parts = new ArrayList<>();
		for ( int i = 0; i < j; i++ )
			//add up to j chars as individual strings
			parts.add( s.substring( i, i + 1 ) );
		if ( j != s.length() - j ) //no empty strs pls
			parts.add( s.substring( j, s.length() - j ) );
		j = s.length() - j;
		for ( int i = j; i < s.length(); i++ )
			parts.add( s.substring( i, i + 1 ) );
		return parts;
	}

	public boolean check( String s ) {
		int len = s.length();
		for ( int i = 0; i < len / 2; i++ ) {
			if ( s.charAt( i ) != s.charAt( len - 1 - i ) )
				return false;
		}
		return true;
	}

	public static void main( String[] args ) {
		partition attempt = new partition();	
		//String pal = "abacaba";
		//String pal = "aa";
		String pal = "b";
		for ( int j = 0; j <= pal.length() / 2; j++ ) {
			List<String> parts = attempt._partition( pal, j );
			for ( String s : parts )
				System.out.print( s + " " );
			System.out.println();
		}
	}
}
