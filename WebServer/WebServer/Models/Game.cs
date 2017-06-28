using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MazeLib;
using SearchAlgorithmsLib;

namespace WebServer
{
    public abstract class Game
    {
        protected string name;
        protected Maze maze;
        protected Solution<Position> solution;

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public Maze Maze
        {
            get { return maze; }
            set { maze = value; }
        }

        /*public Solution<Position> Solution
        {
            get { return solution; }
            set { solution = value; }
        }*/

        protected Game(string name2, Maze maze2/*, Solution<Position> solution2*/)
        {
            name = name2;
            maze = maze2;
            //solution = solution2;
        }

        //public abstract void CloseGame();
    }
}
