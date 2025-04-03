
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { 
  Clock, 
  Search, 
  Calendar, 
  Filter, 
  Download,
  ChevronDown
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { toast } from 'sonner';

type ActivityType = 'upload' | 'generate' | 'delete' | 'share' | 'view';

interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  user: string;
  timestamp: Date;
  projectName: string;
  details?: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'upload',
    description: 'Uploaded 15 photos',
    user: 'John Smith',
    timestamp: new Date('2025-03-25T14:32:00'),
    projectName: 'Smith Residence Damage',
    details: 'Batch upload completed successfully'
  },
  {
    id: '2',
    type: 'generate',
    description: 'Generated storm damage report',
    user: 'John Smith',
    timestamp: new Date('2025-03-25T14:40:00'),
    projectName: 'Smith Residence Damage',
    details: 'Report #SF-12345 created'
  },
  {
    id: '3',
    type: 'share',
    description: 'Shared report with client',
    user: 'John Smith',
    timestamp: new Date('2025-03-25T14:45:00'),
    projectName: 'Smith Residence Damage',
    details: 'Sent to client@example.com'
  },
  {
    id: '4',
    type: 'delete',
    description: 'Deleted 3 photos',
    user: 'Jane Brown',
    timestamp: new Date('2025-03-24T09:15:00'),
    projectName: 'Brown Property Assessment',
    details: 'Low quality images removed'
  },
  {
    id: '5',
    type: 'upload',
    description: 'Uploaded 23 photos',
    user: 'Jane Brown',
    timestamp: new Date('2025-03-24T09:05:00'),
    projectName: 'Brown Property Assessment',
    details: 'Mobile upload via app'
  },
  {
    id: '6',
    type: 'view',
    description: 'Viewed report details',
    user: 'Admin',
    timestamp: new Date('2025-03-23T16:20:00'),
    projectName: 'Johnson Claim Review',
    details: 'Quality assurance check'
  },
  {
    id: '7',
    type: 'generate',
    description: 'Generated flood damage report',
    user: 'Admin',
    timestamp: new Date('2025-03-23T16:10:00'),
    projectName: 'Johnson Claim Review',
    details: 'Report #PG-54321 created'
  }
];

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activityType, setActivityType] = useState<ActivityType | 'all'>('all');
  
  const activitiesPerPage = 5;

  // Filter activities based on search term and type
  const filteredActivities = mockActivities
    .filter(activity => 
      (activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       activity.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       activity.user.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activityType === 'all' || activity.type === activityType)
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Calculate pagination
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);
  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);

  const handleExport = () => {
    toast.success('Activity log exported successfully');
  };

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'upload':
        return '📤';
      case 'generate':
        return '📄';
      case 'delete':
        return '🗑️';
      case 'share':
        return '📧';
      case 'view':
        return '👁️';
      default:
        return '🔔';
    }
  };

  const getActivityBadge = (type: ActivityType) => {
    switch (type) {
      case 'upload':
        return <Badge className="bg-blue-500">Upload</Badge>;
      case 'generate':
        return <Badge className="bg-green-600">Generate</Badge>;
      case 'delete':
        return <Badge variant="destructive">Delete</Badge>;
      case 'share':
        return <Badge className="bg-purple-600">Share</Badge>;
      case 'view':
        return <Badge variant="outline">View</Badge>;
      default:
        return <Badge>Activity</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 container py-10 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Clock className="h-7 w-7 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Activity History</h1>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Activity Log</CardTitle>
            <CardDescription>
              View a history of all activities and actions taken in your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setActivityType('all')}>
                      All Activities
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActivityType('upload')}>
                      Uploads
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActivityType('generate')}>
                      Report Generation
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActivityType('share')}>
                      Shares
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActivityType('view')}>
                      Views
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActivityType('delete')}>
                      Deletions
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button size="sm" className="h-9" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">Type</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentActivities.length > 0 ? (
                    currentActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="text-center text-lg">
                          {getActivityIcon(activity.type)}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{activity.description}</div>
                          <div className="text-sm text-muted-foreground">{activity.details}</div>
                          <div className="mt-1">
                            {getActivityBadge(activity.type)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {activity.projectName}
                        </TableCell>
                        <TableCell>
                          {activity.user}
                        </TableCell>
                        <TableCell>
                          <div>{format(activity.timestamp, 'MMM d, yyyy')}</div>
                          <div className="text-sm text-muted-foreground">
                            {format(activity.timestamp, 'h:mm a')}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6">
                        No activities found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      {currentPage > 1 ? (
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        />
                      ) : (
                        <PaginationPrevious 
                          onClick={() => {}} 
                          className="pointer-events-none opacity-50"
                        />
                      )}
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={currentPage === page}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      {currentPage < totalPages ? (
                        <PaginationNext
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        />
                      ) : (
                        <PaginationNext
                          onClick={() => {}}
                          className="pointer-events-none opacity-50"
                        />
                      )}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default History;
