﻿using Ecommerce.Core.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Core.Interface
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
