import styled from "styled-components";

export const SidebarContainer = styled.aside<{$isOpen: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #1e293b;
  color: white;
  transition: transform 0.3s ease;
  z-index: 50;

  @media (max-width: 768px) {
    transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
    box-shadow: ${(props) =>
      props.$isOpen ? "0 0 10px rgba(0, 0, 0, 0.1)" : "none"};
  }
`;

export const Overlay = styled.div<{$isOpen: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: ${(props) => (props.$isOpen ? "block" : "none")};

  @media (min-width: 769px) {
    display: none;
  }
`;

export const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Logo = styled.h1`
  font-size: 19px;
  font-weight: 600;
  color: white;
`;

export const SidebarContent = styled.div`
  padding: 1.5rem;
  margin-bottom: 10px;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  margin-bottom: 10px;
`;

export const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s;

  &:hover,
  &.active {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

export const SidebarFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const MobileToggle = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 100;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #1e293b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;
