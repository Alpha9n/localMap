import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Link from "next/link";
import { ThemeSwitch } from "./ThemeSwitch";

const Header = () => {

    return (
      <Navbar>
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">ご当地マップ</Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown
              placement="bottom"
            >
              <DropdownTrigger>
                <Avatar name="test" className="cursor-pointer" isBordered as={'button'}/>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key={'settings'} href="/settings">
                  設定
                </DropdownItem>
                <DropdownItem key={'login'} isDisabled>
                  ログイン
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
};

export default Header;