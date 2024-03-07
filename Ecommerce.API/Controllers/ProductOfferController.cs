using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.API.Hub;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Ecommerce.API.Controllers
{
    
    public class ProductOfferController : BaseApiController
    {
        private IHubContext < NotificationHub, INotificationHubClient > messageHub;
        public ProductOfferController(IHubContext < NotificationHub, INotificationHubClient > _messageHub) {
                messageHub = _messageHub;
            }
            [HttpPost]
            [Route("productoffers")]
        public string Get() {
            List < string > offers = new List < string > ();
            offers.Add("20% Off on IPhone 12");
            offers.Add("15% Off on HP Pavillion");
            offers.Add("25% Off on Samsung Smart TV");
            messageHub.Clients.All.SendOffersToUser(offers);
            return "Offers sent successfully to all users!";
        }
    }
}