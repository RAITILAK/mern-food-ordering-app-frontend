import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrderRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get order");
    }

    return response.json();
  };

  const { data: orders = [], isLoading } = useQuery<Order[]>(
    "fetchMyOrder",
    getMyOrderRequest,
    {
      refetchInterval: 5000,
      enabled: true,
    }
  );

  return { orders, isLoading };
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

// Custom hook to encapsulate the logic
const useCreateCheckoutSessionRequest = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const { restaurantId } = checkoutSessionRequest;

    console.log("Checkout Request Payload:", checkoutSessionRequest);

    if (!restaurantId) {
      throw new Error("Restaurant ID is required");
    }

    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }

    return response.json();
  };

  return createCheckoutSessionRequest;
};

export const useCreateCheckoutSession = () => {
  const createCheckoutSessionRequest = useCreateCheckoutSessionRequest(); // Call the custom hook
  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  useEffect(() => {
    if (error) {
      toast.error(error.toString());
      console.error("Checkout session error:", error);
      reset();
    }
  }, [error, reset]);

  return {
    createCheckoutSession,
    isLoading,
  };
};
