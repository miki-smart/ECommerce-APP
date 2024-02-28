using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.API.Error;
using Ecommerce.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuggyController : BaseApiController
    {
        public StoreContext _context { get; }
        public BuggyController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = _context.Products.Find(42);
            return NotFound(new ApiErrorResponse(404));
        }
        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var thing = _context.Products.Find(42);
            return StatusCode(500);
        }
        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            
            return BadRequest(new ApiErrorResponse(400));
        }
        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}