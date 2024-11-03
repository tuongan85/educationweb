import { Logo } from "./logo";
import SidebarRoutes from "./sidebarroutes";

export const Sidebar = () => {
  return (
      <div className="h-full w-51 border-r flex flex-col overflow-y-auto bg-white shadow-sm">
        <div className="p-6">
          <Logo/>
        </div>
        <div className="flex flex-col w-full">
          <SidebarRoutes/>
        </div>
      </div>
  );
};


