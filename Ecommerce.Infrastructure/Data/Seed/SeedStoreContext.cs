using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Ecommerce.Core.Entities;
using Microsoft.Extensions.Logging;

namespace Ecommerce.Infrastructure.Data.Seed
{
    public class SeedStoreContext
    {
        public static async Task SeedAsync(StoreContext storeContext, ILoggerFactory loggerFactory, int? retry = 0)
        {
            int retryForAvailability = retry.Value;
            try
            {
             
                // Seed code here
                if(!storeContext.ProductBrands.Any())
                {
                    var brandsData = System.IO.File.ReadAllText("../Ecommerce.Infrastructure/Data/Seed/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                    foreach (var item in brands)
                    {
                        storeContext.ProductBrands.Add(item);
                    }
                    await storeContext.SaveChangesAsync();

                }
                if(!storeContext.ProductTypes.Any())
                {
                    var typesData = System.IO.File.ReadAllText("../Ecommerce.Infrastructure/Data/Seed/types.json");
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                    foreach (var item in types)
                    {
                        storeContext.ProductTypes.Add(item);
                    }
                     await storeContext.SaveChangesAsync();
                }
                if(!storeContext.Products.Any())
                {
                    var productsData = System.IO.File.ReadAllText("../Ecommerce.Infrastructure/Data/Seed/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                    foreach (var item in products)
                    {
                        storeContext.Products.Add(item);
                    }
                     await storeContext.SaveChangesAsync();
                    
                }
                
            }
            catch (Exception ex)
            {
                if (retryForAvailability < 10)
                {
                    retryForAvailability++;
                    var log = loggerFactory.CreateLogger<SeedStoreContext>();
                    log.LogError(ex.Message);
                }
            }
        }
    }
}