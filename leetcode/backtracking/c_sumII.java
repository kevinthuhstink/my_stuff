import java.util.*;
public class c_sumII {

	/* notes
	 * each item in candidates can only be used once
	 * no duplicate solutions
	 *
	 * i guess we have to use block nums now cause
	 * duplicate nums are just too hard to deal with
	 */
	public List<List<Integer>> solve( int[] candidates, int target ) {
		HashMap<Integer, Integer> blocks = new HashMap<>();
		HashSet<Integer> nrset = new HashSet<>();
		//blocks has the block-representation of candidates
		//nrset represents all the different numbers we have
		for ( int i : candidates ) {
			nrset.add( i );
			blocks.putIfAbsent( i, 0 );
			blocks.replace( i, blocks.get( i ) + 1 );
		}
		Integer[] nrset_arr = nrset.toArray( new Integer[0] );
		return solve_h( blocks, nrset_arr, target, new ArrayList<Integer>() );
	}

	//basic USE/SKP implementation
	public List<List<Integer>> solve_h( HashMap<Integer, Integer> blocks, Integer[] nrset, int target, List<Integer> curr ) {
		if ( nrset.length == 0 ) {
			List<List<Integer>> _base = new ArrayList<>();
			return _base;
		}

		//target means "what is missing from curr to make the num we want"
		int num = nrset[0], ct = blocks.get( num ), size = nrset.length;
		Integer[] next = Arrays.copyOfRange( nrset, 1, size );
		if ( target < num ) //cant use this num so move on
			return solve_h( blocks, next, target, curr );
		//target can be composed with some amount of num
		int nr_ct = target / num;
		if ( target % num == 0 && nr_ct <= ct ) {
			List<Integer> add_sol = new ArrayList<>( curr );
			//keep going for other solutions if they exist
			List<List<Integer>> sol = solve_h( blocks, next, target, curr );
			//drop another search for each value on the way as well
			for ( int i = 0; i < nr_ct; i++ ) {
				List<Integer> more = new ArrayList<>( add_sol );
				target -= num;
				if ( target != 0 )
					sol.addAll( solve_h( blocks, next, target, more ) );
				add_sol.add( num );
			}
			sol.add( add_sol );
			return sol;
		}

		//now we get to choose what to keep and what to skip
		List<List<Integer>> skp = solve_h( blocks, next, target, curr );
		//use looks a lot more different now
		for ( int _case = 1; target > num && _case <= ct; _case++ ) {
			List<Integer> _use_case = new ArrayList<>( curr );
			for ( int i = 0; i < _case; i++ )
				_use_case.add( num );
			target -= num;
			skp.addAll( solve_h( blocks, next, target, _use_case ) );
		}
		return skp;
	}

	public static void main( String[] args ) {
		c_sumII attempt = new c_sumII();
		//test cases {{{
		int[] case1 = { 1,2,2,2 };
		int[] case2 = { 10,1,2,7,6,1,5 };
		int[] case3 = { 1,1 };

		//List<List<Integer>> out = attempt.solve( case1, 5 );
		List<List<Integer>> out = attempt.solve( case2, 8 );
		//List<List<Integer>> out = attempt.solve( case1, 5 );
		for ( List<Integer> sub : out )
			System.out.println( sub.toString() );
	}
}
