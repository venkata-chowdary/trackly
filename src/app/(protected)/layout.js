import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"


export default function Layout({ children }) {
    return (
        (<SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)"
                }
            }>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <main className="flex flex-1 flex-col py-3 md:py-4 px-5 md:px-8">{children}</main>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>)
    );
}
