import java.util.*;

public class car_fleet {

    /* car_fleet algorithm
     *
     * 1. devise a new array TIME, the time it takes for each car to reach target
     * 
     * 2. MAP all K pos -> V time
     *
     * 3. sort the set of map entries by TIME
     *    and insert all entries into a stack
     *
     * 4. fleets will be formed if:
     *    successive elements in the stack have greater position or equal time
     *    ( ie. the car is slower but in front of the top car
     *          arrives at the destination at the same time )
     *
     * 5. when a fleet is formed, the top car is popped and takes the characteristics of
     *    the next car until the succeeding car won't fleet
     *
     * 6. pop the fleet and increment fleet
     */

    /* notes
     *
     * 1. there was no need to create and sort an arraylist of map values,
     *    instead just work from the destination downwards,
     *    since all cars exist on dist [ 0, target )
     */

    public int solve( int target, int[] position, int[] speed ) {
        int sol = 0;
        int _CT = position.length;
        
        //step 1: create TIME[]
        double[] time = new double[ _CT ];
        for ( int i = 0; i < _CT; i++ )
           time[i] = ( target - position[i] ) / (float) speed[i];
        //for ( int i : time ) System.out.print( i + " " );

        //step 2: map KEYS pos -> VALUES time
        HashMap<Integer, Double> eta_list = new HashMap<>();
        for ( int i = 0; i < _CT; i++ )
            eta_list.put( position[i], time[i] );

        //step 3: sort all list entries by position 
        ArrayList<Map.Entry<Integer, Double>> car_list = new ArrayList<>( eta_list.entrySet() );
        car_list.sort( placeByPosition ); 
        Stack<Map.Entry<Integer, Double>> car_stack = new Stack<>();
        for ( Map.Entry<Integer, Double> car : car_list )
            car_stack.push( car );
        
        //step 4: form fleets
        while ( !car_stack.empty() ) {
            try {
                //System.out.println( car_stack.toString() + ", " + sol );
                Map.Entry<Integer, Double> pop_car = car_stack.pop();
                Double fleet_time = pop_car.getValue();
                sol++;
                Double next_car_time = car_stack.peek().getValue();
                while ( next_car_time <= fleet_time ) {
                    pop_car = car_stack.pop();
                    next_car_time = car_stack.peek().getValue();
                }
                //System.out.println( "POP: " + pop_car.toString() + ", PEEK: " + peek_car.toString() );
            } catch ( Exception e ) {
                return sol;
            }
        }

        //System.out.println( car_list.toString() );
        return sol;
    }

    //custom comparator for step 3
    Comparator<Map.Entry<Integer, Double>> placeByPosition = new Comparator<>() {
        public int compare( Map.Entry<Integer, Double> e1, Map.Entry<Integer, Double> e2 ) {
            return e1.getKey().compareTo( e2.getKey() );
        }
    };

    public static void main( String[] args ) {
        car_fleet attempt = new car_fleet();
        int p_target = 12;
        int[] p_position = { 10,8,0,5,3 };
        int[] p_speed  = { 2,4,1,1,3 };
        int test = attempt.solve( p_target, p_position, p_speed );
        System.out.println( test );
    }
}
