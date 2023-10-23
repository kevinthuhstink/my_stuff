import java.util.List;
import java.util.ArrayList;
public class word_search {
    /* i guess we're using a trie
     * how are we searching through the board though
     * lets deal with that after we insert all words into the trie
     */
    public List<String> solve( char[][] board, String[] words ) {
        //1. trie up the words
        Trie words_t = new Trie();
        for ( String s : words )
            words_t.insert( s ); //done

        //2. the fun part
        //for every letter in the board,
        //trace a path through other letters
        //probably best to use recursion and a helper func
        List<String> list = new ArrayList<>();
        for ( int l = 0; l < board.length; l++ ) {
            for ( int w = 0; w < board[0].length; w++ ) {
                search( board, words_t, "", l, w, list );
            }
        }
        return list;
    }

    //use a 0 to denote a char we've seen already
    //if one of the adjacent chars exist as another Trie node,
    //proceed and replace that with a 0 in board
    //if we find a Trie with isword True, stick that into the list
    //curr is the current word we have
    public void search( char[][] board, Trie words, String curr, int l, int w, List<String> list ) {
        //3. check if our char is a valid continuation of curr
        if ( l < 0 || l > board.length ) return;
        if ( w < 0 || w > board[l].length ) return;
        if ( board[l][w] == '0' ) return;
        char this_char = board[l][w];
        int tr_i = (int) this_char - 97; 
        String new_curr = curr + this_char; //add this char to our little collection

        if ( words.chars[tr_i] == null ) //not a valid continuation
            return;
        board[l][w] = '0'; //cant use it in this search anymore
        if ( words.chars[tr_i].isword ) {
            words.chars[tr_i].isword = false; //word already found
            list.add( new_curr );
        }
        //valid continuation
        search( board, words.chars[tr_i], new_curr, l+1, w, list );
        search( board, words.chars[tr_i], new_curr, l, w+1, list );
        search( board, words.chars[tr_i], new_curr, l-1, w, list );
        search( board, words.chars[tr_i], new_curr, l, w-1, list );
        board[l][w] = this_char; //bring the letter back now:w
    }
}
