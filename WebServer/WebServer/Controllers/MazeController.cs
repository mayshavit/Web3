using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MazeLib;
using SearchAlgorithmsLib;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace WebServer
{
    [Route("api/Maze")]
    public class MazeController : ApiController
    {
        private MazeModel model;

        public MazeController()
        {
            model = new MazeModel();
        }

        //[HttpGet]
        [Route("api/Maze/Generate")]
        public JObject GetGenerateMaze(string name, int rows, int cols)
        {
            Maze maze = model.GenerateMaze(name, rows, cols);
            JObject obj = JObject.Parse(maze.ToJSON());
            return obj;
        }

        [Route("api/Maze/Solve")]
        public List<string> GetSolveMaze(string name, int algorithm)
        {
            List<string> solution = model.SolveMaze(name, algorithm);
            return solution;
        }

        // GET: api/Maze
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Maze/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Maze
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Maze/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Maze/5
        public void Delete(int id)
        {
        }
    }
}
