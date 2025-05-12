"use client";

import {useState} from "react";
import {useAuth} from "@/contexts/auth-context";
import {Home, LogOut, Menu, StretchHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  SidebarContainer,
  SidebarHeader,
  Logo,
  SidebarContent,
  NavList,
  NavItem,
  NavLink,
  SidebarFooter,
  MobileToggle,
  Overlay,
} from "./style";
import {usePathname} from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const {logout} = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };
  const pathname = usePathname();

  return (
    <>
      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <Logo>Dashboard Financeiro</Logo>
        </SidebarHeader>
        <SidebarContent>
          <NavList>
            <NavItem>
              <NavLink
                href="/dashboard"
                className={pathname === "/dashboard" ? "active" : ""}
                onClick={closeSidebar}
              >
                <Home size={18} />
                Início
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/historic"
                className={pathname === "/historic" ? "active" : ""}
                onClick={closeSidebar}
              >
                <StretchHorizontal size={18} />
                Transações
              </NavLink>
            </NavItem>
          </NavList>
        </SidebarContent>

        <SidebarFooter>
          <Button
            variant="outline"
            className="w-full justify-start text-white border-white/20 hover:bg-white/5 bg-white/10 hover:text-white"
            onClick={logout}
          >
            <LogOut size={18} className="mr-2" />
            Sair
          </Button>
        </SidebarFooter>
      </SidebarContainer>

      <Overlay $isOpen={isOpen} onClick={closeSidebar} />

      <MobileToggle onClick={toggleSidebar}>
        <Menu size={24} />
      </MobileToggle>
    </>
  );
}
