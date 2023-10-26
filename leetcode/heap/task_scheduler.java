import java.util.*;
public class task_scheduler {

	/* notes
	 * between any two calls its necessary to grab other calls
	 * a max heap, where every element is the number of calls needed for a given task
	 * cycle the number of calls in and out, waiting n before cycling it back into the heap
	 */
	public int solve( char[] tasks, int n ) {
		HashMap<Character, Integer> taskc = new HashMap<>();
		for ( char c : tasks ) {
			if ( !taskc.containsKey( c ) )
				taskc.put( c, 1 );
			else
				taskc.replace( c, taskc.get( c ) + 1 );
		}
		PriorityQueue<Integer> taskq = new PriorityQueue<>( Comparator.reverseOrder() );
		for ( Map.Entry<Character, Integer> t : taskc.entrySet() )
			taskq.offer( t.getValue() );

		//taskc now contains the number of tasks to be completed, sorted by task
		//one cpu cycle grabs the most needed task and cycles it into the "wait" stack
		Stack<Integer> callstack = new Stack<>(); //contains n elements
		for ( int i = 0; i < n; i++ )
			callstack.push( -1 ); //-1 means idle
		int ret = 0;
		while ( taskc.size() > 0 && !callstack.empty() ) { 
			//for all tasks to be complete,
			//taskc needs to be clear and the callstack needs to be empty
			//but i have no idea when to stop submitting -1s into the callstack
			//even when taskc is empty there could be a 9 in the callstack
			//calls are complete when taskc is empty and callstack contains only -1s
		}
		return ret;
	}
}
