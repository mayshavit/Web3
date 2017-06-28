using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MazeLib;
using SearchAlgorithmsLib;

namespace WebServer
{
    //public class MultiGame

    //public abstract class Game
    public class MultiGame : Game
    {
        //private string name;
        //protected string name;
        //private Maze maze;
        //protected Maze maze;
        //private Solution<Position> solution;
        //protected Solution<Position> solution;
        private List</*ClientNotifier*/string> gamers;

        /*/// <summary>
        /// Gets or sets the maze.
        /// </summary>
        /// <value>
        /// The maze.
        /// </value>
        public Maze Maze
        {
            get { return maze; }
            set { maze = value; }
        }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="MultiGame"/> class.
        /// </summary>
        /// <param name="name2">The name.</param>
        /// <param name="maze2">The maze.</param>
        /// <param name="solution2">The solution.</param>*/
        //public MultiGame (string name2, Maze maze2, Solution<Position> solution2)
        //public MultiGame ()
        public MultiGame (string name2, Maze maze2/*, Solution<Position> solution2*/) :
            base (name2, maze2/*, solution2*/)
        {
            //gamers = new List<ClientNotifier>();
        }

        /// <summary>
        /// Adds the gamer.
        /// </summary>
        /// <param name="gamer">The gamer.</param>
        public void AddGamer (/*ClientNotifier*/ string gamer)
        {
            gamers.Add(gamer);
        }

        /// <summary>
        /// Notifies the gamers to send the message.
        /// </summary>
        public void NotifyGamers ()
        //public void Notify ()
        {
            for (int i = 0; i < gamers.Count; i++)
            {
                //gamers.ElementAt(i).ToSend = true;

            }
        }

        /// <summary>
        /// Determines whether a gamer is a gamer.
        /// </summary>
        /// <param name="gamer">The gamer.</param>
        /// <returns>
        ///   <c>true</c> if [is a gamer] [the specified gamer]; otherwise, <c>false</c>.
        /// </returns>
        public bool IsAGamer (/*ClientNotifier*/ string gamer)
        {
            for (int i = 0; i < gamers.Count; i++)
            {
                if (gamers.ElementAt(i).Equals(gamer))
                {
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// Updates the move.
        /// </summary>
        /// <param name="data">The data.</param>
        /// <param name="gamer">The gamer.</param>
        public void UpdateMove (string data, /*ClientNotifier*/ string gamer)
        {
            //gamer.ToSend = false;
            //gamer.Data = "";

            for (int i = 0; i < gamers.Count; i++)
            {
                if (gamers.ElementAt(i).Equals(gamer))
                {
                    continue;
                }

                //gamers.ElementAt(i).ToSend = true;
                //gamers.ElementAt(i).Data = data;

            }
        }

        /// <summary>
        /// Closes the game.
        /// </summary>
        public void CloseGame ()
        {
            for (int i = 0; i < gamers.Count; i++)
            {
                //gamers.ElementAt(i).ChangeToClose = true;
                //gamers.ElementAt(i).ToSend = true;
                //gamers.ElementAt(i).Data = "close";

            }
        }
    }
}
