import { FaHome, FaListAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Cadastrar tópicos", path: "/main", icon: FaHome },
  { label: "Meus tópicos", path: "/show-topics", icon: FaListAlt },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-full shrink-0 border-b border-[#c9d8e8] bg-[#fffdf8] p-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:p-6">
      <div className="flex items-center justify-between gap-4 lg:block">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1555a0]">PUCTEC</p>
          <p className="mt-1 text-lg font-black text-[#172b50]">Ted Talks</p>
        </div>
        <nav className="flex gap-2 lg:mt-12 lg:block lg:space-y-3" aria-label="Navegação principal">
          {menuItems.map(({ label, path, icon: Icon }) => {
            const active = location.pathname === path;

            return (
              <button
                type="button"
                key={path}
                onClick={() => navigate(path)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition lg:w-full ${active
                  ? "bg-[#1555a0] text-white shadow-[0_8px_18px_rgba(21,85,160,0.2)]"
                  : "text-[#53627a] hover:bg-[#e6eef8] hover:text-[#1555a0]"
                  }`}
              >
                <Icon aria-hidden="true" />
                <span className="hidden sm:inline lg:inline">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
