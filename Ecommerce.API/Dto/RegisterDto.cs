﻿using System.ComponentModel.DataAnnotations;

namespace Ecommerce.API.Dto
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$", 
            ErrorMessage = "Password must have 1 uppercase, 1 lowercase, 1 number," +
            " 1 non alphanumeric and at least 8 characters")]
        public string Password { get; set; }

    }
}
