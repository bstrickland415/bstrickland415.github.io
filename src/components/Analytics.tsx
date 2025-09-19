import { Lead } from '@/types/lead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getLeadPriority } from '@/lib/leadUtils';
import { TrendingUp, Users, Target, DollarSign, Clock, Award } from 'lucide-react';

interface AnalyticsProps {
  leads: Lead[];
}

export default function Analytics({ leads }: AnalyticsProps) {
  // Calculate statistics
  const totalLeads = leads.length;
  const hotLeads = leads.filter(lead => getLeadPriority(lead.score) === 'hot').length;
  const warmLeads = leads.filter(lead => getLeadPriority(lead.score) === 'warm').length;
  const coldLeads = leads.filter(lead => getLeadPriority(lead.score) === 'cold').length;
  
  const qualifiedLeads = leads.filter(lead => 
    ['qualified', 'contacted', 'proposal', 'won'].includes(lead.status)
  ).length;
  
  const wonLeads = leads.filter(lead => lead.status === 'won').length;
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0';
  
  // Lead sources breakdown
  const sourceStats = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Project types breakdown
  const projectStats = leads.reduce((acc, lead) => {
    acc[lead.projectType] = (acc[lead.projectType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Budget breakdown
  const budgetStats = leads.reduce((acc, lead) => {
    acc[lead.budget] = (acc[lead.budget] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const averageScore = totalLeads > 0 
    ? (leads.reduce((sum, lead) => sum + lead.score, 0) / totalLeads).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              {qualifiedLeads} qualified
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {wonLeads} won deals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}</div>
            <p className="text-xs text-muted-foreground">
              Out of 100 points
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hot Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{hotLeads}</div>
            <p className="text-xs text-muted-foreground">
              High priority leads
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lead Priority Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Priority Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-100 text-red-800 border-red-200">
                Hot: {hotLeads}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                Warm: {warmLeads}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                Cold: {coldLeads}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lead Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(sourceStats).map(([source, count]) => (
                <div key={source} className="flex justify-between items-center">
                  <span className="capitalize">{source.replace('-', ' ')}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
              {Object.keys(sourceStats).length === 0 && (
                <p className="text-muted-foreground text-sm">No data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(projectStats).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="capitalize">{type.replace('-', ' ')}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
              {Object.keys(projectStats).length === 0 && (
                <p className="text-muted-foreground text-sm">No data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Budget Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(budgetStats).map(([budget, count]) => (
              <div key={budget} className="text-center">
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {budget === 'low' ? 'Under $5K' :
                   budget === 'medium' ? '$5K-$15K' :
                   budget === 'high' ? '$15K-$50K' :
                   '$50K+'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}