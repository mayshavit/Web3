using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebServer;
using WebServer.Models;

namespace WebServer.Controllers
{
    [Route("api/Client")]
    public class ClientController : ApiController
    {
        private WebServerContext db = new WebServerContext();

        // GET: api/Client
        [Route("api/Client/Rankings")]
        public List<ClientModel> GetClientModels()
        {
            List<ClientModel> userRankings = new List<ClientModel>();
            foreach (ClientModel dbClientModel in db.ClientModels)
            {
                ClientModel clientModel = new ClientModel()
                {
                    UserName = dbClientModel.UserName,
                    Wins = dbClientModel.Wins,
                    Loses = dbClientModel.Loses
                };
                if (userRankings.Count == 0)
                {
                    userRankings.Add(clientModel);
                }
                else
                {
                    int rank = clientModel.Wins - clientModel.Loses;
                    int rank2 = userRankings.Last().Wins - userRankings.Last().Loses;
                    if (rank <= rank2)
                    {
                        userRankings.Add(clientModel);
                    }
                    else
                    {
                        for (int i = 0; i < userRankings.Count(); i++)
                        {
                            rank2 = userRankings[i].Wins - userRankings[i].Loses;
                            if (rank > rank2)
                            {
                                //userRankings[i] = clientModel;
                                userRankings.Insert(i, clientModel);
                                break;
                            }
                        }
                    }
                }
            }
            //return db.ClientModels;
            return userRankings;
        }

        // GET: api/Client/5
        [ResponseType(typeof(ClientModel))]
        public /*async*/ string GetClientModel(string id, string password)
        {
            // ClientModel clientModel = await db.ClientModels.FindAsync(id);
            ClientModel clientModel =  db.ClientModels.Find(id);
            if (clientModel == null || clientModel.Password != password)
            {
                return "notFound";
            }
            return clientModel.UserName;
        }

        // PUT: api/Client/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutClientModel(string id, ClientModel clientModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != clientModel.UserName)
            {
                return BadRequest();
            }

            db.Entry(clientModel).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Client
        [ResponseType(typeof(ClientModel))]
        public string PostClientModel(ClientModel clientModel)
        {
            if (!ModelState.IsValid)
            {
                return "Bad Request";
            }
            if (ClientModelExists(clientModel.UserName))
            {
                return "Conflict";
            }

            clientModel.Password = Hash(clientModel.Password);

            db.ClientModels.Add(clientModel);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ClientModelExists(clientModel.UserName))
                {
                    db.ClientModels.Remove(clientModel);
                    return "Conflict";
                }
                else
                {
                    throw;
                }
            }

            return "Success";
        }

        static string Hash(string password)
        {
            using (SHA1Managed sha1 = new SHA1Managed())
            {
                var hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(password));
                var sb = new StringBuilder(hash.Length * 2);

                foreach (byte b in hash)
                {
                    sb.Append(b.ToString("x2"));
                }

                return sb.ToString();
            }
        }

        // DELETE: api/Client/5
        [ResponseType(typeof(ClientModel))]
        public async Task<IHttpActionResult> DeleteClientModel(string id)
        {
            ClientModel clientModel = await db.ClientModels.FindAsync(id);
            if (clientModel == null)
            {
                return NotFound();
            }

            db.ClientModels.Remove(clientModel);
            await db.SaveChangesAsync();

            return Ok(clientModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClientModelExists(string id)
        {
            return db.ClientModels.Count(e => e.UserName == id) > 0;
        }
    }
}