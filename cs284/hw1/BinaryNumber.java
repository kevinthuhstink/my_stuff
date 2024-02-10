/* Author: Kevin Cheng
 * Section: CS284-E
 * Pledge: I pledge my honor that I have abided by the Stevens Honor Pledge. */

public class BinaryNumber {
    private int length;
    private int[] val;

    public BinaryNumber(int length) {
        if (length < 0)
            throw new IndexOutOfBoundsException();
        this.length = length;
        val = new int[length];
        for (int i = 0; i < length; i++)
            val[i] = 0;
    }
    public BinaryNumber(String str) {
        if (str.equals("")) {
            val = new int[0];
            length = 0;
        }
        else {
            length = str.length();
            val = new int[length];
            for (int i = 0; i < length; i++)
                val[i] = Integer.parseInt(str.charAt(i) + "");
        }
    }
    @Override
    public String toString() {
        if (length <= 0)
            return "0";
        String strval = "";
        for (int i = 0; i < length; i++)
            strval = strval.concat(val[i] + "");
        return strval;
    }

    public int getLength() {
        return length;
    }
    public int[] getInnerArray() {
        return val;
    }
    public int getDigit(int index) {
        if (index >= length || index < 0)
            throw new IndexOutOfBoundsException();
        return val[index];
    }
    public int toDecimal() {
        int total = 0, place = 1;
        for (int i = length - 1; i >= 0; i--) {
            total += place * val[i];
            place *= 2;
        }
        return total;
    }
    public void bitShift(int direction, int amount) {
        if (direction != -1 && direction != 1) {
            System.out.println("Invalid bit shift direction");
            return;
        }
        length = length - amount * direction;
        if (length <= 0) {
            val = new int[0];
            length = 0;
            return;
        }
        int[] newVal = new int[length];
        for (int i = 0; i < length; i++) {
            if (i >= length)
                newVal[i] = 0;
            else
                newVal[i] = val[i];
        }
        val = newVal;
    }
    static int[] bwor(BinaryNumber bn1, BinaryNumber bn2) {
        if (bn1.getLength() != bn2.getLength()) {
            System.out.println("Invalid input, numbers length differ");
            return null;
        }
        int len = bn1.getLength();
        int[] bworVal = new int[len];
        for (int i = 0; i < len; i++) {
            if (bn1.getDigit(i) == 1 || bn2.getDigit(i) == 1)
                bworVal[i] = 1;
            else
                bworVal[i] = 0;
        }
        return bworVal;
    }
    static int[] bwand(BinaryNumber bn1, BinaryNumber bn2) {
        if (bn1.getLength() != bn2.getLength()) {
            System.out.println("Invalid input, numbers length differ");
            return null;
        }
        int len = bn1.getLength();
        int[] bwandVal = new int[len];
        for (int i = 0; i < len; i++) {
            if (bn1.getDigit(i) == 1 && bn2.getDigit(i) == 1)
                bwandVal[i] = 1;
            else
                bwandVal[i] = 0;
        }
        return bwandVal;
    }

    public void add(BinaryNumber bn) {
        if (bn.getLength() > length) {
            //prepend zeroes to val if necessary
            length = bn.getLength();
            int diff = length - val.length;
            int[] prevVal = val;
            val = new int[length];
            for (int i = 0; i < length; i++) {
                if (i < diff)
                    val[i] = 0;
                else
                    val[i] = prevVal[i - diff];
            }
        }
        int carry = 0, diff = length - bn.getLength();
        for (int i = length - 1; i >= 0; i--) {
            int sum;
            if (i - diff < 0) //bn pos
                sum = val[i] + carry;
            else
                sum = val[i] + bn.getDigit(i - diff) + carry;
            carry = sum / 2;
            val[i] = sum % 2;
        }
        if (carry == 1) {
            length++;
            int[] handleCarry = new int[length];
            handleCarry[0] = 1;
            for (int i = 0; i < length - 1; i++)
                handleCarry[i + 1] = val[i];
            val = handleCarry;
        }
    }
}
