using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordWanderBackend.Main.DAL.Models
{
    public class GroupDbModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid TeacherId { get; set; }
        public UserDbModel Teacher { get; set; }

        public List<UserDbModel> Students { get; set; }
    }
}
