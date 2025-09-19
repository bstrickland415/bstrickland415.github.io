import { Lead } from '@/types/lead';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  getLeadPriority, 
  getPriorityColor, 
  getStatusColor, 
  formatProjectType, 
  formatBudget,
  formatTimeline 
} from '@/lib/leadUtils';
import { Mail, Phone, Building, Calendar, DollarSign, Eye } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  onStatusChange: (leadId: string, newStatus: Lead['status']) => void;
  onViewDetails: (lead: Lead) => void;
}

export default function LeadCard({ lead, onStatusChange, onViewDetails }: LeadCardProps) {
  const priority = getLeadPriority(lead.score);
  const priorityColor = getPriorityColor(priority);
  const statusColor = getStatusColor(lead.status);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{lead.name}</h3>
            <p className="text-sm text-muted-foreground">{lead.company}</p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={`${priorityColor} font-medium`}>
              {priority.toUpperCase()} ({lead.score})
            </Badge>
            <Badge className={statusColor}>
              {lead.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{lead.email}</span>
          </div>
          {lead.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{lead.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>{formatProjectType(lead.projectType)}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>{formatBudget(lead.budget)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatTimeline(lead.timeline)}</span>
          </div>
        </div>

        <div className="pt-3 border-t">
          <div className="flex gap-2 items-center">
            <Select 
              value={lead.status} 
              onValueChange={(value) => onStatusChange(lead.id, value as Lead['status'])}
            >
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(lead)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Added: {new Date(lead.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}