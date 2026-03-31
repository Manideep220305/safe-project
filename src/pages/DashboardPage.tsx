import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, BatteryMedium, Wifi, Smartphone, Users, MapPin, Search, BellRing, Settings } from 'lucide-react';
import { useUser } from '@clerk/react';
import type { OrderStatus } from '../types';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

const STATUS_ICON: Record<OrderStatus, React.ElementType> = {
  Processing: Package,
  Shipped:    Truck,
  Delivered:  CheckCircle,
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  Processing: '#E8A838',
  Shipped:    '#4A90D9',
  Delivered:  '#2D9B6F',
};

const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    items: [{ name: 'Protect Pendant Advanced', quantity: 1, price: 2799 }],
    total: 2799,
    status: 'Shipped' as OrderStatus,
    createdAt: '2026-03-20',
  },
  {
    id: 'ORD-002',
    items: [{ name: 'Protect Pendant Basic', quantity: 2, price: 1999 }],
    total: 3998,
    status: 'Delivered' as OrderStatus,
    createdAt: '2026-03-10',
  },
];

const MOCK_CONTACTS = [
  { name: 'Mom (Home)', phone: '+91 98765 11111', relation: 'Primary', active: true },
  { name: 'Rohan Sharma', phone: '+91 98765 22222', relation: 'Brother', active: true },
  { name: 'Priya Patel', phone: '+91 98765 33333', relation: 'Friend', active: false },
];

export default function DashboardPage() {
  const { user } = useUser();

  const displayName  = user?.fullName ?? user?.firstName ?? 'there';
  const displayEmail = user?.primaryEmailAddress?.emailAddress ?? '';

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit"
      style={{ background: 'var(--color-off-white)', minHeight: '100vh', paddingTop: 100, paddingBottom: 100 }}
    >
      <div className="container-safe py-8">
        {/* Header Region */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block font-sans text-[11px] uppercase tracking-widest text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded-full mb-3">
              Control Center
            </motion.span>
            <h1 className="font-display font-bold text-slate-800" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Welcome back, {displayName} 👋
            </h1>
            {displayEmail && (
              <p className="font-sans text-[15px] mt-2 text-slate-500">{displayEmail}</p>
            )}
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 shadow-sm text-slate-600 px-5 py-2.5 rounded-full font-sans text-[13px] font-medium hover:bg-slate-50 transition-colors">
            <Settings size={16} /> Account Settings
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Dashboard Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Device Status Card */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="rounded-3xl p-8 noise-overlay overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg, #12242e 0%, #1c2e38 100%)', boxShadow: '0 24px 60px rgba(18,36,46,0.15)' }}
            >
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <h2 className="font-display font-semibold text-white text-2xl mb-1">Protect Pendant</h2>
                  <p className="font-sans text-[13px] text-white/60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active & Synced
                  </p>
                </div>
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/5 shadow-[0_0_30px_rgba(208,79,153,0.3)]">
                  <Smartphone size={24} className="text-rose-300" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 relative z-10">
                {[
                  { icon: BatteryMedium, label: 'Battery', value: '78%', sub: 'Approx. 34h left' },
                  { icon: MapPin, label: 'Location', value: 'Tracking', sub: 'High accuracy' },
                  { icon: Wifi, label: 'Connection', value: 'Paired', sub: 'Bluetooth 5.0' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors cursor-default">
                    <stat.icon size={18} className="text-white/70 mb-3" />
                    <p className="font-display font-medium text-white text-lg mb-0.5">{stat.value}</p>
                    <p className="font-sans text-[11px] uppercase tracking-wider text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Emergency Contacts */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-end mb-5">
                <h2 className="font-display font-semibold text-2xl text-slate-800 flex items-center gap-2">
                  <Users size={22} className="text-rose-500" /> Trusted Contacts
                </h2>
                <button className="text-[13px] font-sans font-medium text-rose-500 hover:text-rose-600 transition-colors">
                  + Add New
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_CONTACTS.map((contact, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between group hover:border-rose-200 hover:shadow-[0_8px_24px_rgba(208,79,153,0.08)] transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-display font-semibold text-sm">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-sans font-medium text-[15px] text-slate-800">{contact.name}</p>
                        <p className="font-sans text-[12px] text-slate-500 mt-0.5">{contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`font-sans text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium ${
                        contact.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {contact.relation}
                      </span>
                    </div>
                  </div>
                ))}
                
                {MOCK_CONTACTS.length < 5 && (
                  <button className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 hover:border-rose-200 transition-colors min-h-[92px]">
                    <span className="font-sans text-sm font-medium">Add up to {5 - MOCK_CONTACTS.length} more</span>
                  </button>
                )}
              </div>
              <p className="font-sans text-[12px] text-slate-400 mt-4 flex items-center gap-1.5">
                <BellRing size={14} /> These contacts will receive immediate SMS and GPS alerts if you trigger an SOS.
              </p>
            </motion.section>

            {/* Orders Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <h2 className="font-display font-semibold text-2xl text-slate-800 mb-5">Order History</h2>
              <div className="flex flex-col gap-4">
                {MOCK_ORDERS.map((order) => {
                  const StatusIcon = STATUS_ICON[order.status];
                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="font-sans font-medium text-[15px] text-slate-800">Order #{order.id}</p>
                          <p className="font-sans text-[13px] mt-0.5 text-slate-500">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                          <ul className="mt-4 space-y-1.5">
                            {order.items.map((item) => (
                              <li key={item.name} className="font-sans text-[14px] text-slate-600 flex items-center gap-2">
                                <Package size={14} className="text-slate-400" /> {item.name} × {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-semibold text-2xl text-slate-800">
                            ₹{order.total.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2 justify-end">
                            <StatusIcon size={14} strokeWidth={2} style={{ color: STATUS_COLOR[order.status] }} />
                            <span className="font-sans text-[13px] font-medium" style={{ color: STATUS_COLOR[order.status] }}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

          </div>

          {/* Right Sidebar - Live Map Widget */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm sticky top-28 overflow-hidden flex flex-col"
              style={{ height: 'calc(100vh - 160px)', minHeight: 600 }}
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="font-display font-semibold text-lg text-slate-800">Live Journey</h3>
                <span className="flex items-center gap-1.5 font-sans text-[11px] font-medium uppercase tracking-wider text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Safe
                </span>
              </div>
              
              {/* Map Placeholder */}
              <div className="flex-1 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                {/* Decorative map grid lines */}
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
                  backgroundSize: '24px 24px',
                  opacity: 0.5
                }} />
                
                {/* Radar Pulse Effect */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-48 h-48 bg-rose-400 rounded-full opacity-10 animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="absolute w-32 h-32 bg-rose-400 rounded-full opacity-20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                  <div className="w-12 h-12 bg-white rounded-full shadow-[0_8px_24px_rgba(208,79,153,0.25)] flex items-center justify-center relative z-10 border-2 border-rose-100">
                    <img src="/avatar-placeholder.png" alt="User" className="w-full h-full rounded-full object-cover opacity-50" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <div className="absolute inset-0 flex items-center justify-center"><Search size={20} className="text-rose-500" /></div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 text-center">
                  <p className="font-display font-semibold text-slate-800">Location Access Enabled</p>
                  <p className="font-sans text-[12px] text-slate-500 mt-1">Your location is secure and only shared if SOS is triggered.</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.main>
  );
}
