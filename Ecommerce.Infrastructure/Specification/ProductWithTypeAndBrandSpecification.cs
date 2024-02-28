using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ecommerce.Core.Entities;
using Ecommerce.Core.Interface;
using Ecommerce.Infrastructure.Repository;
using Ecommerce.Infrastructure.Specification;

namespace Ecommerce.Core.Implementation
{
    public class ProductWithTypeAndBrandSpecification : BaseSpecification<Product>
    {
        public ProductWithTypeAndBrandSpecification(Expression<Func<Product, bool>> criteria) : base(criteria)
        {

            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
        public ProductWithTypeAndBrandSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
        public ProductWithTypeAndBrandSpecification(ProductSpecParams productSpecParams) : base(x =>
            (productSpecParams.Search == null || x.Name.ToLower().Contains(productSpecParams.Search)) &&
            (!productSpecParams.BrandId.HasValue || x.ProductBrandId == productSpecParams.BrandId) &&
            (!productSpecParams.TypeId.HasValue || x.ProductTypeId == productSpecParams.TypeId))
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(productSpecParams.PageSize * (productSpecParams.PageIndex - 1), productSpecParams.PageSize);
            if(string.IsNullOrEmpty(productSpecParams.Sort)) return;
            switch (productSpecParams.Sort)
            {
                case "priceAsc":
                    AddOrderBy(x => x.Price);
                    break;
                case "priceDesc":
                    AddOrderByDescending(x => x.Price);
                    break;
                default:
                    AddOrderBy(x => x.Name);
                    break;
            }
        }
    }
}