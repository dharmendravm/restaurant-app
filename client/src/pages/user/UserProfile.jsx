import { getUserThunk } from "@/redux/userSlice";
import {
  Mail,
  Phone,
  ShoppingBag,
  User,
  IndianRupee,
  ShieldCheck,
  Pencil,
  Lock,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/*  shared styles  */
const card = "rounded-2xl border border-border bg-card-bg p-6 shadow-sm";
const btnBase =
  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition";

/*  component  */
export default function UserProfile() {
  const userId = useSelector((s) => s.auth.user?.id);
  const { user, loading } = useSelector((s) => s.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId && !user) dispatch(getUserThunk());
  }, [userId, user, dispatch]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6 animate-pulse">
        <div className="h-56 rounded-3xl bg-muted-bg" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-muted-bg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* -------- HERO -------- */}
      <section
        className="relative overflow-hidden rounded-3xl border border-border
        bg-linear-to-br from-card-bg/40 via-card-bg to-card-bg text-text-main"
      >
        <div className="absolute -top-24 -right-24 h-96 w-96 bg-brand-fade blur-3xl rounded-full" />

        <div className="relative p-8 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="h-24 w-24 rounded-2xl flex items-center justify-center ">
            <Avatar name={user?.name} />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-text-main">
              {user?.name}
            </h1>
            <p className="text-sm opacity-90 capitalize text-text-muted">
              {user?.role} · {user?.accountType}
            </p>

            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-xs
                ${
                  user?.isActive
                    ? "bg-admin/20 text-admin"
                    : "bg-danger/20 text-danger"
                }`}
            >
              {user?.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex gap-2">
            <Btn icon={<Pencil size={16} />} />
            <Btn variant="ghost" icon={<Lock size={16} />} />
          </div>
        </div>
      </section>

      {/* -------- STATS -------- */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Stat icon={<ShoppingBag />} label="Orders" value={user?.totalOrders} />
        <Stat
          icon={<IndianRupee />}
          label="Spend"
          value={`₹ ${user?.totalSpends}`}
        />
        <Stat
          icon={<ShieldCheck />}
          label="Status"
          value={user?.isActive ? "Verified" : "Inactive"}
        />
      </section>

      {/* -------- DETAILS -------- */}
      <section className="grid lg:grid-cols-2 gap-6">
        <div className={card}>
          <h3 className="font-semibold mb-4">Personal Info</h3>
          <Row icon={<Mail size={16} />} label="Email" value={user?.email} />
          <Row
            icon={<Phone size={16} />}
            label="Phone"
            value={user?.phone || "—"}
          />
        </div>

        <div className={card}>
          <h3 className="font-semibold mb-4">Account</h3>
          <div className="space-y-3">
            <Btn variant="primary" full>
              Update Profile
            </Btn>
            <Btn full>Change Password</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

/*  small helpers  */

const Btn = ({ children, icon, variant = "default", full }) => {
  const styles = {
    primary: "bg-brand-main text-white hover:bg-orange-600",
    ghost: "bg-black/30 hover:bg-black/40",
    default: "border border-border hover:bg-hover",
  };

  return (
    <button
      className={`${btnBase} ${styles[variant]} ${
        full ? "w-full justify-center" : ""
      }`}
    >
      {icon}
      {children}
    </button>
  );
};

const Stat = ({ icon, label, value }) => (
  <div className={card}>
    <div className="flex items-center gap-4">
      <div className="h-11 w-11 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-text-muted">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const Row = ({ icon, label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-none">
    <div className="flex items-center gap-2 text-sm text-text-muted">
      {icon}
      {label}
    </div>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

const Avatar = ({ name }) => {
  const parts = name?.trim().split(" ") || [];
  {
    console.log(parts);
  }
  const initials =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : parts[0]?.[0] || "?";

  return (
    <div className="h-20 w-20 rounded-full bg-card-bg text-text-muted flex items-center justify-center font-semibold uppercase text-lg sm:text-xl md:text-2xl">
      {initials}
    </div>
  );
};
