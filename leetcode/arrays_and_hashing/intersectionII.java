import java.util.HashMap;

public class intersectionII {

    public int[] solve(int[] nums1, int[] nums2) {
        int[] smaller, larger;
        if (nums1.length < nums2.length) {
            smaller = nums1;
            larger = nums2;
        }
        else {
            smaller = nums2;
            larger = nums1;
        }

        HashMap<Integer, Integer> smallerMap = new HashMap<Integer, Integer>();
        HashMap<Integer, Integer> largerMap = new HashMap<Integer, Integer>();
        for (int i = 0; i < smaller.length; i++) {
            if (smallerMap.containsKey(smaller[i]))
                smallerMap.put(smaller[i], 1);
            else
                smallerMap.put(smaller[i], smallerMap.get(smaller[i]) + 1);
        }
        for (int i = 0; i < larger.length; i++) {
            if (largerMap.containsKey(larger[i]))
                largerMap.put(larger[i], 1);
            else
                largerMap.put(larger[i], largerMap.get(larger[i]) + 1);
        }

        HashMap<Integer, Integer> intersection = new HashMap<Integer, Integer>();
        int arraySize = 0;
        for (Integer key : smallerMap.keySet()) {
            if (largerMap.containsKey(key)) {
                int smallCount = smallerMap.get(key);
                int largeCount = largerMap.get(key);
                if (smallCount > largeCount) {
                    intersection.put(key, largeCount);
                    arraySize += largeCount;
                }
                else {
                    intersection.put(key, smallCount);
                    arraySize += smallCount;
                }
            }
        }

        int[] intersectionArray = new int[arraySize];
        int pos = 0;
        for (Integer key : intersection.keySet()) {
            for (int addCount = intersection.get(key); addCount > 0; addCount--) {
                intersectionArray[pos] = key;
                pos++;
            }
        }

        return intersectionArray;
    }

}
