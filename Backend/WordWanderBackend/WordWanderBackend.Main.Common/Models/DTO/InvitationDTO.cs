using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordWanderBackend.Main.Common.Models.DTO
{
    public class InvitationDTO
    {
        public Guid Id { get; set; }
        public string GroupName { get; set; }
        public string InviterUserName { get; set; }
    }
}
