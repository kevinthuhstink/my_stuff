import java.util.*;

public class valid_sudoku {

    private int box( int row, int col ) {
        if ( row < 3 ) {
            if ( col < 3 ) return 0;
            else if ( col > 5 ) return 2;
            else return 1;
        } else if ( row > 5 ) {
            if ( col < 3 ) return 6;
            else if ( col > 5 ) return 8;
            else return 7;
        } else {
            if ( col < 3 ) return 3;
            else if ( col > 5 ) return 5;
            else return 4;
        }
    }

    public boolean isValidSudoku(char[][] board) {
        ArrayList<HashSet<Integer>> al_row = new ArrayList<>();
        ArrayList<HashSet<Integer>> al_col = new ArrayList<>();
        ArrayList<HashSet<Integer>> al_box = new ArrayList<>();

        for ( int i = 0; i < 9; i++ ) {
            al_row.add( new HashSet<Integer>() );
            al_col.add( new HashSet<Integer>() );
            al_box.add( new HashSet<Integer>() );
        }

        for ( int row = 0; row < 9; row++ ) {
            for ( int col = 0; col < 9; col++ ) {
                char value_c = board[ row ][ col ];
                if ( value_c == 46 ) continue;

                int value = Character.getNumericValue( value_c );
                int cell_box = box( row, col );
                if ( !al_row.get( row ).add( value ) ||
                     !al_col.get( col ).add( value ) ||
                     !al_box.get( cell_box ).add( value )  )
                    return false;
            }
        }
        return true;
    }
}
