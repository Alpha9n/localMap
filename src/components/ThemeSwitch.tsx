"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Select, SelectItem } from "@nextui-org/react";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Select 
    label="テーマを選択" 
    defaultSelectedKeys={theme}
    onChange={(e) => {setTheme(e.target.value)}}
    className="w-full" 
    >
        <SelectItem value={'system'} key={'system'}>
            System
        </SelectItem>
        <SelectItem value={'dark'} key={'dark'}>
            Dark
        </SelectItem>
        <SelectItem value={'light'} key={'light'}>
            Light
        </SelectItem>
    </Select>
  );
};