'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, UtensilsCrossed, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Salón', icon: LayoutDashboard, href: '/salon' },
    { label: 'Menú', icon: UtensilsCrossed, href: '/menu' },
    { label: 'Reservas', icon: Users, href: '/reservas' },
    { label: 'Cocina', icon: ChefHat, href: '/cocina' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-64 border-r bg-white flex flex-col hidden sm:flex">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <UtensilsCrossed className="h-6 w-6 text-orange-500" />
          <span className="text-xl">GastroTech <span className="text-orange-500">Pro</span></span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all my-1 hover:text-primary",
                pathname.startsWith(item.href) ? "bg-orange-100 text-orange-700" : "text-gray-500"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
