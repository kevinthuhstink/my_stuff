import java.util.*;
public class kth_largest {
	public int solve( int[] nums, int k ) {
		int[] heap = new int[k+1];
		for ( int i = 0; i < heap.length; i++ )
			heap[i] = -100000;
		for ( int i = 0; i < nums.length; i++ )
			heap = swim( heap, nums[i] );
		return heap[1];
	}

	int[] swim( int[] data, int n ) {
		int size = data.length;
		if ( n <= data[1] )
			return data;
		data[1] = n;
		if ( size == 2 ) return data;
		int ci = 1, loc, temp; //current index, lo child, temp
		if ( size == 3 ) {
			if ( data[2] < data[1] ) {
				temp = data[2];
				data[2] = n;
				data[1] = temp;
			}
			return data;
		}

		if ( data[2] < data[3] )
			loc = 2;
		else 
			loc = 3;
		while ( data[ci] > data[loc] ) {
			//swap the big and smalls
			temp = data[loc];
			data[loc] = n;
			data[ci] = temp;
			ci = loc;

			//grab new loc
			if ( loc * 2 >= size )
				return data;
			loc *= 2;
			if ( loc == size - 1 ) { //last child policy
				if ( data[ci] > data[loc] ) {
					//one last swap
					temp = data[loc];
					data[loc] = n;
					data[ci] = temp;
				}
				return data;
			}
			if ( data[loc] > data[loc+1] )
				loc++;
		}
		return data;
	}
}
