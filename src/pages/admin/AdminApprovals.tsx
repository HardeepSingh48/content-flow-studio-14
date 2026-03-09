import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Loader2, ChevronDown, ChevronUp, RefreshCw, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

type Status = 'PENDING' | 'APPROVED' | 'REJECTED';

interface Applicant {
    id: string;
    email: string;
    fullName: string | null;
    companyName: string | null;
    companySize: string | null;
    industry: string | null;
    jobTitle: string | null;
    website: string | null;
    useCase: string | null;
    approvalStatus: Status;
    rejectionNote: string | null;
    createdAt: string;
}

const statusColors: Record<Status, string> = {
    PENDING: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    APPROVED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    REJECTED: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const statusIcons: Record<Status, React.ReactNode> = {
    PENDING: <Clock size={12} />,
    APPROVED: <CheckCircle size={12} />,
    REJECTED: <XCircle size={12} />,
};

const AdminApprovals = () => {
    const { token } = useAuth();
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<Status | 'ALL'>('PENDING');
    const [expanded, setExpanded] = useState<string | null>(null);
    const [acting, setActing] = useState<string | null>(null);
    const [rejectNote, setRejectNote] = useState('');
    const [rejectTargetId, setRejectTargetId] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const params = filter !== 'ALL' ? `?status=${filter}` : '';
            const res = await axios.get(`${API_URL}/admin/signup-requests${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApplicants(res.data.users);
        } catch {
            // handle silently
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, [filter]);

    const approve = async (id: string) => {
        setActing(id);
        try {
            await axios.patch(`${API_URL}/admin/signup-requests/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApplicants(prev => prev.map(a => a.id === id ? { ...a, approvalStatus: 'APPROVED' } : a));
        } finally {
            setActing(null);
        }
    };

    const reject = async (id: string) => {
        setActing(id);
        try {
            await axios.patch(`${API_URL}/admin/signup-requests/${id}/reject`, { note: rejectNote }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApplicants(prev => prev.map(a => a.id === id ? { ...a, approvalStatus: 'REJECTED', rejectionNote: rejectNote } : a));
            setRejectTargetId(null);
            setRejectNote('');
        } finally {
            setActing(null);
        }
    };

    const filters: Array<Status | 'ALL'> = ['PENDING', 'APPROVED', 'REJECTED', 'ALL'];

    return (
        <div className="min-h-screen bg-[#0A0E27] text-white">
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-1">Signup Approvals</h1>
                        <p className="text-white/40 text-sm">Review and approve incoming access requests</p>
                    </div>
                    <button onClick={load} className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                        <RefreshCw size={14} /> Refresh
                    </button>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 mb-7">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${filter === f ? 'bg-[#8B5CF6]/20 border-[#8B5CF6]/40 text-[#C4B5FD]' : 'bg-white/5 border-white/10 text-white/50 hover:text-white'}`}
                        >
                            {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>

                {/* List */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 size={28} className="animate-spin text-[#8B5CF6]" />
                    </div>
                ) : applicants.length === 0 ? (
                    <div className="text-center py-20 text-white/25 text-sm">No applications found.</div>
                ) : (
                    <div className="space-y-3">
                        {applicants.map(a => (
                            <motion.div
                                key={a.id}
                                layout
                                className="bg-white/[0.025] border border-white/10 rounded-2xl overflow-hidden"
                            >
                                {/* Row */}
                                <div className="flex items-center gap-4 p-5">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6]/40 to-[#6366F1]/40 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                        {(a.fullName || a.email).charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold text-sm">{a.fullName || '—'}</span>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[a.approvalStatus]}`}>
                                                {statusIcons[a.approvalStatus]} {a.approvalStatus}
                                            </span>
                                        </div>
                                        <div className="text-white/40 text-xs mt-0.5">
                                            {a.email} · {a.jobTitle} @ {a.companyName}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {a.approvalStatus === 'PENDING' && (
                                            <>
                                                <button
                                                    onClick={() => approve(a.id)}
                                                    disabled={acting === a.id}
                                                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/25 transition-all disabled:opacity-50"
                                                >
                                                    {acting === a.id ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => setRejectTargetId(rejectTargetId === a.id ? null : a.id)}
                                                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all"
                                                >
                                                    <XCircle size={12} /> Reject
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => setExpanded(expanded === a.id ? null : a.id)}
                                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                                        >
                                            {expanded === a.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Reject note input */}
                                <AnimatePresence>
                                    {rejectTargetId === a.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-red-500/20 overflow-hidden"
                                        >
                                            <div className="p-5 space-y-3">
                                                <div className="flex items-center gap-2 text-red-400 text-xs font-semibold">
                                                    <AlertTriangle size={12} /> Rejection note (optional)
                                                </div>
                                                <textarea
                                                    value={rejectNote}
                                                    onChange={e => setRejectNote(e.target.value)}
                                                    placeholder="Reason for rejection..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 placeholder-white/20 text-sm resize-none h-20 focus:outline-none focus:border-red-500/40"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => reject(a.id)}
                                                        disabled={acting === a.id}
                                                        className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/30 transition-all disabled:opacity-50"
                                                    >
                                                        {acting === a.id ? 'Rejecting...' : 'Confirm Reject'}
                                                    </button>
                                                    <button onClick={() => setRejectTargetId(null)} className="px-4 py-2 rounded-lg bg-white/5 text-white/40 text-xs hover:text-white transition-colors">Cancel</button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Expanded details */}
                                <AnimatePresence>
                                    {expanded === a.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-white/5 overflow-hidden"
                                        >
                                            <div className="p-5 grid grid-cols-2 gap-4">
                                                {[
                                                    { label: 'Industry', value: a.industry },
                                                    { label: 'Company Size', value: a.companySize },
                                                    { label: 'Website', value: a.website },
                                                    { label: 'Applied', value: new Date(a.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) },
                                                ].map(({ label, value }) => (
                                                    <div key={label}>
                                                        <div className="text-white/30 text-xs mb-1">{label}</div>
                                                        <div className="text-white/70 text-sm">{value || '—'}</div>
                                                    </div>
                                                ))}
                                                <div className="col-span-2">
                                                    <div className="text-white/30 text-xs mb-1">Use Case</div>
                                                    <div className="text-white/70 text-sm leading-relaxed">{a.useCase || '—'}</div>
                                                </div>
                                                {a.rejectionNote && (
                                                    <div className="col-span-2 bg-red-500/5 border border-red-500/20 rounded-xl p-3">
                                                        <div className="text-red-400 text-xs font-semibold mb-1">Rejection note</div>
                                                        <div className="text-red-300/70 text-sm">{a.rejectionNote}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminApprovals;
