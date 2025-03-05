import { useGetMyOrder } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Order } from "@/types";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrder();

  if (isLoading) {
    return "Loading...";
  }

  if (!orders || orders.length === 0) {
    return "No orders found!";
  }
  return (
    <div className="space-y-10 px-4 md:px-0">
      {orders.map((order: Order) => (
        <div
          key={order._id}
          className="space-y-10 bg-gray-50 rounded-lg px-4 py-6 md:px-10"
        >
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
