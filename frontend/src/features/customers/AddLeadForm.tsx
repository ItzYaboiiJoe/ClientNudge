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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { PlusIcon, CalendarIcon, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// Form Schema
const addLeadSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  value: z.number().min(0, "Value cannot be negative").optional(),
  status: z.enum(["Open", "In Progress", "Won", "Lost"]),
  date: z.date().optional(),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes cannot exceed 1000 characters")
    .optional(),
});

const AddLeadForm = ({ onSuccess }: { onSuccess: () => void }) => {
  // State to handle register errors
  const [errorAddLead, setErrorAddLead] = useState<string | null>(null);
  // State to control the spinner loading
  const [loading, setLoading] = useState(false);

  // Create Form Instance
  const addLeadForm = useForm<z.infer<typeof addLeadSchema>>({
    resolver: zodResolver(addLeadSchema),
    defaultValues: {
      title: "",
      value: undefined,
      status: "Open",
      date: undefined,
      notes: "",
    },
  });

  // Form Submit Handler
  async function onSubmit(data: z.infer<typeof addLeadSchema>) {
    // Clear Error
    setErrorAddLead(null);
    // Activate loading spinner
    setLoading(true);
    console.log(data);
    // Display success message and disable spinner loading
    toast.add({
      type: "success",
      description: `Lead "${data.title}" added successfully.`,
      priority: "high",
    });
    // Close modal
    onSuccess();
  }

  return (
    <div>
      <form id="add-lead-form" onSubmit={addLeadForm.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Lead Name */}
          <Controller
            name="title"
            control={addLeadForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-lead-form-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="add-lead-form-title"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  maxLength={100}
                  placeholder="e.g. Lawn Maintenance"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="grid grid-cols-2 gap-10">
            {/* Value */}
            <Controller
              name="value"
              control={addLeadForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-lead-form-value">
                    Value{" "}
                    <span className="text-sm text-muted-foreground">
                      (Optional)
                    </span>
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : e.target.valueAsNumber,
                      )
                    }
                    id="add-lead-form-value"
                    aria-invalid={fieldState.invalid}
                    type="number"
                    placeholder="0.00"
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
              control={addLeadForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-lead-form-status">Status</FieldLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          id="add-lead-form-status"
                          variant="outline"
                          className="w-full justify-between"
                        />
                      }
                    >
                      {field.value}
                      <ChevronDown className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => field.onChange("Open")}
                        >
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => field.onChange("In Progress")}
                        >
                          In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("Won")}>
                          Won
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => field.onChange("Lost")}
                        >
                          Lost
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          {/* Follow up data */}
          <Controller
            name="date"
            control={addLeadForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-lead-form-date">
                  Next Follow-Up Date{" "}
                  <span className="text-sm text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        id="add-lead-form-date"
                        type="button"
                        variant="outline"
                        data-empty={!field.value}
                        className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                      />
                    }
                  >
                    <CalendarIcon />
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Notes */}
          <Controller
            name="notes"
            control={addLeadForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-lead-form-notes">
                  Notes{" "}
                  <span className="text-sm text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>
                <Textarea
                  {...field}
                  id="add-customer-lead-notes"
                  aria-invalid={fieldState.invalid}
                  maxLength={1000}
                  placeholder="Add any additional details about this lead..."
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
        <Button disabled={loading} type="submit" form="add-lead-form">
          <PlusIcon />
          {loading ? (
            <div className="flex items-center space-x-2">
              <Spinner className="size-8" /> <span>Adding Lead...</span>
            </div>
          ) : (
            "Add Lead"
          )}
        </Button>

        {/* Display Error Message */}
        {errorAddLead && (
          <p className="text-md text-center text-red-700 font-semibold">
            {errorAddLead}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddLeadForm;
