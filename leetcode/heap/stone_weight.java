import java.util.*;
public class stone_weight {
	//sort and take last two and crush em together and resend it to heap
	//MAX HEAP
	public int solve( int[] stones ) {
		int size = stones.length;
		if ( size == 1 )
			return stones[0];
		PriorityQueue<Integer> heap = new PriorityQueue<>( Comparator.reverseOrder() );
		for ( int i : stones )
			heap.offer( i );
		System.out.println( heap.toString() );
		while ( size > 1 ) {
			int s1 = heap.poll(), s2 = heap.poll();
			if ( s1 == s2 ) {
				size -= 2;
				continue;
			}
			size--;
			heap.offer( s1 - s2 );
		}
		if ( size == 0 )
			return 0;
		return heap.poll();
	}
}
