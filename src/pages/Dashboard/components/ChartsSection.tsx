import Card, { CardHeader, CardTitle, CardContent } from '@components/ui/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import type { DashboardData } from '@/types/models';

interface ChartsSectionProps {
  data?: DashboardData['charts'];
}

const ChartsSection = ({ data }: ChartsSectionProps) => {
  if (!data) {
    return null;
  }

  // Mock data for charts
  const projectProgressData = [
    { name: 'مشروع أ', progress: 85 },
    { name: 'مشروع ب', progress: 65 },
    { name: 'مشروع ج', progress: 45 },
    { name: 'مشروع د', progress: 92 },
  ];

  const itemsStatusData = [
    { name: 'مفتوح', value: 45, color: '#f59e0b' },
    { name: 'مغلق', value: 155, color: '#16a34a' },
  ];

  const fuelTrendData = [
    { month: 'يناير', consumption: 2400 },
    { month: 'فبراير', consumption: 2210 },
    { month: 'مارس', consumption: 2890 },
    { month: 'أبريل', consumption: 2550 },
    { month: 'مايو', consumption: 2800 },
    { month: 'يونيو', consumption: 3200 },
  ];

  const costVsRevenueData = [
    { month: 'يناير', cost: 180000, revenue: 250000 },
    { month: 'فبراير', cost: 195000, revenue: 280000 },
    { month: 'مارس', cost: 210000, revenue: 310000 },
    { month: 'أبريل', cost: 205000, revenue: 295000 },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Project Progress */}
      <Card>
        <CardHeader>
          <CardTitle>تقدم المشاريع</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#1e3a8a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Items Status */}
      <Card>
        <CardHeader>
          <CardTitle>حالة البنود</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={itemsStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={entry => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {itemsStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Fuel Trend */}
      <Card>
        <CardHeader>
          <CardTitle>اتجاه استهلاك الوقود</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fuelTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="consumption" stroke="#f59e0b" name="استهلاك (لتر)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cost vs Revenue */}
      <Card>
        <CardHeader>
          <CardTitle>التكاليف مقابل الإيرادات</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costVsRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cost" fill="#dc2626" name="التكاليف" />
              <Bar dataKey="revenue" fill="#16a34a" name="الإيرادات" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
