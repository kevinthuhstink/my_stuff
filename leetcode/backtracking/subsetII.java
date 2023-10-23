import java.util.*;
public class subsetII {

	/* notes TODO: marking text within blocks using ab, aB, ib, iB
	 * all that tree stuff was kind of misguided
	 * since the tree builds from the branches,
	 * the vars that tracked the tree got messed up along the way
	 *
	 * this time, treat each group of distinct nums as their own "block"
	 * in subset I, the tree was simple because each block had size 1
	 * the process of "adding to USE" is identical to "adding variations of USE"
	 * with the block definition, USE now has multiple cases
	 * instead of forcing us to find which previous ones were USE
	 * {3,3} gives us { empty, 3, 3 3 }
	 * {2,2,3,3} now adds empty/2/2 2 onto each of the previous cases
	 * keep going until we cycled through all numbers of the previous array
	 */

	public List<List<Integer>> solve( int[] nums ) {
		Arrays.sort( nums );
		return solve_h( nums, 0 );
	}
	
	public List<List<Integer>> solve_h( int[] nums, int loc ) {
		//base case: only empty set
		if ( loc >= nums.length ) {
			List<List<Integer>> _base = new ArrayList<>();
			_base.add( new ArrayList<Integer>() );
			return _base;
		}

		//loc exists on a NEW number
		int curr = nums[loc], nrct, size = nums.length;
		//_uses represents the possible subset-adds including duplicates
		//{3,3} -> O, {3}, {3,3} = _uses, _uses.length = nrct
		List<List<Integer>> _uses = new ArrayList<>();
		for ( nrct = loc; nrct < size && nums[nrct] == curr; nrct++ ) {
			//System.out.println( nrct );
			List<Integer> _case = new ArrayList<>();
			for ( int i = nrct - loc; i >= 0; i-- )
				_case.add( curr ); //fill the _use_cases with nums nr_ct has seen
			_uses.add( _case );
		}
		_uses.add( new ArrayList<Integer>() ); //dont forget the empty case
		//System.out.println( _uses.toString() + ( nrct - loc ) );

		List<List<Integer>> use = new ArrayList<>(), sets = solve_h( nums, nrct ); //recurse down the new num
		nrct = _uses.size(); //now it really means "nr_count"
		//add all options of _uses into each option from the previous subsets
		for ( int _case = 0; _case < nrct; _case++ ) {
			for ( int prev_set = 0; prev_set < sets.size(); prev_set++ )  {
				List<Integer> subset = new ArrayList<>();
				subset.addAll( sets.get( prev_set ) );
				subset.addAll( _uses.get( _case ) );
				use.add( subset );
			}
		}
		return use;
	}


	public static void main( String[] args ) {
		subsetII attempt = new subsetII();
		//test cases {{{
		int[] case1 = { 1,2,2,2 };
		int[] case2 = { 1,2,2,3,3 };
		int[] case3 = { 1,1 };

		List<List<Integer>> out = attempt.solve( case1 );
		for ( List<Integer> sub : out )
			System.out.println( sub.toString() );
	}
}
