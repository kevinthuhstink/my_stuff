import java.util.HashMap;
public class min_substring {

    /* observations
     * s.length >= 1
     * token.length <= 10_000
     * contains lower and uppercase characters
     *
     * the problem asks for a minimum, so we can start with a maximum
     * and work downwards into a minimum
     * in the case of ADOBECODEBANC ABC,
     * the initial substring would bee ADOBEC
     * and we would progress until we have DEBANC
     * and cut the window into BANC
     */
    public String solve( String s, String t ) {
        if ( t.length() == 0 || t.length() > s.length() ) return "";
        int w_l = 0, w_r = 0, l_ct = t.length();
        HashMap<Character, Integer> t_chars = new HashMap<>();
        //1. represent token t as a grocery list of characters
        for ( char c : t.toCharArray() ) {
            t_chars.putIfAbsent( c, 0 );
            t_chars.replace( c, t_chars.get( c ) + 1 );
        } //l_ct represents the sum of all the positive values in t_chars
          //( the letters still missing from the window-substring

        //2. setup initial window size
        //   walk w_r until we find enough chars to construct t
        while ( l_ct > 0 ) {
            //if l_ct never hit 0 then there is no substring that has t
            if ( w_r >= s.length() ) return "";
            char curr = s.charAt( w_r );
            if ( t_chars.containsKey( curr ) ) {
                t_chars.replace( curr, t_chars.get( curr ) - 1 );
                if ( t_chars.get( curr ) >= 0 ) 
                    //ie. if this letter was necessary to complete the string
                    l_ct--;
            }
            w_r++;
        }
        String sol = "";
        //negatives in t_chars means we have that many spare letters for t construction

        //3. window resizing
        //   find more windows that can construct t and use w_l to constrict them
        while ( w_r <= s.length() ) {
            //if we have a suitable window try to squeeze it
            while ( l_ct <= 0 ) {
                //w_l is strictly less than w_r which is less than max index
                char curr = s.charAt( w_l );
                if ( t_chars.containsKey( curr ) ) {
                    t_chars.replace( curr, t_chars.get( curr ) + 1 );
                    //once the t_chars "requirement" is above 0, then we have missing letters
                    //and this w_l will be the last time the substring satisfies the condition
                    //in this squeeze cycle
                    if ( t_chars.get( curr ) > 0 ) {
                        l_ct++;
                        sol = s.substring( w_l, w_r );
                    }
                }
                w_l++;
            }

            if ( w_r >= s.length() ) break;
            //otherwise slide the window up and maintain its size
            char c_l = s.charAt( w_l ), c_r = s.charAt( w_r );
            if ( t_chars.containsKey( c_l ) ) {
                t_chars.replace( c_l, t_chars.get( c_l ) + 1 );
                if ( t_chars.get( c_l ) > 0 ) l_ct++;
            }
            w_l++;
            if ( t_chars.containsKey( c_r ) ) {
                t_chars.replace( c_r, t_chars.get( c_r ) - 1 );
                if ( t_chars.get( c_r ) >= 0 ) l_ct--;
            }
            w_r++;
            System.out.println( s.substring( w_l, w_r ) );
            System.out.println( t_chars.toString() ); //initial window
            System.out.println( l_ct );
        }
        return sol;
    }

    public static void main( String[] args ) {
        min_substring attempt = new min_substring();
        String params1 = "ADOBECODEBANC";
        String paramt1 = "ABC";
        String params2 = "a";
        String paramt2 = "a";
        String params3 = "";
        String paramt3 = "";
        String params4 = "aceuthegreatest";
        String paramt4 = "babylon";
        String params5 = "greatescapeartist";
        String paramt5 = "spear";
        String params6 = "acbbaca";
        String paramt6 = "aba";
        /*
        System.out.println( attempt.solve( params1, paramt1 ) );
        System.out.println( attempt.solve( params2, paramt2 ) );
        System.out.println( attempt.solve( params3, paramt3 ) );
        System.out.println( attempt.solve( params4, paramt4 ) );
        System.out.println( attempt.solve( params5, paramt5 ) );
        */
        System.out.println( attempt.solve( params6, paramt6 ) );
    }
}
