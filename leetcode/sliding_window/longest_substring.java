import java.util.HashMap;

public class longest_substring {
    public int solve( String s ) {
        int sol = 0;
        int size;
        HashMap<Character, Integer> w_chars = new HashMap<>();
        int w_l = 0;
        int w_r = 0;

        //BUG; needs to clear up to the location of the last char, not the entire sub
        while ( w_r != s.length() ) {
            //end the window when hashmap cant store the char and mark the size
            if ( w_chars.containsKey( s.charAt( w_r ) ) ) {
                size = w_chars.size();
                if ( size > sol ) sol = size;

                int dup = w_chars.get( s.charAt( w_r ) ).intValue();
                //window_left becomes the cleanup crew
                while ( w_l <= dup ) {
                    w_chars.remove( s.charAt( w_l ) );
                    w_l++;
                }
            }
            w_chars.put( s.charAt( w_r ), w_r );
            System.out.println( w_chars.toString() );
            w_r++;
        }
        //check the hashmap once loop breaks
        size = w_chars.size();
        if ( size > sol ) sol = size;

        return sol;
    }

    public static void main( String[] args ) {
        longest_substring attempt = new longest_substring();
        String params1 = "abcabcbb";
        String params2 = "bbbbb";
        String params3 = "pwwkew";
        System.out.println( attempt.solve( params1 ) );
        System.out.println( attempt.solve( params2 ) );
        System.out.println( attempt.solve( params3 ) );
        String params4 = "dvdf";
        System.out.println( attempt.solve( params4 ) );
    }
}
