export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: 'custom-development' | 'website-redesign' | 'maintenance' | 'ecommerce' | 'mobile-app';
  budget: 'low' | 'medium' | 'high' | 'enterprise';
  timeline: 'urgent' | 'soon' | 'future';
  companySize: 'small' | 'medium' | 'enterprise';
  status: 'new' | 'qualified' | 'contacted' | 'proposal' | 'won' | 'lost';
  score: number;
  notes: string;
  source: 'website' | 'referral' | 'social-media' | 'cold-outreach' | 'other';
  createdAt: string;
  updatedAt: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: Lead['projectType'];
  budget: Lead['budget'];
  timeline: Lead['timeline'];
  companySize: Lead['companySize'];
  source: Lead['source'];
  notes: string;
}
