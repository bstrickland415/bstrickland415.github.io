import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Lead, LeadFormData } from '@/types/lead';
import { createLead, saveLeads, loadLeads } from '@/lib/leadUtils';
import { sampleLeads } from '@/lib/sampleData';
import LeadForm from '@/components/LeadForm';
import LeadCard from '@/components/LeadCard';
import LeadDetails from '@/components/LeadDetails';
import Analytics from '@/components/Analytics';
import { Plus, Search, Filter, BarChart3, Users, Target, Database, Globe } from 'lucide-react';

export default function Index() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  useEffect(() => {
    const loadedLeads = loadLeads();
    if (loadedLeads.length === 0) {
      // Load sample data if no leads exist
      setLeads(sampleLeads);
      saveLeads(sampleLeads);
    } else {
      setLeads(loadedLeads);
    }
  }, []);

  const handleAddLead = (formData: LeadFormData) => {
    const newLead = createLead(formData);
    const updatedLeads = [...leads, newLead];
    setLeads(updatedLeads);
    saveLeads(updatedLeads);
    setShowForm(false);
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStatus, updatedAt: new Date().toISOString() }
        : lead
    );
    setLeads(updatedLeads);
    saveLeads(updatedLeads);
  };

  const handleUpdateNotes = (leadId: string, notes: string) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, notes, updatedAt: new Date().toISOString() }
        : lead
    );
    setLeads(updatedLeads);
    saveLeads(updatedLeads);
  };

  const handleLoadSampleData = () => {
    setLeads(sampleLeads);
    saveLeads(sampleLeads);
  };

  // Filter leads based on search and filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    const priority = lead.score >= 80 ? 'hot' : lead.score >= 60 ? 'warm' : 'cold';
    const matchesPriority = priorityFilter === 'all' || priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort leads by score (highest first)
  const sortedLeads = [...filteredLeads].sort((a, b) => b.score - a.score);

  const totalLeads = leads.length;
  const hotLeads = leads.filter(lead => lead.score >= 80).length;
  const qualifiedLeads = leads.filter(lead => 
    ['qualified', 'contacted', 'proposal', 'won'].includes(lead.status)
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                MT
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  The Microtechs
                </h1>
                <p className="text-lg text-muted-foreground">Lead Management Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <a 
                href="https://themicrotechs.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Globe className="h-4 w-4" />
                themicrotechs.org
              </a>
              <p className="text-sm text-muted-foreground">Web Development Firm</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Find and qualify leads from Craigslist, local business directories, Nextdoor, Angie's List, and business parks in the San Francisco Bay Area
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            ABC - Always Be Chasing • Focus on businesses with outdated websites and new startups
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold">{totalLeads}</div>
              <div className="text-sm text-muted-foreground">Total Leads</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
            <Target className="h-8 w-8 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-600">{hotLeads}</div>
              <div className="text-sm text-muted-foreground">Hot Leads</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
            <BarChart3 className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">{qualifiedLeads}</div>
              <div className="text-sm text-muted-foreground">Qualified</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="won">Won</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="warm">Warm</SelectItem>
                      <SelectItem value="cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                {totalLeads === 0 && (
                  <Button variant="outline" onClick={handleLoadSampleData} className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Load Sample Data
                  </Button>
                )}
                <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Lead
                </Button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Showing {sortedLeads.length} of {totalLeads} leads</span>
              {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all') && (
                <Badge variant="outline" className="text-xs">
                  Filtered
                </Badge>
              )}
            </div>

            {/* Leads Grid */}
            {sortedLeads.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onStatusChange={handleStatusChange}
                    onViewDetails={setSelectedLead}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {totalLeads === 0 ? 'No leads yet' : 'No leads match your filters'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {totalLeads === 0 
                    ? 'Get started by adding your first lead or loading sample data'
                    : 'Try adjusting your search or filters'
                  }
                </p>
                <div className="flex gap-2 justify-center">
                  {totalLeads === 0 && (
                    <>
                      <Button variant="outline" onClick={handleLoadSampleData}>
                        <Database className="h-4 w-4 mr-2" />
                        Load Sample Data
                      </Button>
                      <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Lead
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics leads={leads} />
          </TabsContent>
        </Tabs>

        {/* Lead Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <LeadForm
                onSubmit={handleAddLead}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {/* Lead Details Modal */}
        <LeadDetails
          lead={selectedLead}
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdateNotes={handleUpdateNotes}
        />
      </div>
    </div>
  );
}
