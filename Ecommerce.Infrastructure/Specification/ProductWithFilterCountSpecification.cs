using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Core.Entities;
using Ecommerce.Infrastructure.Repository;

namespace Ecommerce.Infrastructure.Specification
{
    public class ProductWithFilterCountSpecification: BaseSpecification<Product>
    {
        public ProductWithFilterCountSpecification(ProductSpecParams productSpecParams) : base(x =>
            (productSpecParams.Search == null || x.Name.ToLower().Contains(productSpecParams.Search)) &&
            (!productSpecParams.BrandId.HasValue || x.ProductBrandId == productSpecParams.BrandId) &&
            (!productSpecParams.TypeId.HasValue || x.ProductTypeId == productSpecParams.TypeId))
        {

        }
    }
}