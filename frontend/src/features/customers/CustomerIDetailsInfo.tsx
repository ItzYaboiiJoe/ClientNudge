import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CustomerType } from "@/lib/types";
import { FileText, Mail, MapPin, Phone } from "lucide-react";

const CustomerDetailsInfo = ({
  customerInfo,
}: {
  customerInfo: CustomerType;
}) => {
  // To Formate the phone to look nicer
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length !== 10) {
      return phone;
    }

    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  };

  return (
    <div>
      <Card className="shadow-xl">
        <CardContent>
          <h2 className="mb-6 text-xl font-semibold">Contact Information</h2>
          <div className="grid gap-6 sm:grid-cols-[1fr_1px_1fr]">
            <div className="flex flex-col gap-5">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p>{formatPhoneNumber(customerInfo.phone)}</p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p>{customerInfo.email || "—"}</p>
                </div>
              </div>
              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Service Address
                  </p>
                  <p>{customerInfo.address || "—"}</p>
                </div>
              </div>
            </div>
            <Separator orientation="vertical" className="h-full w-px" />
            {/* Notes */}
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted">
                <FileText className="size-5" />
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm text-muted-foreground">Notes</p>

                <div className="min-h-32 rounded-xl bg-muted p-4">
                  <p className="text-sm">
                    {customerInfo.notes || "No Notes for this customer"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDetailsInfo;
