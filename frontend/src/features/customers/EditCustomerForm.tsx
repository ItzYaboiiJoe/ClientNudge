import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";

// Fake Data
const customer = {
  id: 1,
  name: "Sarah Johnson",
  phone: "(555) 123-4567",
  email: "sarah@example.com",
  address: "123 Oak Street",
  notes:
    "Prefers morning appointments. Has a dog on the property. Interested in seasonal maintenance and possible additional services in the future.",
  status: true,
};

// Form schema
const editCustomerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.email("Enter a valid email").trim().toLowerCase().or(z.literal("")),
  address: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  status: z.boolean(),
});

const EditCustomerForm = ({ onSuccess }: { onSuccess: () => void }) => {
  // State to handle register errors
  const [errorEditCustomer, setErrorEditCustomer] = useState<string | null>(
    null,
  );
  // State to control the spinner loading
  const [loading, setLoading] = useState(false);

  // Create Form Instance
  const editCustomerForm = useForm<z.infer<typeof editCustomerSchema>>({
    resolver: zodResolver(editCustomerSchema),
    defaultValues: {
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      notes: customer.notes,
      status: customer.status,
    },
  });

  // Form Submit Handler
  async function onSubmit(data: z.infer<typeof editCustomerSchema>) {
    // Clear Error
    setErrorEditCustomer(null);
    // Activate loading spinner
    setLoading(true);
    console.log(data);
    // Display success message and disable spinner loading
    toast.add({
      type: "success",
      description: `${data.name}'s information updated successfully.`,
      priority: "high",
    });
    // Close modal
    onSuccess();
  }

  return (
    <div>
      <form
        id="edit-customer-form"
        onSubmit={editCustomerForm.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          {/* Customer Name */}
          <Controller
            name="name"
            control={editCustomerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-customer-form-name">
                  Customer Name
                </FieldLabel>
                <Input
                  {...field}
                  id="edit-customer-form-name"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  maxLength={100}
                  placeholder="e.g. John Smith"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Phone Number */}
          <Controller
            name="phone"
            control={editCustomerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-customer-form-phone">
                  Phone Number
                </FieldLabel>
                <Input
                  {...field}
                  id="edit-customer-form-phone"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  maxLength={25}
                  placeholder="e.g. (555) 123-4567"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Email Address */}
          <Controller
            name="email"
            control={editCustomerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-customer-form-email">
                  Email Address{" "}
                  <span className="text-sm text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>
                <Input
                  {...field}
                  id="edit-customer-form-email"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  maxLength={254}
                  placeholder="e.g. john@example.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Service Address */}
          <Controller
            name="address"
            control={editCustomerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-customer-form-address">
                  Service Address{" "}
                  <span className="text-sm text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>
                <Input
                  {...field}
                  id="edit-customer-form-address"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  maxLength={255}
                  placeholder="e.g. 123 Oak street"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Notes */}
          <Controller
            name="notes"
            control={editCustomerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-customer-form-notes">
                  Notes{" "}
                  <span className="text-sm text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>
                <Textarea
                  {...field}
                  id="edit-customer-form-notes"
                  aria-invalid={fieldState.invalid}
                  maxLength={1000}
                  placeholder="Additional information about this customer..."
                  className="min-h-24 max-h-24 overflow-y-auto resize-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Status */}
          <Controller
            name="status"
            control={editCustomerForm.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Customer Status</FieldLabel>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">
                      {field.value ? "Active" : "Inactive"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {field.value
                        ? "This customer is currently active in your customer list."
                        : "This customer is marked as inactive but their records are preserved."}
                    </p>
                  </div>
                  <Switch
                    id="edit-customer-form-status"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      {/* Submit Button */}
      <div className="flex justify-end mt-5">
        <Button disabled={loading} type="submit" form="edit-customer-form">
          {loading ? (
            <div className="flex items-center space-x-2">
              <Spinner className="size-8" /> <span>Saving...</span>
            </div>
          ) : (
            "Save"
          )}
        </Button>

        {/* Display Error Message */}
        {errorEditCustomer && (
          <p className="text-md text-center text-red-700 font-semibold">
            {errorEditCustomer}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditCustomerForm;
