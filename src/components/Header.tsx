import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar } from "@nextui-org/react";
import Link from "next/link";

const Header = () => {
    return (
      <Navbar>
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">ご当地マップ</Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Avatar name="test" className="cursor-pointer" as={Link} href="/settings"/>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
};

export default Header;