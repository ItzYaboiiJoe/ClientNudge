import { supabase } from "@/lib/db/supabaseClient";
import { backendUrl } from "@/lib/constants";
import type { EditCustomerType } from "@/lib/types";

export const updateCustomer = async (
  id: number,
  formData: EditCustomerType,
): Promise<void> => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    throw new Error("You must be logged in to fetch customers info.");
  }

  const response = await fetch(`${backendUrl}/api/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.session.access_token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to update customer info.");
  }

  return await response.json();
};
