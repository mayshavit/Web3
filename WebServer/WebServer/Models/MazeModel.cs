using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SearchAlgorithmsLib;
using MazeLib;
using MazeGeneratorLib;

namespace WebServer
{
    public class MazeModel
    {
        private MazeCash cash;

        /// <summary>
        /// Initializes a new instance of the <see cref="Model"/> class.
        /// </summary>
        /// <param name="controller2">The controller.</param>
        public MazeModel(/*MazeCash cash2*/)
        {
            //cash = cash2;
            cash = new MazeCash();
        }

        /// <summary>
        /// Generates the maze.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="rows">The rows.</param>
        /// <param name="cols">The cols.</param>
        /// <returns></returns>
        public Maze GenerateMaze(string name, int rows, int cols)
        {
            IMazeGenerator mazeGenerator = new DFSMazeGenerator();

            Maze maze = mazeGenerator.Generate(rows, cols);
            maze.Name = name;
            cash.AddSingleGame(name, new SingleGame(name, maze, null));

            //cash.AddMaze(name, maze);
            return maze;
        }

        /// <summary>
        /// Returns a list of the mazes' names.
        /// </summary>
        /// <returns></returns>
        public List<string> MazesNames()
        {
            return cash.GetMazesNames();
        }

        /// <summary>
        /// Solves the maze.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="algorithm">The algorithm.</param>
        /// <returns></returns>
        public /*Solution<Position>*/ List<string> SolveMaze(string name, int algorithm)
        {
            SingleGame game = cash.GetSingleGame(name);

            if (game != null)
            {
                //Solution<Position> solution = cash.GetSolution(name);
                /*Solution<Position> solution = game.Solution;
                if (!(solution == null))
                {
                    return solution;
                }*/
                //Maze maze = cash.GetMaze(name);
                Maze maze = game.Maze;
                ISearcher<Position> searcher = null;

                if (algorithm == 0)
                {
                    searcher = new BFS<Position>();
                }
                else if (algorithm == 1)
                {
                    searcher = new DFS<Position>();
                }

                MazeAdapter<Position> mazeAdapter = new MazeAdapter<Position>(maze);
                Solution<Position> solution = searcher.Search(mazeAdapter);
                //cash.AddSolution(name, solution);
                //game.Solution = solution;
                return this.GetSolutionString(solution.List);  //solution;
            }
            return null;
        }

        private List<string> GetSolutionString(List<State<Position>> list)
        {
            List<string> solution = new List<string>();

            for (int i = 0; i < list.Count - 1; i++)
            {
                Position from = list[i].StateType;
                Position to = list[i + 1].StateType;

                //Direction direction;
                string direction;

                if (from.Row == to.Row)
                {
                    if (from.Col > to.Col)
                    {
                        //direction = Direction.Left;
                        direction = "left";
                    }
                    else
                    {
                        //direction = Direction.Right;
                        direction = "right";
                    }
                }
                else
                {
                    if (from.Row > to.Row)
                    {
                        //direction = Direction.Down;
                        direction = "down";
                    }
                    else
                    {
                        //direction = Direction.Up;
                        direction = "up";
                    }
                }

                //solution += (int)direction;
                solution.Add(direction);
            }

            return solution;
        }

        /// <summary>
        /// Starts the game.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="rows">The rows.</param>
        /// <param name="cols">The cols.</param>
        /// <param name="gamer">The gamer.</param>
        /// <returns></returns>
        public Maze StartGame(string name, int rows, int cols, string player/*, ClientNotifier gamer*/)
        {
            //Maze maze = GenerateMaze(name, rows, cols);
            IMazeGenerator mazeGenerator = new DFSMazeGenerator();
            Maze maze = mazeGenerator.Generate(rows, cols);
            maze.Name = name;
            MultiGame game = new MultiGame(name, maze, player);
            //game.AddGamer(gamer);
            //cash.AddGame(name, game);
            cash.AddMultiGame(name, game);
            return maze;
        }

        /// <summary>
        /// Connect a gamer to the game.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="gamer">The gamer.</param>
        /// <returns></returns>
        public Maze JoinGame(string name, string gamer)
        {
            //MultiGame game = cash.GetGame(name);
            MultiGame game = cash.GetMultiGame(name);
            game.AddGamer(gamer);
            //game.NotifyGamers();

            Maze maze = game.Maze;
            return maze;
        }

        public string GetOtherPlayerName(string gameName, string playerName)
        {
            return cash.GetMultiGame(gameName).GetOtherPlayerName(playerName);
        }

        /*/// <summary>
        /// Plays a move in the maze according to the gamer.
        /// </summary>
        /// <param name="move">The move.</param>
        /// <param name="gamer">The gamer.</param>
        /// <returns></returns>
        public string PlayMove(string move, ClientNotifier gamer)
        {
            MultiGame game = cash.GetGameByGamer(gamer);
            JMove jMove = new JMove(game.Name, move);
            string json = JsonConvert.SerializeObject(jMove);
            game.UpdateMove(json, gamer);

            return json;
        }*/

        /// <summary>
        /// Closes the game.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="gamer">The gamer.</param>
        /// <returns></returns>
        public void CloseGame(string name)
        {
            //MultiGame game = cash.GetGame(name);
            MultiGame game = cash.GetMultiGame(name);
            //game.CloseGame();

            //cash.RemoveGame(name);
            cash.RemoveMultiGame(name);
        }
    }
}