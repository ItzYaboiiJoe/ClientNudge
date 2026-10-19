import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Mail, MapPin, Phone } from "lucide-react";

const CustomerDetailsInfo = () => {
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
                  <p>(555) 123-4567</p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p>john@example.com</p>
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
                  <p>
                    123 Oak Street
                    <br />
                    Tampa, FL 33602
                  </p>
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
                    Prefers morning appointments. Has a dog on the property.
                    Interested in seasonal maintenance and possible additional
                    services in the future.
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
