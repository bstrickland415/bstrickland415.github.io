import { Lead } from '@/types/lead';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { 
  getLeadPriority, 
  getPriorityColor, 
  getStatusColor, 
  formatProjectType, 
  formatBudget,
  formatTimeline 
} from '@/lib/leadUtils';
import { Mail, Phone, Building, Calendar, DollarSign, MapPin, User, MessageSquare } from 'lucide-react';

interface LeadDetailsProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateNotes: (leadId: string, notes: string) => void;
}

export default function LeadDetails({ lead, isOpen, onClose, onUpdateNotes }: LeadDetailsProps) {
  const [notes, setNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  if (!lead) return null;

  const priority = getLeadPriority(lead.score);
  const priorityColor = getPriorityColor(priority);
  const statusColor = getStatusColor(lead.status);

  const handleSaveNotes = () => {
    onUpdateNotes(lead.id, notes);
    setIsEditingNotes(false);
  };

  const handleEditNotes = () => {
    setNotes(lead.notes);
    setIsEditingNotes(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{lead.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex gap-4">
            <Badge className={`${priorityColor} font-medium text-sm px-3 py-1`}>
              {priority.toUpperCase()} PRIORITY ({lead.score}/100)
            </Badge>
            <Badge className={`${statusColor} text-sm px-3 py-1`}>
              {lead.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg border-b pb-2">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>{lead.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <span>{lead.company}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                    {lead.email}
                  </a>
                </div>
                {lead.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                      {lead.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg border-b pb-2">Project Details</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <span>{formatProjectType(lead.projectType)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span>{formatBudget(lead.budget)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>{formatTimeline(lead.timeline)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{lead.companySize.charAt(0).toUpperCase() + lead.companySize.slice(1)} Company</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Source and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-semibold">Lead Source</Label>
              <p className="mt-1 capitalize">{lead.source.replace('-', ' ')}</p>
            </div>
            <div>
              <Label className="font-semibold">Important Dates</Label>
              <div className="mt-1 text-sm space-y-1">
                <p>Created: {new Date(lead.createdAt).toLocaleString()}</p>
                <p>Updated: {new Date(lead.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Notes
              </h3>
              {!isEditingNotes && (
                <Button variant="outline" size="sm" onClick={handleEditNotes}>
                  Edit Notes
                </Button>
              )}
            </div>
            
            {isEditingNotes ? (
              <div className="space-y-3">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this lead..."
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveNotes} size="sm">
                    Save Notes
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditingNotes(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg min-h-[100px]">
                {lead.notes ? (
                  <p className="whitespace-pre-wrap">{lead.notes}</p>
                ) : (
                  <p className="text-muted-foreground italic">No notes added yet.</p>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              className="flex-1" 
              onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            {lead.phone && (
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => window.open(`tel:${lead.phone}`, '_blank')}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}