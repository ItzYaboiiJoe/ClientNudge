import { APP_NAME } from "@/lib/constants";

const HomeFooter = () => {
  return (
    <div className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <a href="#top" className="font-semibold">
          {APP_NAME}
        </a>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default HomeFooter;
