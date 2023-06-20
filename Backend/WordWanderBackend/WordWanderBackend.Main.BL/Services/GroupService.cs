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

    private async Task<GroupPageDTO> GetGroupPageTeacher(int page, Guid teacherId)
    {
        var user = await _dbcontext.Users
            .Include(u => u.TeacherGroups)
            .FirstOrDefaultAsync(u => u.Id == teacherId && u.Role == Role.Teacher)
                ?? throw new BackendException(401, "Teacher not found");

        var groups = user.TeacherGroups
            .OrderBy(g => g.Name)
            .Skip((page - 1) * PageSize)
            .Take(PageSize)
            .Select(g => new GroupShortDTO
            {
                Id = g.Id,
                Name = g.Name
            });

        return new GroupPageDTO
        {
            TotalPages = user.TeacherGroups.Count / PageSize,
            Groups = groups
        };
    }

    private async Task<GroupPageDTO> GetGroupPageUsers(int page, Guid userId)
    {
        var user = await _dbcontext.Users
            .Include(u => u.UserGroups)
            .FirstOrDefaultAsync(u => u.Id == userId)
                ?? throw new BackendException(401, "User not found");

        var groups = user.UserGroups
            .OrderBy(g => g.Name)
            .Skip((page - 1) * PageSize)
            .Take(PageSize)
            .Select(g => new GroupShortDTO
            {
                Id = g.Id,
                Name = g.Name
            });

        return new GroupPageDTO
        {
            TotalPages = user.UserGroups.Count / PageSize,
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
            return await GetGroupPageTeacher(page, userId);
        else
            return await GetGroupPageUsers(page, userId);
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
}