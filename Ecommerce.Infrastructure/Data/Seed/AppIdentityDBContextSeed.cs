using Ecommerce.Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Infrastructure.Data.Seed
{
    public class AppIdentityDBContextSeed
    {
        public static async Task SeedAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address
                    {
                        FirstName = "Bob",
                        LastName = "Bobbity",
                        Street = "10 The street",
                        City = "New York",
                        State = "NY",
                        Zipcode = "90210",
                        Country = "USA",
                        PostalCode = "90210",
                        Phone = "123456789",


                    }
                };
                try
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                } catch (Exception ex)
                {

                }
            }
        }
    }
}
