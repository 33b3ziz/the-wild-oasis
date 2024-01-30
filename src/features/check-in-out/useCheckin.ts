import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: (bookingID: number) =>
      updateBooking(+bookingID, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in!`);
      queryClient.invalidateQueries({ refetchType: "active" });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
