public class NumberOfIslands {
     public int numIslands(char[][] grid) {
         int numIslands = 0;
         for (int i = 0; i < grid.length; i++) {
             for (int j = 0; j < grid[i].length; j++) {
                 if (grid[i][j] == '0')
                     continue;
                 scan(grid, i, j);
                 numIslands++;
             }
         }
         return numIslands;
     }

     public char[][] scan(char[][] grid, int x, int y) {
         int[][] directions = {{1,0},{-1,0},{0,1},{0,-1}};
         grid[x][y] = '0';
         for (int[] dir : directions) {
             int newX = x + dir[0];
             int newY = y + dir[1];
             if (newX < 0 || newY < 0 || newX >= grid.length || newY >= grid[0].length
                     || grid[newX][newY] == '0')
                 continue;
             grid = scan(grid, newX, newY);
         }
         return grid;
     }

     public static void main(String[] args) {
         char[][] grid = {
             {'1','1','0','0','1'},
             {'1','1','0','1','0'},
             {'1','1','0','0','0'},
             {'0','0','0','0','1'}
         };
         NumberOfIslands test = new NumberOfIslands();
         System.out.println(test.numIslands(grid));
     }
}
