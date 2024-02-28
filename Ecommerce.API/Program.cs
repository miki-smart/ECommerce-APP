using Ecommerce.Core.Interface;
using Ecommerce.Infrastructure.Data;
using Ecommerce.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Infrastructure.Data.Seed;
using Ecommerce.API.Helpers;
using Ecommerce.API.Middleware;
using Microsoft.AspNetCore.Mvc;
using Ecommerce.API.Error;
using Ecommerce.API.Extensions;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.ServiceCollection(builder.Configuration);
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleWare>();
app.UseCors("CorsPolicy");
app.AddSwaggerExtension();
if (app.Environment.IsDevelopment())
{
    
     using (var scope = app.Services.CreateScope())
      {
        var services = scope.ServiceProvider;
        var loggerFactory = services.GetRequiredService<ILoggerFactory>();
        try
        {
            var db = services.GetRequiredService<StoreContext>();
            if (db != null)
            {
                if (db.Database.IsMySql() && db.Database.GetPendingMigrations().Any())
                {
                    await db.Database.MigrateAsync();
                }

            }

            await SeedStoreContext.SeedAsync(db, loggerFactory);
        }
        catch (Exception ex)
        {
            var logger = loggerFactory.CreateLogger<Program>();
            logger.LogError(ex, "An error occurred during migration");
        }
    }
}
app.UseStatusCodePagesWithRedirects("/errors/{0}");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthorization();

app.MapControllers();

app.Run();

