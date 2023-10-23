import java.util.*;

public class product_except_self {

    public int[] solve( int[] nums ) {
        int l = nums.length;
        int[] pref = new int[ l ];
        int[] suff = new int[ l ];
        pref[0] = 1;
        suff[ l - 1 ] = 1;
        for ( int i = 1; i < l; i++ )
            pref[i] = pref[ i - 1 ] * nums[ i - 1 ];
        for ( int i = l - 2; i >= 0; i-- )
            suff[i] = suff[ i + 1 ] * nums[ i + 1 ];
        for ( int i = 0; i < l; i++ ) {
            System.out.println( pref[i] + " " + suff[i] );
        }
        int[] sol = new int[l];
        for ( int i = 0; i < l; i++ )
            sol[i] = pref[i] * suff[i];
        return sol;
    }

    public static void main( String[] args ) {
        product_except_self attempt = new product_except_self();
        int[] params = { -1,1,0,-3,3 };
        int[] test = attempt.solve( params );
        for ( int i : test )
            System.out.print( i + " " );
        System.out.println( "]" );
    }
}
