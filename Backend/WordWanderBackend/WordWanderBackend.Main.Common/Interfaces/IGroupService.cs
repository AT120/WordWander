using WordWanderBackend.Main.Common.Models.DTO;

namespace WordWanderBackend.Main.Common.Interfaces;

public interface IGroupService
{
    Task<GroupPageDTO> GetGroupPage(int page, Guid userId, bool teacher);
    Task<GroupPageDTO> GetAllGroups(Guid userId, bool teacher);
    Task DeleteGroup(Guid groupId, Guid teacherId);
    Task CreateGroup(string name, Guid teacherId);
    Task<IEnumerable<UserDTO>> GetGroupUsers(Guid groupId, Guid teacherId);
    Task DeleteStudentFromGroup(Guid teacherId, Guid groupId, Guid userId);
    Task ExitGroup(Guid groupId, Guid userId);
}