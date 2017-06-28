using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;
using System.IO;
using System.Net.Sockets;
using MazeLib;
using SearchAlgorithmsLib;

namespace WebServer
{
     public class MazeCash
    {
        //private IModel model;
        //private Dictionary<string, ICommand> commands;
        //private Dictionary<string, Maze> mazes;
        //private Dictionary<string, Solution<Position>> solutions;
        private static Dictionary<string, SingleGame> singleGames = new Dictionary<string, SingleGame>();
        //private Dictionary<string, MultiGame> games;
        private static Dictionary<string, MultiGame> multiGames = new Dictionary<string, MultiGame>();

        /// <summary>
        /// Initializes a new instance of the <see cref="Controller"/> class.
        /// </summary>
        /*public MazeCash ()
        {
            /*model = new Model(this);
            commands = new Dictionary<string, ICommand>();
            commands.Add("generate", new GenerateMazeCommand(model));
            commands.Add("solve", new SolveMazeCommand(model));
            commands.Add("start", new StartGameCommand(model));
            commands.Add("join", new JoinGameCommand(model));
            commands.Add("list", new ListCommand(model));
            commands.Add("play", new PlayGameCommand(model));
            commands.Add("close", new CloseGameCommand(model));
            //mazes = new Dictionary<string, Maze>();
            //solutions = new Dictionary<string, Solution<Position>>();
            //games = new Dictionary<string, MultiGame>();
            singleGames = new Dictionary<string, SingleGame>();
            multiGames = new Dictionary<string, MultiGame>();
        }*/

        /// <summary>
        /// Executes the command.
        /// </summary>
        /// <param name="commandLine">The command line.</param>
        /// <param name="client">The client.</param>
        /// <returns></returns>
        /*public string ExecuteCommand (string commandLine, ClientNotifier client) //TcpClient client)
        {
            string[] arr = commandLine.Split(' ');
            string commandKey = arr[0];
            if (!commands.ContainsKey(commandKey))
            {
                client.ToSend = true;
                client.ChangeToClose = true;
                return "Command not found";
            }
            string[] args = arr.Skip(1).ToArray();
            ICommand command = commands[commandKey];
            return command.Execute(args, client);
        }*/

        public void AddSingleGame(string name, SingleGame game)
        {
            if (singleGames.ContainsKey(name))
            {
                singleGames[name] = game;
                return;
            }

            singleGames.Add(name, game);
        }

        public void AddMultiGame(string name, MultiGame game)
        {
            if (multiGames.ContainsKey(name))
            {
                multiGames[name] = game;
                return;
            }

            multiGames.Add(name, game);
        }

        /*/// <summary>
        /// Adds the maze.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="maze">The maze.</param>
        public void AddMaze (string name, Maze maze)
        {
            if (mazes.ContainsKey(name))
            {
                mazes[name] = maze;
                return;
            }
            mazes.Add(name, maze);
        }*/

        /*/// <summary>
        /// Adds the solution.
        /// </summary>
        /// <param name="mazeName">Name of the maze.</param>
        /// <param name="solution">The solution.</param>
        public void AddSolution(string mazeName, Solution<Position> solution)
        {
            if (solutions.ContainsKey(mazeName))
            {
                solutions[mazeName] = solution;
                return;
            }
            solutions.Add(mazeName, solution);
        }*/

        /*/// <summary>
        /// Gets the maze.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns></returns>
        public Maze GetMaze (string name)
        {
            if (mazes.ContainsKey(name))
            {
                return mazes[name];
            }

            return null;
        }*/

        /*/// <summary>
        /// Gets the solution.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns></returns>
        public Solution<Position> GetSolution (string name)
        {
            if (solutions.ContainsKey(name))
            {
                return solutions[name];
            }

            return null;
        }*/

        /*/// <summary>
        /// Adds the game.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="game">The game.</param>
        public void AddGame (string name, MultiGame game)
        {
            games.Add(name, game);
        }*/

        /*public MultiGame GetGame (string name)
        {
            return games[name];
        }*/

        /// <summary>
        /// Gets the mazes names.
        /// </summary>
        /// <returns></returns>
        public List<string> GetMazesNames ()
        {
            //return new List<string>(mazes.Keys);
            return new List<string>(multiGames.Keys);
        }

        public SingleGame GetSingleGame(string name)
        {
            if (singleGames.ContainsKey(name))
            {
                return singleGames[name];
            }

            return null;
        }


        /*/// <summary>
        /// Gets the game by gamer.
        /// </summary>
        /// <param name="gamer">The gamer.</param>
        /// <returns></returns>
        public MultiGame GetGameByGamer (ClientNotifier gamer)
        {
            for (int i = 0; i < games.Count; i++)
            {
                MultiGame game = games.Values.ElementAt(i);
                if (game.IsAGamer(gamer))
                {
                    return game;
                }
            }
            return null;
        }*/

        public MultiGame GetGameByGamer(/*ClientNotifier*/ string gamer)
        {
            foreach (MultiGame game in multiGames.Values)
            {
                if (game.IsAGamer(gamer))
                {
                    return game;
                }
            }

            return null;
        }

        /*/// <summary>
        /// Removes the game.
        /// </summary>
        /// <param name="name">The name.</param>
        public void RemoveGame (string name)
        {
            games.Remove(name);
        }*/

        public MultiGame GetMultiGame(string name)
        {
            if (multiGames.ContainsKey(name))
            {
                return multiGames[name];
            }

            return null;
        }

        public void RemoveMultiGame(string name)
        {
            if (multiGames.ContainsKey(name))
            {
                multiGames.Remove(name);
            }
        }
    }
}
