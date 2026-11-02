import { Outlet, useLocation, useMatch, Link } from "react-router";
import AppSidebar from "@/components/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { menuItems } from "@/lib/constants";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import type { CustomerType } from "@/lib/types";
import { getCustomerInfo } from "@/features/customers/backend/getCustomerInfo";
import { Skeleton } from "@/components/ui/skeleton";

const AppLayout = () => {
  const { pathname } = useLocation();
  const customerMatch = useMatch("/customers/:customerId");
  const customerId = customerMatch?.params.customerId;

  const isCustomerDetails = !!customerMatch;

  const pageName = menuItems.find((item) => item.url === pathname)?.title;

  const { data: customerInfo } = useQuery<CustomerType>({
    queryKey: ["customerInfo", customerId],
    queryFn: () => getCustomerInfo(Number(customerId)),
    enabled: isCustomerDetails && !!customerId,
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Breadcrumb className="ml-10">
            <BreadcrumbList>
              {isCustomerDetails ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink render={<Link to="/customers" />}>
                      Customers
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {customerInfo?.name ?? <Skeleton className="h-4 w-32" />}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{pageName}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
