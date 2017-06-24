using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
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
        public async Task<IHttpActionResult> PostClientModel(ClientModel clientModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ClientModels.Add(clientModel);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ClientModelExists(clientModel.UserName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = clientModel.UserName }, clientModel);
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