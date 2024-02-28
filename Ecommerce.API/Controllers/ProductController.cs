using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.API.Dto;
using Ecommerce.API.Error;
using Ecommerce.API.Helpers;
using Ecommerce.Core.Entities;
using Ecommerce.Core.Implementation;
using Ecommerce.Core.Interface;
using Ecommerce.Infrastructure.Specification;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers
{
    
    public class ProductController : BaseApiController
    {
        public IGenericRepository<ProductBrand> _productBrandRepo { get; set; }
        public IMapper _mapper { get; set; }
        
        public IGenericRepository<ProductType> _productTypeRepo { get; set; }
        public IGenericRepository<Product> _productRepo { get; set;}
        public ProductController(IGenericRepository<Product> productRepo,IGenericRepository<ProductBrand> productBrandRepo,
        IGenericRepository<ProductType> productTypeRepo,IMapper mapper)
        {
            _mapper = mapper;
            _productBrandRepo = productBrandRepo;
           _productRepo = productRepo;
            _productTypeRepo = productTypeRepo;
        }
        [HttpGet("products")]
        public async Task<ActionResult<Pagination<ProductDto>>> GetProducts([FromQuery] ProductSpecParams productSpecParams) 
        {
            var spec=new ProductWithTypeAndBrandSpecification(productSpecParams);
            var countSpec=new ProductWithFilterCountSpecification(productSpecParams);
            var totalItems = await _productRepo.CountAsync(countSpec);

            var products = await _productRepo.ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductDto>>(products);
            return Ok(new Pagination<ProductDto>(productSpecParams.PageIndex,productSpecParams.PageSize,totalItems,data));
        }
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ProductDto),StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiErrorResponse),StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetProduct(int id)
        {
            var spec=new ProductWithTypeAndBrandSpecification(id);
            var product = await _productRepo.GetEntityWithSpec(spec);
            if(product==null) return NotFound(new ApiErrorResponse(404));
            return Ok(_mapper.Map<Product,ProductDto>(product));
        }
        // [HttpGet("brands")]
        // public async Task<IActionResult> GetProductBrands()
        // {
        //     var
        //     var productBrands = await _productBrandRepo.GetAllAsync();
        //     return Ok(productBrands);
        // }
        // [HttpGet("types")]
        // public async Task<IActionResult> GetProductTypes()
        // {
        //     var productTypes = await _productTypeRepo.GetAllAsync();
        //     return Ok(productTypes);
        // }
        
    }
}