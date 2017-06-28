using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Collections.Concurrent;

namespace WebServer
{
    public class GameHub : Hub
    {
        private static ConcurrentDictionary<string, string> connectedUsers =
            new ConcurrentDictionary<string, string>();

        //private static List<string> connectedUsers = new List<string>();

        /*public void Hello()
        {
            Clients.All.hello();
        }*/

        /*public void Send(string name, string message)
        {
            // Call the broadcastMessage method to update clients
            Clients.All.broadcastMessage(name, message);
        }*/

        

        public void Connect(string userName)
        {
            connectedUsers[userName] = Context.ConnectionId;
        }

        public void SendMove(string senderUserName, string recipientUserName, string move)
        {
            string recipientId = connectedUsers[recipientUserName];
            if (recipientId == null)
                return;
            Clients.Client(recipientId).gotMessage(senderUserName, move);
        }
    }
}