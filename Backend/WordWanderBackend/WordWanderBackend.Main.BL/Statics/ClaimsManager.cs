using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace WordWanderBackend.Main.BL.Statics
{
    public static class ClaimsManager
    {
        public static Guid GetIdClaim(ClaimsPrincipal User)
        {
            Guid userId;
            Guid.TryParse(User.FindFirst("id").Value, out userId);
            return userId;
        }
        public static string GetRoleClaim(ClaimsPrincipal User)
        {
            return User.FindFirst("http://schemas.microsoft.com/ws/2008/06/identity/claims/role").Value;        
        }
    }
}
