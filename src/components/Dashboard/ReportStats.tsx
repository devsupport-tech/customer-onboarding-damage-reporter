
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Image, Clock, BarChart3 } from 'lucide-react';

const ReportStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Total Reports" 
        value="16" 
        description="Reports created" 
        icon={<FileText className="h-5 w-5 text-blue-500" />}
        trend="up"
        trendValue="12%"
      />
      <StatCard 
        title="Total Photos" 
        value="243" 
        description="Photos uploaded" 
        icon={<Image className="h-5 w-5 text-green-500" />}
        trend="up"
        trendValue="8%"
      />
      <StatCard 
        title="Recent Activity" 
        value="3h ago" 
        description="Last report created" 
        icon={<Clock className="h-5 w-5 text-yellow-500" />}
        trend="neutral"
        trendValue=""
      />
      <StatCard 
        title="Report Status" 
        value="12/16" 
        description="Reports completed" 
        icon={<BarChart3 className="h-5 w-5 text-purple-500" />}
        trend="up"
        trendValue="75%"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon,
  trend,
  trendValue
}) => {
  return (
    <Card className="border-border shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
      {trendValue && (
        <CardFooter className="pt-0">
          <div className={`text-xs font-medium flex items-center ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            {trend === 'up' && '↑ '}
            {trend === 'down' && '↓ '}
            {trendValue}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ReportStats;
