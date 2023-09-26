public class sell_stocks {
    public int solve( int[] prices ) {
        int sol = 0; //sell - buy
        int p_l = 0; //represents local min
        int max = 0; //represents window max
        int p_r = 0;
        while ( p_r != prices.length ) {
            if ( prices[p_r] > max ) max = prices[p_r];
            if ( prices[p_r] < prices[p_l] || p_r == prices.length - 1 ) {
                //check this windows price
                int profit = max - prices[p_l];
                if ( profit > sol ) sol = profit;
                p_l = p_r;
                max = prices[p_l];
            }
            p_r++;
        }
        return sol;
    }

    public static void main( String[] args ) {
        int[] params1 = { 7,1,5,3,6,4 };
        sell_stocks attempt = new sell_stocks();
        System.out.println( attempt.solve( params1 ) );
    }
}
