import java.util.HashMap;
public class longest_replacement {

    /* when a question asks for the max, it means that there is no need to account for
     * lesser solutions to the problem
     * ( ie. the window doesn't need to get smaller for this problem )
     */
    public int solve( String s, int k ) {
        //1. w_r can contort the window as much as it likes,
        //   and we force w_l to catch up
        if ( s.length() == 0 ) return 0;
        int len = s.length(), w_l = 0, max = 0;
        int sol = 0;
        HashMap<Character, Integer> char_list = new HashMap<>();
        //2. increment w_r to stretch out the window as much as we can
        for ( int w_r = 0; w_r < len; w_r++ ) {
            char curr = s.charAt( w_r );
            char_list.putIfAbsent( curr, 0 );
            char_list.replace( curr, char_list.get( s.charAt( w_r ) ) + 1 );
            max = Math.max( char_list.get( curr ), max ); 
            //3. let w_l catch up when the window breaks the constraint
            //   window breaks constraint when
            //      k_subs > k
            //      k_subs = w_len - max
            while ( w_r - w_l + 1 - max > k ) {
                char_list.replace( s.charAt( w_l ), char_list.get( s.charAt( w_l ) ) - 1 );
                w_l++;
            }
            System.out.println( s.substring( w_l, w_r + 1 ) );
            sol = Math.max( w_r - w_l + 1, sol );
        }
        return sol;
    }

    public static void main( String[] args ) {
        longest_replacement attempt = new longest_replacement();
        String params1 = "ABCDEFGHIJKLM"; //8
        int paramk1 = 7;
        String params2 = "ABAB"; //4
        int paramk2 = 3;
        String params3 = "AABABBA"; //4
        int paramk3 = 1;
        String params4 = ""; //0
        int paramk4 = 99;
        //bug !!! TL neeeds to bind to the big EEEs
        String params5 = "CCCCCCCATTLEEEEEEEEEEEEEE"; // = 16
        int paramk5 = 2;
        String params6 = "ABCBAAAD"; // = 5
        int paramk6 = 2;
        String params7 = "SAAAD"; // = 5
        int paramk7 = 2;
        String params8 = "CDEFGABAAAHI"; // = 9
        int paramk8 = 5;
        String params9 = "AAAB"; //3
        int paramk9 = 0;
        String params10 = "ABCDDD"; //6
        int paramk10 = 3;
        System.out.println( attempt.solve( params1, paramk1 ) );
        System.out.println( attempt.solve( params2, paramk2 ) );
        System.out.println( attempt.solve( params3, paramk3 ) );
        System.out.println( attempt.solve( params4, paramk4 ) );
        System.out.println( attempt.solve( params5, paramk5 ) );
        System.out.println( attempt.solve( params6, paramk6 ) );
        System.out.println( attempt.solve( params7, paramk7 ) );
        System.out.println( attempt.solve( params8, paramk8 ) );
        System.out.println( attempt.solve( params9, paramk9 ) );
        System.out.println( attempt.solve( params10, paramk10 ) );
    }
}
