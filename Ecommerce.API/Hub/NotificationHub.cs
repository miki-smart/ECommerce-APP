using Microsoft.AspNetCore.SignalR;

namespace Ecommerce.API.Hub {
   public class NotificationHub: Hub <INotificationHubClient> {
        public async Task SendOffersToUser(List <string> message) {
            await Clients.All.SendOffersToUser(message);
        }
    }
    }
