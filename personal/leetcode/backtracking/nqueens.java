import java.util.*;
public class nqueens {

	public List<List<String>> solve( int n ) {
		List<String> _init = new ArrayList<>();
		for ( int i = 0; i < n; i++ ) {
			String rank = "";
			for ( int j = 0; j < n; j++ )
				//0 denotes an empty space
				//. denotes a "used" space
				rank = rank.concat( "0" );
			_init.add( rank );
		}
		//System.out.println( _init.toString() );
		List<List<String>> ans = new ArrayList<>();
		solve_h( _init, 0, ans );
		return ans; 
	}

	/* notes
	 * curr is the current board state
	 * each queen occupiees one row,
	 * so once row n-1 has a queen we have a solution
	 *
	 * the unique column the queen occupies on the first row
	 * will completely define the ending solution ( i think )
	 * so all rows need to run through all cols
	 */
	public void solve_h( List<String> curr, int row, List<List<String>> ans ) {
		if ( row == curr.size() ) { //queens have been placed in all rows
			List<String> sol = new ArrayList<>( curr );
			ans.add( sol );
			return;
		}

		String _row = curr.get( row );
		int n = _row.length();
		//when we place a queen, the entire row and col needs to set as '.'
		//keep adding queens into empty(0) squares
		//its not so easy to remove queens so we need the recursive system to do it for us

		for ( int _col = 0; _col < n; _col++ ) {
			char cell = _row.charAt( _col );
			if ( cell == '0' ) { //queen placement start at row, col
				//the rows and cols are easy,
				//the diagonals are not so easy
				//left diagonals can be represented by row - col
				//diagonal 0 is spans the board,
				//7 and -7 are bottom left and top right
				//right diagonals by row + col
				//diagonal 7 spans the board,
				//0 and 14 are top left and bottom right
				List<String> next = new ArrayList<>();
				int _r = row, _c = _col, _ld = row - _col, _rd = row + _col; 
				for ( int i = 0; i < n; i++ ) {
					StringBuilder ch_r;
					//row handling
					if ( i == _r ) {
						ch_r = new StringBuilder( _row.replace( '0', '.' ) );
						ch_r.setCharAt( _c, 'Q' );
						next.add( new String( ch_r ) );
						continue;
					}
					ch_r = new StringBuilder( curr.get( i ) );
					//column handling
					ch_r.setCharAt( _c, '.' );
					//diagonal handling
					int ld_col = i - _ld, rd_col = _rd - i;
					if ( ld_col >= 0 && ld_col < n )
						ch_r.setCharAt( ld_col, '.' );
					if ( rd_col >= 0 && rd_col < n )
						ch_r.setCharAt( rd_col, '.' );
					//submit new row
					next.add( new String( ch_r ) );
				}
				solve_h( next, row + 1, ans );
			}
			//else solve_h( curr, row, ans ); //no queen placement, move on
		}
		//row has ran through all queen pos
		return; //take it back to the previous call and move on
	}

	public static void main( String[] args ) {
		nqueens attempt = new nqueens();	
		List<List<String>> boards = attempt.solve( 5 );
		System.out.println( boards.toString() );
	}
}
