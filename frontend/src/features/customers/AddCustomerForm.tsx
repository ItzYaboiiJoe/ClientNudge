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
import { PlusIcon } from "lucide-react";

// Form Schema
const addCustomerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.email("Enter a valid email").trim().toLowerCase().or(z.literal("")),
  address: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

const AddCustomerForm = ({ onSuccess }: { onSuccess: () => void }) => {
  // State to handle register errors
  const [errorAddCustomer, setErrorAddCustomer] = useState<string | null>(null);
  // State to control the spinner loading
  const [loading, setLoading] = useState(false);

  // Create Form Instance
  const addCustomerForm = useForm<z.infer<typeof addCustomerSchema>>({
    resolver: zodResolver(addCustomerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    },
  });

  // Form Submit Handler
  async function onSubmit(data: z.infer<typeof addCustomerSchema>) {
    // Clear Error
    setErrorAddCustomer(null);
    // Activate loading spinner
    setLoading(true);
    console.log(data);
    // Display success message and disable spinner loading
    toast.add({
      type: "success",
      description: `Customer ${data.name} Added Successfully`,
      priority: "high",
    });
    // Close modal
    onSuccess();
  }

  return (
    <div>
      <form
        id="add-customer-form"
        onSubmit={addCustomerForm.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          {/* Customer Name */}
          <Controller
            name="name"
            control={addCustomerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-customer-form-name">
                  Customer Name
                </FieldLabel>
                <Input
                  {...field}
                  id="add-customer-form-name"
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
            control={addCustomerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-customer-form-phone">
                  Phone Number
                </FieldLabel>
                <Input
                  {...field}
                  id="add-customer-form-phone"
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
            control={addCustomerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-customer-form-email">
                  Email Address{" "}
                  <span className="text-sm text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>
                <Input
                  {...field}
                  id="add-customer-form-email"
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
            control={addCustomerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-customer-form-address">
                  Service Address{" "}
                  <span className="text-sm text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>
                <Input
                  {...field}
                  id="add-customer-form-address"
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
            control={addCustomerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-customer-form-notes">
                  Notes{" "}
                  <span className="text-sm text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>
                <Textarea
                  {...field}
                  id="add-customer-form-notes"
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
        </FieldGroup>
      </form>
      {/* Submit Button */}
      <div className="flex justify-end mt-5">
        <Button disabled={loading} type="submit" form="add-customer-form">
          <PlusIcon />
          {loading ? (
            <div className="flex items-center space-x-2">
              <Spinner className="size-8" /> <span>Adding Customer...</span>
            </div>
          ) : (
            "Add Customer"
          )}
        </Button>

        {/* Display Error Message */}
        {errorAddCustomer && (
          <p className="text-md text-center text-red-700 font-semibold">
            {errorAddCustomer}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddCustomerForm;
