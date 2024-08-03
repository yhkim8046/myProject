using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Models; 

namespace Services{ 
    public class UserService{
        private readonly ApplicationDbContext _context;
        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}