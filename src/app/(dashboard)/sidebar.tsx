import { Logo } from './logo';
import { SidebarRoutes } from './sidebar-routes';

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed flex-col w-64 2xl:w-[300px] left-0 shrink-0 h-full">
      <Logo />
      <SidebarRoutes />
    </aside>
  );
}
