using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebServer
{
    public class ClientModel
    {
        public int ID { get; set; }
        [Key]
        public string UserName { get; set; }
        public string Password { get; set; }
        public string EMail { get; set; }
        public int Wins { get; set; }
        public int Loses { get; set; }
    }
}