import { Header, NavItem } from "@/widgets/Header";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Header title="PLANIT" userName="PLANIT">
        <NavItem href="/dashboard">대시보드</NavItem>
        <NavItem href="/attendance">출결관리</NavItem>
      </Header>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
