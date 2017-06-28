using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MazeLib;
using SearchAlgorithmsLib;

namespace WebServer
{
    public class SingleGame : Game
    {
        public SingleGame(string name2, Maze maze2, Solution<Position> solution2) :
            base(name2, maze2/*, solution2*/)
        {

        }
    }
}
