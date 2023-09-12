import java.util.*;

/* zenzen5's comment
 *
Brute force:
Every index i consider the first element smaller than a[i] on the right, same on the left.
Then the area built using i will be (right-left-1)*a[i].
We do this for each index and take the max. Note that this formula does not change.

Observation 1:
Inefficiency in the brute force solution is that we have to (re)scan right and left for every index.
Maybe we can avoid the rescan by changing the order in which we consider i (not necessarily i to n).
To do this we will need to store indexes in a list and iterate in a different order somehow.

Observation 2 (eliminate right scan):
For a special case, we observe that we don't need to rescan to the right.
Assume in the array [a,b,c,d,e] a<=b<=c<=d and e<d. If we consider d, the first element less than d to the right is e.
We can look for elements like d by iterating till, let's say, the first i where a[i]<a[i-1].
Then if we consider a[i-1] first to calculate area (which is d) we have eliminated the need for a right side scan.
We still have to scan to the left, but we should make sure that once we have established this state, we maintain it to avoid right scan, ever.

Observation 3:
By right elimination strategy in observation 2, we also notice that everything to the left of a[i-1] is <=d.
What this means is that if a[i-k] where k>1 wants to make a rectangle with its height,
it can at least do that upto a[i-1] (a[i-1] can "absorb" all possible height rectangles before it since it is bigger).
We don't know the relationship between a[i-k] and a[i] though, a[i] may or may not be able to absorb a[i-k].
What this means is that after we consider a[i-1], we have to re-evaluate the relationshuip between a[i-2] and a[i]
and make sure the constraint in Observation 2 holds.

Observation 4 (eliminate left scan):
Lets say we've been using a list L to store indices to consider them out of order to avoid rescanning.
When we consider L[h_len-1] we know that the element before it (L[h_len-2]) could be equal or smaller to it.
If it is strictly smaller, we know the left smaller element and can calculate the area which would be the max using a[i-1] with the brute force formula.
If it is equal, it means after removing L[L.Length-1],
the constraint in observation 2 still holds (a[L[Length-2]] > a[i]).
So for L[L.Length-2] we still know the right and left smaller and can calculate area which would include L[L.Length-1].
This means it is ok to consider L[L.Length-2] as the left min while considering L[L.Length-1] while maintain right side constraint,
and the left side falls into place (if equal, in the next iteration, when we consider L[L.Length-2]).

Observation 5 (order of consideration):
It should be clear that it is ok to consider indexes one at a time, the last one in L as long as we maintain the constraint in (2).
When we remove L we may need to iterate i and add more things to L to maintain the constraint between L[Length-2] and i.
So now it should be obvious why the List is just a stack since we only care about the last 2 at a time.

Recap
We look for the pattern in observation 2 and store its indices in a stack.
So we store the indices of [a,b,c,d] in a stack S and i is the next index (so a[i] == e).
We must maintain this stack with this constraint in mind, that the top element must be the greatest in the stack
and a[i] must be smaller than it to avoid right scan (a[L[L.Length-1]] > a[i]).
We can always consider stack[top-1] to be the left min to avoid left scan, and the max area will fall into place eventually.
At any point stack[top] is the index we are considering with a[i] the right min and stack[top-1] the left min.
*/

public class largest_hist {

    public int solve( int[] heights ) {
        return 0;
    }

}
