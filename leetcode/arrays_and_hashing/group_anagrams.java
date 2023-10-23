import java.util.*;

public class group_anagrams {

    public static String sort( String str ) {
        char[] str_c = str.toCharArray();
        Arrays.sort( str_c ); 
        return new String( str_c );
    }

    public List<List<String>> solve( String[] strs ) {
        HashMap<String, ArrayList<String>> str_map = new HashMap<>();
        for ( String s : strs ) {
            String s_sort = sort( s ); 
            if ( !str_map.containsKey( s_sort ) ) {
                ArrayList<String> angs = new ArrayList<>();
                str_map.put( s_sort, angs );
            }
            str_map.get( s_sort ).add( s );
        }
        List<List<String>> sol = new ArrayList<>( str_map.values() );
        return sol;
    }

    public static void main( String[] args ) {
        group_anagrams attempt = new group_anagrams();
        String[] in = {"eat","tea","tan","ate","nat","bat"};
        List<List<String>> test = attempt.solve( in );

        for ( List<String> angs : test ) {
            for ( String s : angs ) {
                System.out.print( s );
            }
            System.out.println( "]" );
        }
    }
}
