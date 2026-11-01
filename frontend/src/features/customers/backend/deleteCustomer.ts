import { supabase } from "@/lib/db/supabaseClient";
import { backendUrl } from "@/lib/constants";

export const deleteCustomer = async (id: number) => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    throw new Error("You must be logged in to delete a customer.");
  }

  const response = await fetch(`${backendUrl}/api/customers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${data.session.access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete customer.");
  }

  return await response.json();
};
