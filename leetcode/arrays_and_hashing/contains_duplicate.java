import java.util.HashSet;

public class contains_duplicate {

    public boolean solve(int[] nums) {
        HashSet<Integer> trackNums = new HashSet<Integer>();
        for (int i = 0; i < nums.length; i++)
            if (!trackNums.add(i))
                return false;
        return true;
    }

}
