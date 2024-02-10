public class KthLargest {
	
	int[] data; //1 indexed min heap
	int size; 
	public KthLargest( int k, int[] nums ) {
		size = k + 1; //actually represents the first index out of bounds
		data = new int[k + 1];
		//fill with dummy nums for now so we don't have to worry about capacity
		for ( int i = 1; i < k + 1; i++ )
			data[i] = -100000;
		for ( int i = 0; i < nums.length; i++ )
			swim( nums[i] );
	}

	/* k is the number we are inserting
	 * ci is the current index ( starts at 1 )
	 */
	void swim( int k ) {
		if ( k <= data[1] )
			return;
		data[1] = k;
		if ( size == 2 ) return;
		int ci = 1, loc, temp; //current index, lo child, temp
		if ( size == 3 ) {
			if ( data[2] < data[1] ) {
				temp = data[2];
				data[2] = k;
				data[1] = temp;
			}
			return;
		}

		if ( data[2] < data[3] )
			loc = 2;
		else 
			loc = 3;
		while ( data[ci] > data[loc] ) {
			//swap the big and smalls
			temp = data[loc];
			data[loc] = k;
			data[ci] = temp;
			ci = loc;

			//grab new loc
			if ( loc * 2 >= size )
				return;
			loc *= 2;
			if ( loc == size - 1 ) { //last child policy
				if ( data[ci] > data[loc] ) {
					//one last swap
					temp = data[loc];
					data[loc] = k;
					data[ci] = temp;
				}
				return;
			}
			if ( data[loc] > data[loc+1] )
				loc++;
		}
		return;
	}

	public int add( int val ) {
		if ( val <= data[1] )
			return data[1];
		swim( val );
		return data[1];
	}
}
