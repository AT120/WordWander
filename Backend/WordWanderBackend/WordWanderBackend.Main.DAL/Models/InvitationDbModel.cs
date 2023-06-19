using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordWanderBackend.Main.Common.Models.DTO;

namespace WordWanderBackend.Main.DAL.Models
{
    public class InvitationDbModel
    {
        public Guid Id { get; set; }

        public Guid GroupId { get; set; }
        public GroupDbModel Group { get; set; }

        public Guid InvitedId { get; set; }
        public UserDbModel Invited { get; set; }

        public Guid InviterId { get; set; }
        public UserDbModel Inviter { get; set; }

        public InvitationDTO ToDTO()
        {
            return new InvitationDTO { Id = Id, GroupName = Group.Name, InviterUserName = Inviter.UserName };
        }
        public InvitationDbModel(){}
        public InvitationDbModel(Guid teacherId, Guid userId, Guid groupId)
        {
            Id = Guid.NewGuid();
            GroupId = groupId;
            InvitedId = userId;
            InviterId = teacherId;
        }
    }
}
