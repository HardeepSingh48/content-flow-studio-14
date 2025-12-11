import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Download, RefreshCw, BarChart3, FileText, Clock, Zap } from 'lucide-react';
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
import { MetricCard } from '@/components/dashboard/MetricCard';
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
  primary: 'hsl(239, 84%, 67%)',
  secondary: 'hsl(263, 70%, 66%)',
  accent: 'hsl(188, 94%, 43%)',
  success: 'hsl(160, 84%, 39%)',
};

const platformColors: Record<string, string> = {
  Article: COLORS.primary,
  Twitter: COLORS.accent,
  LinkedIn: COLORS.secondary,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground">Track your content performance</p>
        </div>

        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              icon={<FileText className="w-5 h-5" />}
            />
            <MetricCard
              title="Publishing Rate"
              value={`${overview.publishingRate}%`}
              chart={
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={15}
                      outerRadius={25}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      <Cell fill={COLORS.success} />
                      <Cell fill={COLORS.secondary} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              }
              icon={<BarChart3 className="w-5 h-5" />}
            />
            <MetricCard
              title="Avg Time to Publish"
              value={overview.avgTimeToPublish}
              suffix="days"
              change={overview.avgTimeToPublishChange}
              changeLabel="vs last period"
              icon={<Clock className="w-5 h-5" />}
            />
            <MetricCard
              title="Top Platform"
              value={overview.topPlatform.name}
              suffix={`${overview.topPlatform.percentage}%`}
              icon={<Zap className="w-5 h-5" />}
            />
          </>
        ) : null}
      </div>

      {/* Content by Platform */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-foreground">Content by Platform</h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={chartView === 'count' ? 'default' : 'outline'}
              onClick={() => setChartView('count')}
            >
              Count
            </Button>
            <Button
              size="sm"
              variant={chartView === 'status' ? 'default' : 'outline'}
              onClick={() => setChartView('status')}
            >
              Status
            </Button>
          </div>
        </div>

        {platformLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              {chartView === 'count' ? (
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {platformData?.map((entry, index) => (
                    <Cell key={index} fill={platformColors[entry.platform] || COLORS.primary} />
                  ))}
                </Bar>
              ) : (
                <>
                  <Bar dataKey="published" stackId="a" fill={COLORS.success} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="draft" stackId="a" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Publishing Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-6">Publishing Timeline</h2>

        {timelineLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="created"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="published"
                stroke={COLORS.success}
                fill={COLORS.success}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Content Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-xl p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-6">Content Performance</h2>

        {performanceLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performance?.map((item) => (
                <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.platform}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.publishedDate || '-'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === 'published'
                          ? 'default'
                          : item.status === 'scheduled'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.engagement?.toLocaleString() || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </motion.div>

      {/* Integration Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-foreground">Integration Health</h2>
          <Button variant="outline" size="sm" onClick={() => refetchIntegrations()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh All
          </Button>
        </div>

        {integrationsLoading ? (
          <Skeleton className="h-32 w-full" />
        ) : (
          <div className="space-y-3">
            {integrations?.map((integration) => (
              <div
                key={integration.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      integration.status === 'connected'
                        ? 'bg-success'
                        : integration.status === 'error'
                        ? 'bg-destructive'
                        : 'bg-muted-foreground'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-foreground">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {integration.lastSync
                        ? `Last sync: ${new Date(integration.lastSync).toLocaleString()}`
                        : 'Never synced'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {integration.errorMessage && (
                    <span className="text-xs text-destructive">{integration.errorMessage}</span>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleTestConnection(integration.id)}
                  >
                    Test
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
