//this better be good
public class Trie {
    /* right so this thing stores a bunch of words
     * a "everything trie"
     * will sprout branches with every 1 len strings
     * and each 1 len strings becomes 2 len strings
     * on and on
     * the english words we look for will be represented with any ints
     * so the trie looks something like
     *
     * head -> a -> aa, ab... az -> aaa... age(1), art(2)...
     *      -> b ->...
     *      ...
     *      -> z ->... zebra(371)...
     *
     * yeah this one looks a little tough i wont lie
     * holy shit the carriage of each node is gonna be 26 pointers to nodes
     */

    Trie[] chars;
    boolean isword;
    public Trie() {
        chars = new Trie[26];
        for ( int i = 0; i < 26; i++ )
            chars[i] = null;
        isword = false;
    }

    public void insert( String word ) {
        if ( word.isBlank() ) {
            this.isword = true;
            return;
        }
        int tr_i = (int) word.charAt(0) - 97; //oooh fancy pants mcgee ass ascii table
        if ( chars[tr_i] == null )
            chars[tr_i] = new Trie();
        chars[tr_i].insert( word.substring( 1 ) ); //recursion is sad
    }

    public boolean search( String word ) {
        if ( word.isBlank() ) {
            return this.isword;
        }
        int tr_i = (int) word.charAt(0) - 97; //oooh fancy pants mcgee ass ascii table
        if ( chars[tr_i] == null )
            return false;
        return chars[tr_i].search( word.substring( 1 ) ); //recursion is sad
    }

    //oh my god im gonna end it all
    boolean startsWith( String prefix ) {
        if ( prefix.isBlank() ) return true;
        int tr_i = (int) prefix.charAt(0) - 97; //oooh fancy pants mcgee ass ascii table
        if ( chars[tr_i] == null )
            return false;
        return chars[tr_i].startsWith( prefix.substring( 1 ) ); //recursion is sad
    }
}
