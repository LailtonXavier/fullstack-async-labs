import { useLogout } from '@/hooks/auth/useLogout';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const { logout } = useLogout();

  return (
    <button 
      onClick={logout}
      title="Sair"
      className={`
        group flex items-center justify-center 
        h-10 w-10 rounded-xl transition-all duration-300
        bg-black/10 dark:bg-white/10 
        backdrop-blur-md backdrop-saturate-150 
        border border-white/20 dark:border-black/20
        hover:bg-red-500/20 hover:border-red-500/40
        cursor-pointer
      `}
    >
      <LogOut 
        size={18} 
        className="text-zinc-700 dark:text-zinc-300 group-hover:text-red-500 transition-colors" 
      />
    </button>
  );
}