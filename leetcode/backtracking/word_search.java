public class word_search {
	public boolean solve( char[][] board, String word ) {
		for ( int i = 0; i < board.length; i++ )
			for ( int j = 0; j < board[i].length; j++ )
				if ( solve_h( board, word, i, j ) )
					return true;
		return false;
	}

	public boolean solve_h( char[][] board, String word, int i, int j ) {
		if ( word.length() == 0 )
			return true;
		if ( i >= board.length )
			return false;
		if ( j >= board[i].length ) 
			return false;
		
		char curr = word.charAt( 0 );
		String next = word.substring( 1 );
		if ( board[i][j] == curr ) {
			//test cases for up, down, left, right
			board[i][j] = '0';
			boolean test = false;
			if ( i > 0 )
				test = test || solve_h( board, next, i - 1, j );
			if ( j > 0 )
				test = test || solve_h( board, next, i, j - 1 );
			if ( i < board.length - 1 )
				test = test || solve_h( board, next, i + 1, j );
			if ( j < board[i].length - 1 )
				test = test || solve_h( board, next, i, j + 1 );
			if ( test )
				return true;
			board[i][j] = curr;
		}
		return false;
	}
}
