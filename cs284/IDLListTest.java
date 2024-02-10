public class IDLListTest {

    public static void main(String[] args) {

        IDLList<String> listEmpty = new IDLList<String>();
        IDLList<String> listOne = new IDLList<String>();
        listOne.add("linking park");
        IDLList<String> listOneFromAppend = new IDLList<String>();
        listOneFromAppend.append("(it starts with one thing)");

        IDLList<String> listTWICE = new IDLList<String>(); //listMany
        listTWICE.append("CRUEL");
        listTWICE.append("REAL YOU");
        listTWICE.append("F.I.L.A");
        listTWICE.append("LAST WALTZ");
        listTWICE.append("ESPRESSO");
        listTWICE.append("REWIND");
        listTWICE.append("CACTUS");
        listTWICE.append("PUSH");
        listTWICE.append("PUSH & PULL");
        listTWICE.append("HELLO");
        listTWICE.append("1, 3, 2");
        listTWICE.append(null);
        listTWICE.add("ICON");
        listTWICE.add("MOONLIGHT");
        listTWICE.add(null);

        //verify toString(), add(), append(), getHead/Last()
        System.out.println("Initializing lists");
        System.out.println(listEmpty + ": EMPTY LIST");
        System.out.println(listOne + ": ONE ELEMENT LIST");
        System.out.println(listOneFromAppend + ": ONE ELEMENT LIST(append)");
        System.out.println(listTWICE + ": A LOT OF ELEMENTS LIST");

        System.out.println("\nEMPTY head: " + listEmpty.getHead() + "\ttail: " + listEmpty.getLast());
        System.out.println("ONCE head: " + listOne.getHead() + "\ttail: " + listOne.getLast());
        System.out.println("ONCE(append) head: " + listOneFromAppend.getHead() + "\ttail: " + listOneFromAppend.getLast());
        System.out.println("TWICE head: " + listTWICE.getHead() + "\ttail: " + listTWICE.getLast());
        System.out.println("with their sizes:");
        System.out.println(listEmpty.size());
        System.out.println(listOne.size());
        System.out.println(listOneFromAppend.size());
        System.out.println(listTWICE.size());

        //verify add[atIndex]()
        System.out.println("\nTesting addAtIndex()");
        listEmpty.add(0, "two two one two"); //add to empty
        listTWICE.add(0, null); //add at head
        listTWICE.add(2, "SCIENTIST"); //non-edge
        listTWICE.add(17, "CANDY"); //add at tail

        System.out.println(listEmpty + " adding to index 0 of an empty list");
        System.out.println(listTWICE);
        System.out.println("\nEMPTY head: " + listEmpty.getHead() + "\ttail: " + listEmpty.getLast());
        System.out.println("TWICE head: " + listTWICE.getHead() + "\ttail: " + listTWICE.getLast());
        System.out.println("with their sizes:");
        System.out.println(listEmpty.size());
        System.out.println(listTWICE.size());

        //verify removes
        System.out.println("\nTesting removes");
        if (listEmpty.remove("the rest is empty with no brain but the clever nerd"))
            System.out.println("this message shouldnt be appearing: remove something nonexistent");
        if (!listEmpty.remove("two two one two"))
            System.out.println("this message shouldnt be appearing: remove something existing");
        listOne.removeLast(); //removeLast() good
        listOneFromAppend.remove(); //remove() good

        System.out.println(listEmpty);
        System.out.println(listOne);
        System.out.println(listOneFromAppend);
        System.out.println("\nEMPTY head: " + listEmpty.getHead() + "\ttail: " + listEmpty.getLast());
        System.out.println("ONCE head: " + listOne.getHead() + "\ttail: " + listOne.getLast());
        System.out.println("ONCE(append) head: " + listOneFromAppend.getHead() + "\ttail: " + listOneFromAppend.getLast());
        System.out.println(listEmpty.size());
        System.out.println(listOne.size());
        System.out.println(listOneFromAppend.size());

        System.out.println("\nTesting removeAt");
        try {
            listTWICE.removeAt(18);
        } catch (IllegalStateException e) {
            System.out.println("removeAt out of bounds (index == size) exception caught");
        };
        System.out.println("removing index 0, 15, 15, should remove null null CANDY");
        System.out.println(listTWICE.removeAt(0)); //remove at head
        System.out.println(listTWICE.removeAt(15)); //remove any pos
        System.out.println(listTWICE.removeAt(15)); //remove at tail

        System.out.println(listTWICE);
        System.out.println("TWICE head: " + listTWICE.getHead() + "\ttail: " + listTWICE.getLast());
        System.out.println(listTWICE.size());
        //im done
    }
}
