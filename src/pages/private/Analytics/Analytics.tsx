import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Download, RefreshCw, BarChart3, FileText, Clock, Zap, TrendingUp, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MetricCard } from '@/components/features/dashboard/MetricCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  getAnalytics,
  getContentByPlatform,
  getTimeline,
  getContentPerformance,
  getIntegrationHealth,
  testConnection,
} from '@/services/analytics';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const COLORS = {
  primary: '#4f46e5', // primary-600
  secondary: '#9333ea', // purple-600
  accent: '#0891b2', // cyan-600
  success: '#16a34a', // green-600
  neutral: '#525252', // neutral-600
};

const platformColors: Record<string, string> = {
  Article: COLORS.primary,
  Twitter: '#1DA1F2',
  LinkedIn: '#0077b5',
  'Reel Script': COLORS.success,
};

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30d');
  const [chartView, setChartView] = useState<'count' | 'status'>('count');

  const { data: overview, isLoading: overviewLoading } = useQuery({
    queryKey: ['analytics', dateRange],
    queryFn: () => getAnalytics(dateRange),
  });

  const { data: platformData, isLoading: platformLoading } = useQuery({
    queryKey: ['platform-data', dateRange],
    queryFn: () => getContentByPlatform(dateRange),
  });

  const { data: timeline, isLoading: timelineLoading } = useQuery({
    queryKey: ['timeline', dateRange],
    queryFn: () => getTimeline(dateRange),
  });

  const { data: performance, isLoading: performanceLoading } = useQuery({
    queryKey: ['performance'],
    queryFn: () => getContentPerformance({}),
  });

  const { data: integrations, isLoading: integrationsLoading, refetch: refetchIntegrations } = useQuery({
    queryKey: ['integrations-health'],
    queryFn: getIntegrationHealth,
  });

  const handleTestConnection = async (id: string) => {
    const result = await testConnection(id);
    if (result.success) {
      toast.success('Connection successful');
    } else {
      toast.error('Connection failed');
    }
    refetchIntegrations();
  };

  const handleExport = () => {
    toast.success('Report exported successfully');
  };

  const pieData = overview
    ? [
      { name: 'Published', value: overview.publishedCount },
      { name: 'Draft', value: overview.draftCount },
    ]
    : [];

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Analytics & Insights"
        subtitle="Track your content performance across all connected platforms."
        actions={
          <div className="flex gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="secondary" className="border-white/10 bg-white/5 hover:bg-white/10 text-white" onClick={handleExport} icon={<Download size={16} />}>
              Export
            </Button>
          </div>
        }
        className="py-0 mb-0 border-none"
      />

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))
        ) : overview ? (
          <>
            <MetricCard
              title="Total Content Created"
              value={overview.totalContent}
              change={overview.totalContentChange}
              icon={<FileText size={18} />}
            />
            <MetricCard
              title="Publishing Rate"
              value={`${overview.publishingRate}%`}
              chart={
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={10}
                      outerRadius={20}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      <Cell fill={COLORS.success} />
                      <Cell fill={COLORS.primary} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              }
              icon={<TrendingUp size={18} />}
            />
            <MetricCard
              title="Avg Time to Publish"
              value={overview.avgTimeToPublish}
              suffix="days"
              change={overview.avgTimeToPublishChange}
              changeLabel="vs last period"
              icon={<Clock size={18} />}
            />
            <MetricCard
              title="Top Platform"
              value={overview.topPlatform.name}
              suffix={`${overview.topPlatform.percentage}%`}
              icon={<Zap size={18} />}
            />
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content by Platform */}
        <Card className="border-white/10 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-white/10 mb-6">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
              <BarChart3 className="size-5 text-primary" />
              Content by Platform
            </CardTitle>
            <div className="flex bg-black/20 p-1 rounded-lg border border-white/5">
              <button
                className={cn(
                  "px-3 py-1 text-xs font-bold rounded-md transition-all",
                  chartView === 'count' ? "bg-white/10 shadow-sm text-white" : "text-white/40 hover:text-white"
                )}
                onClick={() => setChartView('count')}
              >
                Count
              </button>
              <button
                className={cn(
                  "px-3 py-1 text-xs font-bold rounded-md transition-all",
                  chartView === 'status' ? "bg-white/10 shadow-sm text-white" : "text-white/40 hover:text-white"
                )}
                onClick={() => setChartView('status')}
              >
                Status
              </button>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            {platformLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={platformData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="platform" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: 'rgba(255,255,255,0.5)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{
                      backgroundColor: '#141A3B',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                      color: 'white'
                    }}
                  />
                  {chartView === 'count' ? (
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                      {platformData?.map((entry, index) => (
                        <Cell key={index} fill={platformColors[entry.platform] || COLORS.primary} />
                      ))}
                    </Bar>
                  ) : (
                    <>
                      <Bar dataKey="published" stackId="a" fill={COLORS.success} radius={[0, 0, 0, 0]} barSize={40} />
                      <Bar dataKey="draft" stackId="a" fill={COLORS.primary} radius={[4, 4, 0, 0]} barSize={40} />
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardBody>
        </Card>

        {/* Publishing Timeline */}
        <Card className="border-white/10 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-white/10 mb-6">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
              <Calendar className="size-5 text-primary" />
              Publishing Timeline
            </CardTitle>
          </CardHeader>
          <CardBody className="pt-0">
            {timelineLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={timeline}>
                  <defs>
                    <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.1} />
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPublished" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.1} />
                      <stop offset="95%" stopColor={COLORS.success} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: 'rgba(255,255,255,0.5)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#141A3B',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                      color: 'white'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="created"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCreated)"
                  />
                  <Area
                    type="monotone"
                    dataKey="published"
                    stroke={COLORS.success}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPublished)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Content Performance Table */}
      <Card className="border-white/10 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)] overflow-hidden backdrop-blur-sm">
        <CardHeader className="border-b border-white/10 pb-4">
          <CardTitle className="text-lg font-bold text-white">Content Performance</CardTitle>
        </CardHeader>
        <CardBody className="p-0">
          {performanceLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-neutral-50/50">
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="font-bold py-4 text-white/50">Title</TableHead>
                    <TableHead className="font-bold py-4 text-white/50">Platform</TableHead>
                    <TableHead className="font-bold py-4 text-white/50">Published</TableHead>
                    <TableHead className="font-bold py-4 text-white/50">Status</TableHead>
                    <TableHead className="text-right font-bold py-4 text-white/50">Engagement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performance?.map((item) => (
                    <TableRow key={item.id} className="cursor-pointer hover:bg-white/5 transition-colors border-white/5">
                      <TableCell className="font-medium text-white">{item.title}</TableCell>
                      <TableCell>
                        <Badge variant="neutral" className="bg-white/10 text-white/70 hover:bg-white/20 border-none px-2 rounded-md">
                          {item.platform}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white/50 font-medium text-sm">
                        {item.publishedDate || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === 'published'
                              ? 'success'
                              : item.status === 'scheduled'
                                ? 'info'
                                : 'neutral'
                          }
                          className="capitalize rounded-md px-2"
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold text-white">
                        {item.engagement?.toLocaleString() || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Integration Health */}
      <Card className="border-white/10 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-white/10 mb-6">
          <CardTitle className="text-lg font-bold text-white">Integration Health</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => refetchIntegrations()} icon={<RefreshCw size={14} />} className="text-white/50 hover:text-white">
            Refresh All
          </Button>
        </CardHeader>
        <CardBody className="pt-0">
          {integrationsLoading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations?.map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-black/20 hover:border-white/30 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-2.5 h-2.5 rounded-full",
                        integration.status === 'connected' ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" :
                          integration.status === 'error' ? "bg-error-500" : "bg-white/20"
                      )}
                    />
                    <div>
                      <p className="font-bold text-sm text-white">{integration.name}</p>
                      <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider mt-0.5">
                        {integration.lastSync
                          ? `Synced: ${new Date(integration.lastSync).toLocaleTimeString()}`
                          : 'Never synced'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {integration.errorMessage && (
                      <span className="text-[10px] font-bold text-error-400 bg-error-500/10 border border-error-500/20 px-2 py-0.5 rounded">{integration.errorMessage}</span>
                    )}
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 px-3 text-xs font-bold border-white/10 bg-white/5 hover:bg-white/10 text-white"
                      onClick={() => handleTestConnection(integration.id)}
                    >
                      Test
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
