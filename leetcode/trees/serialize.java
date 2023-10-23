public class serialize {

    /* notes
     * helper func to grab up to the first comma would be nice
     *
     * we are doing the preorder method cause im a crackhead ?
     * keep walking down left until we hit a null
     * then set write as that val and walk left down that way again
     * loop until str.len == 0
     */

    String serialize( TreeNode root ) {
        if ( root == null )
            return "null,";
        String val = String.valueOf( root.val ) + ",";
        String l_str = serialize( root.left ), r_str = serialize( root.right );
        return val + l_str + r_str;
    }

    //string should be of the format
    //"v1,v2,v3...vn,"
    //val_i should be = arg.indexOf( ',' )
    String next_in( String arg, int val_i ) { //grabs the val we want
        if ( val_i == -1 ) //ie if we ran through all values already
            return "";
        return arg.substring( 0, val_i ); //grab the value from start to comma
    }
    static String cut( String arg, int val_i ) { //removes that val from the serialization
        if ( val_i == -1 ) //theres nothing to cut already
            return "";
        return arg.substring( val_i + 1, arg.length() );
    }

    String data_tracker;
    //perhaps its possible to parse data into an array of items
    TreeNode deserialize( String data ) {
        if ( data.length() == 0 ) //no commas left
            return null;
        int val_i = data.indexOf( ',' );
        String val = next_in( data, val_i );
        data = cut( data, val_i );
        data_tracker = data;

        if ( val.equals( "null" ) )
            return null;
        TreeNode root = new TreeNode( Integer.parseInt( val ) );
        root.left = deserialize( data );
        //somehow need data to change as well
        //ideally, it would look something like this
        //fuggit just define a global variable to do it for me lmaooo
        data = data_tracker; //but strings are immutable
        root.right = deserialize( data );
        return root;
    }
}
