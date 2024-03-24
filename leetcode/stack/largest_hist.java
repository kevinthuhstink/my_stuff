import java.util.Stack;

public class largest_hist {

    public int solve(int[] heights) {

        //1. init vars
        Stack<Integer[]> stack = new Stack<Integer[]>();
        int len = heights.length;
        int sol = 0;

        //2. make triangles
        for (int i = 0; i < len; i++) {
            int width = 0;
            while (!stack.empty() && heights[i] < stack.peek()[0]) {
                Integer[] height = stack.pop();
                width = i - height[1];
                if (height[0] * width > sol)
                    sol = height[0] * width;
            }
            Integer[] height = { heights[i], i - width };
            stack.push(height);
        }

        //3. clean out
        int width = 0;
        while (!stack.empty()) {
            Integer[] height = stack.pop();
            width = len - height[1];
            if (height[0] * width > sol)
                sol = height[0] * width;
        }
        return sol;
    }

    public static void main(String[] args) {
        largest_hist attempt = new largest_hist();
        int[] params1 = { 2,1,5,6,2,3 };
        int[] params2 = { 0,2,1,4,3,2,1,6,1 };
        int[] params3 = { 2,1,2 };
        int[] params4 = { 5,4,4,6,3,2,9,5,4,8,1,0,0,4,7,2 };
        System.out.println(attempt.solve(params1));
        System.out.println(attempt.solve(params2));
        System.out.println(attempt.solve(params3));
        System.out.println(attempt.solve(params4));
    }

}
