using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.API.Error;
using Ecommerce.API.Helpers;
using Ecommerce.Core.Interface;
using Ecommerce.Infrastructure.Data;
using Ecommerce.Infrastructure.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.API.Extensions
{
    public static class AddServiceCollectionExtension
    {
        public static IServiceCollection ServiceCollection(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers();
            services.AddSignalR();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();
                    var errorResponse = new ApiValidationErrorResponse{Errors=errors};
                    return new BadRequestObjectResult(errorResponse);
                };
            });
            services.AddDbContext<StoreContext>(options =>
            {
                options.UseMySql(config.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(config.GetConnectionString("DefaultConnection")));
            });
            services.AddAutoMapper(typeof(MappingProfile));
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IBasketRepository, BasketRepository>();
            return services;
        }
    }
}