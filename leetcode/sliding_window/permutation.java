import java.util.HashMap;
public class permutation {

    /* observations
     * this question is asking for TRUE/FALSE
     * s1.length >= 1
     * s2.length <= 10_000 -> O(n^2) with some cutting
     */
    public boolean solve( String s1, String s2 ) {
        /* brute force:
         * for every s1.l sized window of s2, check if the chars match with s1
         * return false when w_r hits end of s2
         */
        if ( s2.length() < s1.length() ) return false;
        int token_l = s1.length(), len = s2.length(), w_r = token_l;
        HashMap<Character, Integer> token_chars = new HashMap<>();
        for ( char c : s1.toCharArray() ) { //map representation of s1
            token_chars.putIfAbsent( c, 0 );
            token_chars.replace( c, token_chars.get( c ) + 1 );
        }

        while ( w_r <= len ) {
            //w_l inclusive, w_r exclusive
            //1. start checking the window from the back
            //   a failure at any point means all windows containing that char
            //   fails the permutation test
            //   ( failure point + 1 becomes w_l )
            HashMap<Character, Integer> test = new HashMap<>();
            for ( int c = w_r - 1; c >= w_r - token_l; c-- ) {
                char c_char = s2.charAt( c );
                test.putIfAbsent( c_char, 0 );
                test.replace( c_char, test.get( c_char ) + 1 );
                //if the test_window fails then move w_r to failure + token_l + 1
                //w_l becomes failure + 1
                if ( !token_chars.containsKey( c_char ) ||
                      test.get( c_char ) > token_chars.get( c_char ) ) {
                    w_r = c + token_l + 1;
                    break;
                      }
                //all letters added within the window were the same as s1
                if ( c == w_r - token_l ) return true;
            }
            //if w_r is moved to length or more, then there becomes no suitable window
        }
        return false;
    }

    public static void main( String[] args ) {
        permutation attempt = new permutation();
        String params11 = "ab";
        String params21 = "eidbaooo";
        String params12 = "ab";
        String params22 = "eidboaoo";
        String params13 = "adc";
        String params23 = "dcda";
        System.out.println( attempt.solve( params11, params21 ) );
        System.out.println( attempt.solve( params12, params22 ) );
        System.out.println( attempt.solve( params13, params23 ) );
    }
}
