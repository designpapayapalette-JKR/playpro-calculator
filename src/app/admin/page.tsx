'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Send, 
  Search, 
  Filter, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  XOctagon,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { PRODUCTS } from '@/lib/constants';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ total_revenue: 0, paid_orders: 0, total_leads: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isResending, setIsResending] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const router = useRouter();
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  const getSupabase = () => {
    if (!supabaseRef.current) supabaseRef.current = createClient();
    return supabaseRef.current;
  };

  useEffect(() => {
    checkAuth();
    fetchData();
  }, [statusFilter]);

  const checkAuth = async () => {
    const { data: { user } } = await getSupabase().auth.getUser();
    if (!user) {
      router.push('/admin/login');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Orders
      let query = getSupabase().from('orders').select('*').order('created_at', { ascending: false });
      
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data: ordersData, error: ordersError } = await query;
      if (ordersError) throw ordersError;
      setOrders(ordersData || []);

      // 2. Calculate Stats
      const paid = ordersData?.filter(o => o.status === 'paid') || [];
      const revenue = paid.reduce((sum, o) => sum + (o.amount / 100), 0);
      
      setStats({
        total_revenue: revenue,
        paid_orders: paid.length,
        total_leads: ordersData?.length || 0
      });
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async (orderId: string) => {
    if (!confirm('Are you sure you want to resend the download email?')) return;
    setIsResending(orderId);
    try {
      const res = await fetch('/api/resend-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId }),
      });
      if (res.ok) alert('Email resent successfully!');
      else alert('Failed to resend email');
    } catch (error) {
      alert('Error resending email');
    } finally {
      setIsResending(null);
      fetchData(); // Refresh to see updated email_sent status
    }
  };

  const handleLogout = async () => {
    await getSupabase().auth.signOut();
    router.push('/admin/login');
  };

  const filteredOrders = orders.filter(o => 
    o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit"><CheckCircle2 className="w-3 h-3" /> Paid</span>;
      case 'failed': return <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit"><XOctagon className="w-3 h-3" /> Failed</span>;
      default: return <span className="px-3 py-1 bg-gray-500/10 text-gray-400 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit"><Clock className="w-3 h-3" /> Pending</span>;
    }
  };

  const getPlanName = (planId: string) => {
    const product = PRODUCTS[planId as keyof typeof PRODUCTS];
    return product ? product.name.split(' ')[0] : 'Basic'; // Short name
  };

  if (isLoading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0F0E] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#b8ff47]/20 border-t-[#b8ff47] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F0E] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Admin Dashboard</h1>
            <p className="text-gray-500 text-xs font-black tracking-widest uppercase opacity-60">Revenue & Order Infrastructure</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all text-[10px] font-black uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Revenue", value: `₹${stats.total_revenue.toLocaleString()}`, icon: <DollarSign className="w-6 h-6" />, color: "text-[#b8ff47]" },
            { label: "Paid Orders", value: stats.paid_orders, icon: <TrendingUp className="w-6 h-6" />, color: "text-blue-500" },
            { label: "Total Leads", value: stats.total_leads, icon: <Users className="w-6 h-6" />, color: "text-purple-500" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#151A19] border border-white/5 p-8 rounded-[40px] relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-700">
                {stat.icon}
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">
                {stat.label}
              </div>
              <div className={`text-4xl font-black ${stat.color}`}>{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters and Table */}
        <div className="bg-[#151A19] border border-white/10 rounded-[48px] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input 
                type="text" 
                placeholder="Search orders..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0B0F0E] border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-[#b8ff47] transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
              <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest pr-4 border-r border-white/5 shrink-0">
                <Filter className="w-3 h-3" /> Status
              </div>
              {['all', 'paid', 'failed', 'created'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${
                    statusFilter === s ? 'bg-[#b8ff47] text-[#0B0F0E]' : 'bg-white/5 text-gray-500 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
              <button 
                onClick={fetchData}
                className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all shrink-0 ml-2"
              >
                <RefreshCw className={`w-4 h-4 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#0B0F0E]/50 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/5">
                <tr>
                  <th className="px-8 py-6">Date</th>
                  <th className="px-8 py-6">Customer</th>
                  <th className="px-8 py-6">Plan</th>
                  <th className="px-8 py-6">Amount</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Email Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-24 text-center text-gray-600 font-bold italic">
                      No matching records found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6 text-xs text-gray-500 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString()}<br/>
                        <span className="opacity-50">{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-bold text-white mb-0.5">{order.customer_name}</div>
                        <div className="text-xs text-gray-500 font-medium">{order.customer_email}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                          {getPlanName(order.plan_type)}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-mono font-black text-xs text-white">
                        ₹{order.amount / 100}
                      </td>
                      <td className="px-8 py-6">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-8 py-6">
                        {order.email_sent ? (
                          <span className="text-[10px] text-gray-500 flex items-center gap-1.5 font-black uppercase tracking-widest">
                            <Send className="w-3 h-3 text-[#b8ff47]" /> Sent
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-400 opacity-30 flex items-center gap-1.5 font-black uppercase tracking-widest">
                            <Send className="w-3 h-3" /> Pending
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        {order.status === 'paid' && (
                          <button
                            onClick={() => handleResend(order.id)}
                            disabled={isResending === order.id}
                            className={`p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-[#b8ff47] hover:text-[#0B0F0E] transition-all relative group/btn ${isResending === order.id ? 'opacity-50' : ''}`}
                            title="Resend Access Email"
                          >
                            {isResending === order.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-8 bg-[#0B0F0E]/30 flex justify-between items-center text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
            <div>Showing {filteredOrders.length} of {orders.length} total orders</div>
            <div className="flex gap-2">
               <button className="p-2 border border-white/5 rounded-lg opacity-30"><ChevronLeft className="w-4 h-4"/></button>
               <button className="p-2 border border-white/5 rounded-lg opacity-30"><ChevronRight className="w-4 h-4"/></button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
