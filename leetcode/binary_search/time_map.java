import java.util.*;

public class time_map {

    HashMap<String, HashMap<Integer, String>> _data;
    HashMap<String, List<Integer>> _data_times;
    public time_map() {
        _data = new HashMap<>();
        _data_times = new HashMap<>();
    }

    //map takes the format
    //<K> key -> <V> HashMap ( <K> time -> <V> value )
    //<K> key -> <V> ArrayList input times
    public void set( String s_key, String s_value, int s_time ) {
        //if the key hasn't been logged yet,
        //instantitate its timestamp list and corresponding time->values
        HashMap<Integer, String> timestamp_map = new HashMap<>();
        _data.putIfAbsent( s_key, timestamp_map );
        List<Integer> valid_times = new ArrayList<>();
        _data_times.putIfAbsent( s_key, valid_times );

        //insert timestamp and time->values in the hashmap
        timestamp_map = _data.get( s_key );
        valid_times = _data_times.get( s_key );
        timestamp_map.put( s_time, s_value );
        valid_times.add( s_time );
    }

    /* binary search for the valid time in the timestamp map 
     * then check for the most recent entry no later than [timestamp].
     */
    public String get( String key, int timestamp ) {
        //1. grab values
        if ( !_data.containsKey( key ) ) return "";
        HashMap<Integer, String> timestamp_map = _data.get( key );
        List<Integer> valid_times = _data_times.get( key );

        //2. binary search for time
        //if there is only one logged time for a key,
        //return that value
        if ( valid_times.size() == 1 ) return timestamp_map.get( valid_times.get(0) );
        int p_lo = 0;
        int p_hi = valid_times.size() - 1;
        int m = 0;
        //case if desired time is greater than all times on the list
        if ( valid_times.get( p_hi ).compareTo( timestamp ) <= 0 )
            return timestamp_map.get( valid_times.get( p_hi ) );
        //case if desired time is lower than all times on the list
        if ( valid_times.get( p_lo ).compareTo( timestamp ) > 0 )
            return "";

        //typical binary search algo
        while ( p_hi - p_lo > 1 ) {
            m = ( p_lo + p_hi ) / 2;
            Integer try_time = valid_times.get( m );
            if ( try_time.equals( timestamp ) ) //if the precise log-time exists for key
                return timestamp_map.get( try_time ); //return that value
            if ( try_time.compareTo( timestamp ) > 0 ) p_hi = m;
            else p_lo = m;
        }
        return timestamp_map.get( valid_times.get( p_lo ) ); //p_hi is always greater than timestamp
    }
}
