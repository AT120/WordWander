using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordWanderBackend.Main.Common.Models.DTO;

namespace WordWanderBackend.Main.Common.Interfaces
{
    public interface IInvitationService
    {
        public Task<List<InvitationDTO>> GetInvintations(Guid userId);
        public Task SendInvite(Guid teacherId, Guid userId, Guid groupId);
        public Task<List<UserDTO>> GetUsersForInvite(string name, Guid teacherId, Guid groupId);
        public Task AcceptOrDeclineInvitation(Guid invitationId, Guid userId, bool accept);
    }
}
