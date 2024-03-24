import java.util.*;

public class trap_water {

    public int solve(int[] height) {

        //1. setup vars
        int len = height.length;
        int[] fill = new int[len];
        for (int i = 0; i < len; i++)
            fill[i] = height[i];

        int pl = 0;
        int pr = 0;

        //2. fill up to the peak from the left
        while (pr < len) {
            if (fill[pr] >= fill[pl]) {
                int fillHeight = fill[pl];
                for (int i = pl; pl < pr; pl++)
                    fill[pl] = fillHeight;
            }
            pr++;
        }

        //3. mirror from the right
        int fillHeight = fill[--pr];
        while (pr > pl) {
            if (fill[pr] > fillHeight)
                fillHeight = fill[pr];
            fill[pr] = fillHeight;
            pr--;
        }

        //4. compare and return the difference
        int diff = 0;
        for (int i = 0; i < len; i++)
            diff += fill[i] - height[i];
        return diff;
    }

    public static void main(String[] args) {
        int[] param1 = { 0,1,2,0,3,0,1,2,0,0,4,2,1,2,5,0,1,2,0,2 };
        int[] param2 = { 0,1,0,2,1,0,1,3,2,1,2,1 };
        int[] param3 = { 4,2,0,3,2,5 };
        int[] param4 = { 0,1,0,0,0,0,1 };
        trap_water attempt = new trap_water();
        System.out.println(attempt.solve(param1));
        System.out.println(attempt.solve(param2));
        System.out.println(attempt.solve(param3));
        System.out.println(attempt.solve(param4));
    }
}
