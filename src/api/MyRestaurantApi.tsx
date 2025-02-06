// import { Restaurant } from "@/types";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useMutation, useQuery } from "react-query";
// import { toast } from "sonner";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useGetMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();
//   console.log("Access Token:", accessToken); // Debugging

//   const getMyRestaurantRequest = async (): Promise<Restaurant> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       console.log("API Response Status:", response.status); // Debugging

//       throw new Error("Failed to get restaurant");
//     }

//     return response.json();
//   };

//   const { data: restaurant, isLoading } = useQuery(
//     "fetchMyRestaurant",
//     getMyRestaurantRequest
//   );

//   return {
//     restaurant,
//     isLoading,
//   };
// };

// export const useCreateMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const CreateMyRestaurantRequest = async (
//     restaurantFormData: FormData
//   ): Promise<Restaurant> => {
//     // const accessToken = await getAccessTokenSilently();

//     //debugging
//     const accessToken = await getAccessTokenSilently();
//     console.log("Access Token:", accessToken); // Debugging
//     if (!accessToken) {
//       throw new Error("Access token is missing");

//       //
//     }

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: restaurantFormData,
//     });
//     if (!response.ok) {
//       throw new Error("Failed to create restaurant");
//     }

//     // return response.json();
//     //debugging
//     const data = await response.json();
//     console.log("API Response:", data); // Debugging
//     return data;
//     //
//   };

//   const {
//     mutate: createRestaurant,
//     isLoading,
//     isSuccess,
//     error,
//   } = useMutation(CreateMyRestaurantRequest);

//   if (isSuccess) {
//     toast.success("Restaurant created!");
//   }

//   if (error) {
//     toast.error("Unable to update restaurant");
//   }

//   return { createRestaurant, isLoading };
// };

import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ FIXED: Moved console.log inside function
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    console.log("Access Token:", accessToken); // ✅ Corrected

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.log("API Response Status:", response.status); // ✅ Debugging
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return {
    restaurant,
    isLoading,
  };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const CreateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    console.log("Access Token:", accessToken); // ✅ Debugging

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    const data = await response.json();
    console.log("API Response:", data); // ✅ Debugging
    return data;
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(CreateMyRestaurantRequest);

  // ✅ FIXED: Moved toast inside useEffect
  useEffect(() => {
    if (isSuccess) {
      toast.success("Restaurant created!");
    }
    if (error) {
      toast.error("Unable to update restaurant");
    }
  }, [isSuccess, error]);

  return { createRestaurant, isLoading, error };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    if (!response) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant Updated");
  }

  if (error) {
    toast.error("Unable to update restaurant!");
  }

  return { updateRestaurant, isLoading };
};
