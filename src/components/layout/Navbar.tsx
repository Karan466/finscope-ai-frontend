import { Bell, Search, UserCircle2 } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md px-6 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search records, approvals..."
          className="bg-transparent outline-none w-full text-sm text-white placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl">
          <UserCircle2 size={28} className="text-primary" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Karan</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;