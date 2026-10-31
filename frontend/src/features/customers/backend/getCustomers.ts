import { supabase } from "@/lib/db/supabaseClient";
import { backendUrl } from "@/lib/constants";
import type { CustomerType } from "@/lib/types";

export const getCustomers = async (): Promise<CustomerType[]> => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    throw new Error("You must be logged in to fetch customers.");
  }

  const response = await fetch(`${backendUrl}/api/customers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.session.access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return await response.json();
};
