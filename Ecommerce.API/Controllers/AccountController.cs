using AutoMapper;
using Ecommerce.API.Dto;
using Ecommerce.API.Error;
using Ecommerce.API.Extensions;
using Ecommerce.Core.Entities.Identity;
using Ecommerce.Core.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers
{
    
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized(new ApiErrorResponse(401));
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized(new ApiErrorResponse(401));
            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest(new ApiErrorResponse(400));
            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpGet("checkexistence")]
        public async Task<ActionResult<bool>> CheckEmailExistence(string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailFromClaimsPrincipal(HttpContext.User);
            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }
        [Authorize]
        [HttpPut]
        public async Task<ActionResult<UserDto>> UpdateUser(UserDto userDto)
        {
            var user = await _userManager.FindByEmailFromClaimsPrincipal(HttpContext.User);
            user.DisplayName = userDto.DisplayName;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return new UserDto
                {
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user),
                    DisplayName = user.DisplayName
                };
            }
            return BadRequest("Problem updating the user");
        }
        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindUserByClaimsPrincipalWithAddressAsync(HttpContext.User);
            return _mapper.Map<Address, AddressDto>(user.Address);
        }
        [Authorize]
        [HttpPut("address")]

        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindUserByClaimsPrincipalWithAddressAsync(HttpContext.User);
            user.Address = _mapper.Map<AddressDto, Address>(address);
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return _mapper.Map<Address, AddressDto>(user.Address);
            }
            return BadRequest("Problem updating the user");
        }

    }
}
