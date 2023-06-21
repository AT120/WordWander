using System.Net;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProjCommon.Exceptions;
using WordWanderBackend.Main.Common.Interfaces;
using WordWanderBackend.Main.Common.Models.DTO;
using WordWanderBackend.Main.Common.Models.Enums;
using WordWanderBackend.Main.DAL;
using WordWanderBackend.Main.DAL.Models;

namespace WordWanderBackend.Main.BL.Services;

public class GroupService : IGroupService
{
    private const int PageSize = 7;
    private readonly MainDbContext _dbcontext;
    public GroupService(MainDbContext dbc)
    {
        _dbcontext = dbc;
    }

    private async Task<GroupPageDTO> GetGroupsTeacher(Guid teacherId, int? page = null)
    {
        var user = await _dbcontext.Users
            .Include(u => u.TeacherGroups)
            .FirstOrDefaultAsync(u => u.Id == teacherId && u.Role == Role.Teacher)
                ?? throw new BackendException(401, "Teacher not found");

        var groups = user.TeacherGroups
            .OrderBy(g => g.Name)
            .Select(g => new GroupShortDTO
            {
                Id = g.Id,
                Name = g.Name
            });

        if (page != null)
            return new GroupPageDTO
            {
                TotalPages = user.UserGroups.Count / PageSize,
                Groups = groups.Skip((page.Value - 1) * PageSize).Take(PageSize)
            };

        return new GroupPageDTO
        {
            TotalPages = 1,
            Groups = groups
        };
    }

    private async Task<GroupPageDTO> GetGroupsUsers(Guid userId, int? page = null)
    {
        var user = await _dbcontext.Users
            .Include(u => u.UserGroups)
            .FirstOrDefaultAsync(u => u.Id == userId)
                ?? throw new BackendException(401, "User not found");

        var groups = user.UserGroups
            .OrderBy(g => g.Name)
            .Select(g => new GroupShortDTO
            {
                Id = g.Id,
                Name = g.Name
            });


        if (page != null)
            return new GroupPageDTO
            {
                TotalPages = user.UserGroups.Count / PageSize,
                Groups = groups.Skip((page.Value - 1) * PageSize).Take(PageSize)
            };

        return new GroupPageDTO
        {
            TotalPages = 1,
            Groups = groups
        };
    }

    private async Task CheckTeacherExistence(Guid teacherId)
    {
        var teacherExists = await _dbcontext.Users.AnyAsync(u =>
            u.Id == teacherId && u.Role == Role.Teacher
        );

        if (!teacherExists)
            throw new BackendException(401, "Teacher not found");
    }


    public async Task<GroupPageDTO> GetGroupPage(int page, Guid userId, bool teacher)
    {
        if (page < 1)
            throw new BackendException(400, "Invalid page number");

        if (teacher)
            return await GetGroupsTeacher(userId, page);
        else
            return await GetGroupsUsers(userId, page);
    }


    public async Task<GroupPageDTO> GetAllGroups(Guid userId, bool teacher)
    {
        if (teacher)
            return await GetGroupsTeacher(userId);
        else
            return await GetGroupsUsers(userId);
    }

    public async Task CreateGroup(string name, Guid teacherId)
    {

        await CheckTeacherExistence(teacherId);

        await _dbcontext.Groups.AddAsync(new GroupDbModel
        {
            Name = name,
            TeacherId = teacherId
        });

        await _dbcontext.SaveChangesAsync();
    }

    public async Task DeleteGroup(Guid groupId, Guid teacherId)
    {
        await CheckTeacherExistence(teacherId);
        await _dbcontext.Groups
            .Where(g => g.Id == groupId)
            .ExecuteDeleteAsync();
    }

    public async Task<IEnumerable<UserDTO>> GetGroupUsers(Guid groupId, Guid teacherId)
    {
        var group = await _dbcontext.Groups
            .Include(g => g.Students)
            .FirstOrDefaultAsync(g => g.Id == groupId && g.TeacherId == teacherId)
                ?? throw new BackendException(404, "Group not found");

        return group.Students.Select(s => new UserDTO
        {
            Id = s.Id,
            UserName = s.UserName
        });
    }

    public async Task DeleteStudentFromGroup(Guid teacherId, Guid groupId, Guid userId)
    {
        var group = await _dbcontext.Groups.Include(c=>c.Students).FirstOrDefaultAsync(x => x.Id == groupId);
        if (group == null)
        {
            throw new ArgumentNullException($"There is no group with this {groupId} id!");
        }
        if (group.TeacherId != teacherId)
        {
            throw new InvalidOperationException($"You can't edit group with this {groupId} id");
        }
        var user = await _dbcontext.Users.FirstOrDefaultAsync(x => x.Id == userId);
        if (user == null)
        {
            throw new ArgumentNullException($"There is no user with this {userId} id!");
        }
        group.Students.Remove(user);
        await _dbcontext.SaveChangesAsync();
    }

    public async Task ExitGroup(Guid groupId, Guid userId)
    {
        await _dbcontext.StudentGroup
            .Where(x => x.GroupId == groupId && x.UserId == userId)
            .ExecuteDeleteAsync();
    }
}