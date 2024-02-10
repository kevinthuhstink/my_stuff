/* Why did moving to medians fail, but partitioning pass?
 * Moving to median relied on two ranges independent of each other.
 * The only way binary search works flawlessly is when there is ONE RANGE
 * and outputs of tests on elements of that range move in the same direction
 * if we move the inputs in the same direction.
 *
 * Moving to medians only had the tests move in the same direction,
 * but because there were two input sets,
 * the process of narrowing down the range left huge holes
 * in the range of the two input sets combined.
 */

public class median_two {

	//ab for (), aB for {}
	//strategy: choose a spot in the first array
	//that would force a spot in the second array
	//keeping half of all elements on each side
	//when the highest from lo side is lower than lowest from hi side,
	//then we have positions in both arrays that cut it evenly in half
	public double solve( int[] nums1, int[] nums2 ) {
		int size1 = nums1.length, size2 = nums2.length, tsize = size1 + size2;
		if ( size1 == 0 ) {
			int med = size2 / 2;
			if ( tsize % 2 == 1 )
				return (double) nums2[med];
			int med2 = med - 1;
			return (double) ( nums2[med] + nums2[med2] ) / 2;
		}
		if ( size2 == 0 ) {
			int med = size1 / 2;
			if ( tsize % 2 == 1 )
				return (double) nums1[med];
			int med2 = med - 1;
			return (double) ( nums1[med] + nums1[med2] ) / 2;
		}
		if ( tsize == 2 )
			return (double) ( nums1[0] + nums2[0] ) / 2;
		//operate on size1, force it to be the shorter one
		//the amount of possible "partitions" are limited by the length of the short one
		if ( size2 < size1 ) {
			int[] swap = nums1;
			int size_swap = size1;
			nums1 = nums2;
			nums2 = swap;
			size1 = size2;
			size2 = size_swap;
		}

		//not including the element its on
		//m represents the start of the "hi" side
		//m1 + m2 = tsize / 2 ( m1 + m2 = lo side length )
		//m1,m2 are partition positions
		//lo,hi are their values
		//smin,smax are used to search through nums1
		//note: odd tsize would mean
		int m1, m2, lo, hi, smin = 0, smax = size1;
		while ( true ) {
			m1 = ( smax + smin ) / 2;
			m2 = tsize / 2 - m1;
			if ( m1 == 0 && m2 == size2 ) {
				lo = nums2[m2 - 1];
				hi = nums1[0];
			}
			else if ( m1 == size1 && m2 == 0 ) {
				lo = nums1[m1 - 1];
				hi = nums2[0];
			}
			//no need to check if m2 is 0/max alone because size1 <= size2
			else if ( m1 == 0 ) {
				lo = nums2[m2 - 1];
				hi = Math.min( nums1[m1], nums2[m2] );
			}
			else if ( m1 == size1 ) {
				lo = Math.max( nums1[m1 - 1], nums2[m2 - 1] );
				hi = nums2[m2];
			}
			else {
				lo = Math.max( nums1[m1 - 1], nums2[m2 - 1] );
				hi = Math.min( nums1[m1], nums2[m2] );
			}

			if ( lo <= hi )
				break;
			//we can either move m1 up or down
			//move m1 up when m1 side is lower than m2 side
			//and m1 down when m1 is higher than m2
			if ( nums1[m1] > nums2[m2] )
				smax = m1;
			else if ( smin == m1 ) //anti inf loop
				//smin == m1 when smin and smax are adjacent and we want smax
				smin++;
			else
				smin = m1;
		}

		if ( tsize % 2 == 0 )
			return (double) ( lo + hi ) / 2;
		//if tsize is odd then lo side is one smaller than hi side
		return (double) hi;
	}
}
