import {
  Menu,
  Bell,
  Home,
  Briefcase,
  Plane,
  House,
  Car,
  Wallet,
  User,
  Star,
} from "lucide-react";

export default function PhoneMockup() {
  return (
    <div className="flex justify-center lg:justify-end">
      {/* Phone */}

      <div className="w-[330px] h-[645px] rounded-[40px] border-[6px] border-[#3b3b3b] bg-[#111827] p-5 shadow-2xl m-5">
        {/* Notch */}

        <div className="mx-auto mb-6 h-2 w-24 rounded-full bg-[#2d3748]" />

        {/* Top */}

        <div className="mb-4 flex items-center justify-between">
          <Menu className="text-white" size={22} />

          <h2 className="text-2xl font-bold text-white">Torkk</h2>

          <Bell className="text-white" size={22} />
        </div>

        {/* Heading */}

        <h3 className="mb-5 text-2xl font-bold text-white">Where to?</h3>

        {/* Pickup Card */}

        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-blue-600"></span>

            <span className="text-base text-gray-800">Pickup location</span>
          </div>

          <hr className="my-4" />

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-pink-500"></span>

            <span className="text-base text-gray-800">Destination</span>
          </div>
        </div>

        {/* Recent */}

        <h4 className="mt-6 mb-3 text-lg font-semibold text-white">
          Recent Places
        </h4>

        <div className="flex flex-col gap-3">
          <Place
            icon={<House size={22} />}
            title="Home"
            subtitle="12, Green Park, Delhi"
          />

          <Place
            icon={<Briefcase size={22} />}
            title="Office"
            subtitle="Cyber City, Gurugram"
          />

          <Place
            icon={<Plane size={22} />}
            title="Airport"
            subtitle="Indira Gandhi Airport"
          />
        </div>

        {/* Bottom Navigation */}

        <div className="mt-6 flex justify-around border-t border-gray-700 pt-4">
          <NavItem icon={<Home size={22} />} label="Home" active />

          <NavItem icon={<Car size={22} />} label="Rides" />

          <NavItem icon={<Wallet size={22} />} label="Wallet" />

          <NavItem icon={<User size={22} />} label="Profile" />
        </div>
      </div>
    </div>
  );
}

function Place({ icon, title, subtitle }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
      <div className="flex items-center gap-4">
        <div className="text-gray-700">{icon}</div>

        <div>
          <h5 className="font-semibold text-gray-900">{title}</h5>

          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>

      <Star size={16} className="text-gray-400" />
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div
      className={`flex flex-col items-center gap-1 ${
        active ? "text-blue-500" : "text-gray-400"
      }`}
    >
      {icon}

      <span className="text-xs">{label}</span>
    </div>
  );
}
