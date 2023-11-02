import { UserNav } from "./user-nav";

const Navbar = () => {
  return (
    <nav className="p-4 border-b border-slate-600 shadow-sm  flex items-center ">
      <UserNav />
    </nav>
  );
};

export default Navbar;
