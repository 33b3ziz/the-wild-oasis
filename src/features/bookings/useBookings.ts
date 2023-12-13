import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
// import { Booking } from "./BookingTable";

// export type BookingQuery = {
//   data:
//     | {
//         id: number;
//         createdAt: Date;
//         startDate: Date;
//         endDate: Date;
//         numNights: number;
//         numGuests: number;
//         status: string;
//         totalPrice: number;
//         cabins: {
//           name: string;
//         }[];
//         guests: {
//           fullName: string;
//           email: string;
//         }[];
//       }
//     | undefined;
// };

export function useBookings() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { bookings, isLoading, error };
}
