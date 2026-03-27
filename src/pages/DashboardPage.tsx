import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { useUser } from '@clerk/react';
import type { OrderStatus } from '../types';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as number[] } },
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

export default function DashboardPage() {
  const { user } = useUser();

  const displayName  = user?.fullName ?? user?.firstName ?? 'there';
  const displayEmail = user?.primaryEmailAddress?.emailAddress ?? '';

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit"
      style={{ background: 'var(--color-off-white)', minHeight: '100vh', paddingTop: 100 }}
    >
      <div className="container-safe py-12">
        <div className="mb-10">
          <p className="font-sans text-sm mb-1" style={{ color: 'var(--color-slate-light)' }}>Welcome back,</p>
          <h1 className="font-display font-semibold" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--color-midnight)' }}>
            {displayName} 👋
          </h1>
          {displayEmail && (
            <p className="font-sans text-sm mt-1" style={{ color: 'var(--color-slate-light)' }}>{displayEmail}</p>
          )}
        </div>

        <h2 className="font-display font-semibold mb-6" style={{ fontSize: 22, color: 'var(--color-midnight)' }}>
          Your Orders
        </h2>

        <div className="flex flex-col gap-4">
          {MOCK_ORDERS.map((order) => {
            const StatusIcon = STATUS_ICON[order.status];
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-sans font-medium text-sm" style={{ color: 'var(--color-midnight)' }}>Order #{order.id}</p>
                    <p className="font-sans text-[13px] mt-0.5" style={{ color: 'var(--color-slate-light)' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {order.items.map((item) => (
                        <li key={item.name} className="font-sans text-sm" style={{ color: 'var(--color-slate)' }}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-semibold" style={{ fontSize: 22, color: 'var(--color-rose)' }}>
                      ₹{order.total.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 justify-end">
                      <StatusIcon size={14} strokeWidth={1.5} style={{ color: STATUS_COLOR[order.status] }} />
                      <span className="font-sans text-[13px] font-medium" style={{ color: STATUS_COLOR[order.status] }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.main>
  );
}
