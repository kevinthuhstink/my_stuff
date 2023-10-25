import java.util.*;
public class k_closest {

	//points[i] = [x,y]
	public int[][] solve( int[][] points, int k ) {
		int size = points.length;
		PriorityQueue<Double> dist = new PriorityQueue<>();
		HashMap<Double, ArrayList<Integer>> ind = new HashMap<>();
		for ( int i = 0; i < size; i++ ) {
			int[] p = points[i];
			double _dist = Math.sqrt( p[0]*p[0] + p[1]*p[1] );
			dist.offer( _dist );
			if ( !ind.containsKey( _dist ) )
				ind.put( _dist, new ArrayList<Integer>() );
			ind.get( _dist ).add( i );
		}

		int[][] ret = new int[k][2];
		for ( int i = 0; i < k; i++ ) {
			double _dist = dist.poll();
			ret[i] = points[ ind.get( _dist ).get(0) ];
			ind.get( _dist ).remove( 0 );
		}
		return ret;
	}
}
