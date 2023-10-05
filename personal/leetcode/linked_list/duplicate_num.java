public class duplicate_num {

    /* notes
     * only one element is duplicated within nums
     * return the value of the duplicated element
     * nums.length <= 100_000 O(n)
     *
     * the slug and the hare
     * they both start at index 0
     * since 0 is not an element of the array,
     * A[0] != A[A[0]]
     * 
     * an array takes a number (index) and spits out another number (value)
     * f(index) = value
     * f(f(index)) = f(value)
     * you can construct a sequence of elements
     * index, f(index), f(f(index))...
     * and that sequence will contain a cycle if
     * f^n(index) = f^(n+m)(index)
     *
     * for example, { 1,4,3,2,3 } creates a sequence
     * 0 -> 1 -> 4 -> 3 -> 2 -> 3 -> 2 -> 3...
     * because f^3(0) = f^5(0) //the 4th element in the sequence is the same as the 6th element
     * the sequence will loop indefinitely
     * if there is a cycle the slug will eventually meet the hare
     * 
     * according to some math, slug = m*l
     * where l is the length of the cycle
     * f^c(index) = f^(c+ml)(index) due to the cyclic nature of f
     * f^c = f^c+ml = entry = cycle because they both represent the first element of the cycle
     */

    public int solve( int[] nums ) {
        if ( nums.length == 2 ) return 1;
        int size = nums.length, slug = 0, hare = 0;
        while ( true ) { 
            slug = nums[slug];
            hare = nums[nums[hare]];
            //System.out.println( "compare " + nums[slug] + '[' + slug + "] " + nums[hare] + '[' + hare + ']' );
            if ( slug == hare )
                break;
        } //slug = f^ml, follower = 0
        //get them to f^(c+1)
        //System.out.println( "slug and hare met at " + slug );
        int follower = 0;
        while ( nums[follower] != nums[slug] ) {
            slug = nums[slug];
            follower = nums[follower];
        } //f(follower) = f(slug) = cycle = entry 
        return nums[follower];
    }

    public static void main( String[] args ) {
        duplicate_num attempt = new duplicate_num();
        int[] huge_param = new int[100000];
        for ( int i = 0; i < 99999; i++ )
            huge_param[i] = i + 1;
        huge_param[99999] = 5;
        huge_param[3495] = 5;
        int[] param1 = { 3,1,2,3,4 }; //0 and self-referential
        int[] param2 = { 1,3,4,2,2 }; //0 -> 1 -> 3 -> 2[3] -> 4 -> 2[4] -> 4 -> 2[4]... 
        int[] param3 = { 1,2,3,4,5,6,7,8,9,3 }; //0 -> 1 -> 2 -> 3[2] -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 3[9]...
        System.out.println( attempt.solve( huge_param ) );
        System.out.println( attempt.solve( param1 ) ); //pass
        System.out.println( attempt.solve( param2 ) ); //pass
        System.out.println( attempt.solve( param3 ) ); //pass
    }
}
