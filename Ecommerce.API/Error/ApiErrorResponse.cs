using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.API.Error
{
    public class ApiErrorResponse
    {
        public  int _statusCode { get; }
        public  string _message;
        public ApiErrorResponse(int statusCode, string message = null)
        {
            _message = message?? GetDefaultMessageForStatusCode(statusCode);;
            _statusCode = statusCode;
        }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "You have made a bad request",
                401 => "You are not authorized",
                404 => "Resource not found",
                500 => "An error occured, try again",
                _ => null
            };
        }
    }
}