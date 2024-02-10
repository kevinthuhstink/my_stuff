import java.util.PriorityQueue;
import java.util.HashMap;
import java.util.Map;

public class task_scheduler {
	public int solve( char[] tasks, int n ) {
		if ( tasks.length == 1 )
			return 1;
		//1. grab the ct of each task
		HashMap<Character, Integer> task_ct = new HashMap<>();
		for ( char task : tasks ) {
			task_ct.putIfAbsent( task, 0 );
			task_ct.replace( task, task_ct.get( task ) + 1 );
		}
		//2. stick em all in the heap
		PriorityQueue<Integer> theap = new PriorityQueue<>();
		for ( Map.Entry<Character, Integer> ct : task_ct.entrySet() )
			theap.offer( ct.getValue() );
		return n;
	}
}
