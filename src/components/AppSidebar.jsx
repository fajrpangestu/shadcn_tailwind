// import { Home, Inbox, Calendar, Search, Settings, User2, ChevronUp } from "lucide-react";

// import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

// // Menu navigasi utama
// const items = [
//   { title: "Home", url: "#", icon: Home },
//   { title: "Inbox", url: "#", icon: Inbox },
//   { title: "Calendar", url: "#", icon: Calendar },
//   { title: "Search", url: "#", icon: Search },
//   { title: "Settings", url: "#", icon: Settings },
// ];

// export function AppSidebar() {
//   return (
//     <Sidebar collapsible="icon">
//       {/* Header Aplikasi / Logo */}
//       <SidebarHeader>
//         <div className="flex items-center gap-2 py-2">
//           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">P</div>
//           <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
//             <span className="text-sm font-semibold">Point Of Sale</span>
//             <span className="text-xs text-muted-foreground">PPKD Jakarta Pusat</span>
//           </div>
//         </div>
//       </SidebarHeader>

//       {/* Menu / Navigasi Utama */}
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Menu Navigasi</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton tooltip={item.title} render={<a href={item.url} />}>
//                     <item.icon />
//                     <span>{item.title}</span>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       {/* Bagian Bawah / Profil User */}
//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton tooltip="John Doe">
//               <User2 />
//               <span className="font-medium">John Doe</span>
//               <ChevronUp className="ml-auto" />
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }


import { Home, Inbox, Calendar, Search, Settings, User2, ChevronUp, Store } from "lucide-react"; // 1. Menambahkan ikon Store

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

// Menu navigasi utama
const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* Header Aplikasi / Logo */}
      <SidebarHeader>
        <div className="flex items-center gap-2 py-2">
          {/* 2. Mengubah inisial teks "P" menjadi komponen ikon Store */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Store className="h-5 w-5" />
          </div>
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">Point Of Sale</span>
            <span className="text-xs text-muted-foreground">PPKD Jakarta Pusat</span>
          </div>
        </div>
      </SidebarHeader>

      {/* Menu / Navigasi Utama */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Navigasi</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} render={<a href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bagian Bawah / Profil User */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="John Doe">
              <User2 />
              <span className="font-medium">John Doe</span>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}