"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Select, SelectItem } from "@nextui-org/react";

type Theme = 'system' | 'dark' | 'light';

const themeList = [
  {label: 'System', value: 'system'},
  {label: 'Dark', value: 'dark'},
  {label: 'Light', value: 'light'}
]

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    console.log(theme);
    
  }, [theme]);

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
        {themeList.map((theme) => {
          return (<SelectItem key={theme.value} value={theme.value}>{theme.label}</SelectItem>)
        })}
    </Select>
  );
};