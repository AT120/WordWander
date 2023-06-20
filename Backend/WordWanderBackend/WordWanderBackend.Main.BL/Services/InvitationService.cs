using Aspose.Words.XAttr;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.DAL;
using WordWanderBackend.Main.DAL.Models;

namespace WordWanderBackend.Main.BL.Services
{
    public class InvitationService : IInvitationService
    {
        private readonly MainDbContext _context;
        public InvitationService(MainDbContext context)
        {
            _context = context;
        }

        public async Task AcceptOrDeclineInvitation(Guid invitationId, Guid userId, bool accept)
        {
            var invitation = await _context.Invations.Include(c=>c.Group).ThenInclude(x=>x.Students).FirstOrDefaultAsync(x=>x.Id== invitationId);
            if (invitation == null)
            {
                throw new ArgumentNullException("There is no invitation with this id!");
            }
            if (invitation.InvitedId != userId)
            {
                throw new ArgumentException("It is not your invitation!");
            }
            if (accept)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
                invitation.Group.Students.Add(user);
            }
           _context.Invations.Remove(invitation);
           await _context.SaveChangesAsync();
        }

        public async Task<List<InvitationDTO>> GetInvintations(Guid userId)
        {
            return await _context.Invations.Include(x=>x.Group).Include(x=>x.Inviter).Where(x => x.InvitedId == userId).Select(x=>x.ToDTO()).ToListAsync();
        }

        public async Task<List<UserDTO>> GetUsersForInvite(string name, Guid teacherId, Guid groupId)
        {
            var group = await _context.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
            if (group == null)
            {
                throw new ArgumentNullException("There is no group with this id!");
            }
            if (group.TeacherId != teacherId)
            {
                throw new ArgumentException("It is not your group!");
            }
            var users = _context.Users.Include(x => x.TeacherGroups).Where(x => !x.TeacherGroups.Any(c => c.Id != groupId) && Regex.IsMatch(x.UserName, name)).OrderBy(x=>x.UserName.Length).Take(5).Select(z=>z.ToDTO()).ToList();
            return users;
        }

        public async Task SendInvite(Guid teacherId, Guid userId, Guid groupId)
        {
            var group = await _context.Groups.FirstOrDefaultAsync(x => x.Id == groupId);
            if(group == null) {
                throw new ArgumentNullException("There is no group with this id!");
            }
            if(group.TeacherId!= teacherId)
            {
                throw new ArgumentException("It is not your group!");
            }
            await _context.Invations.AddAsync(new InvitationDbModel(teacherId, userId, groupId));
            await _context.SaveChangesAsync();
        }
    }
}
