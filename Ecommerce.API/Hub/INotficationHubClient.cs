namespace Ecommerce.API.Hub {
    public interface INotificationHubClient {
        Task SendOffersToUser(List < string > message);
    }
}