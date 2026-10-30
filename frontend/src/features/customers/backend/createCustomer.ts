import { supabase } from "@/lib/db/supabaseClient";
import { backendUrl } from "@/lib/constants";

export type CreateCustomerType = {
  name: string;
  phone: string;
  email: string;
  address?: string;
  notes?: string;
};

export const createCustomer = async (customer: CreateCustomerType) => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    throw new Error("You must be logged in to add a customer.");
  }

  const response = await fetch(`${backendUrl}/api/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.session?.access_token}`,
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error("Failed to add customer");
  }

  return await response.json();
};
