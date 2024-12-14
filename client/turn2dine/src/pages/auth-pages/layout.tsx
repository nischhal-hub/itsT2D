import { Outlet } from "react-router";
import { AppSidebar } from "../../components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";

export default function Layout() {
    return (
        <>
            <div>
                <SidebarProvider>
                    <AppSidebar />
                    <div className="relative">
                        <SidebarTrigger className="absolute"/>
                        <Outlet />
                    </div>
                </SidebarProvider>
            </div>
        </>
    )
}
