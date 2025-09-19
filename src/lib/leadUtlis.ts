import { Lead, LeadFormData } from '@/types/lead';

export const calculateLeadScore = (lead: Partial<Lead>): number => {
  let score = 0;

  // Budget scoring
  switch (lead.budget) {
    case 'enterprise':
      score += 35;
      break;
    case 'high':
      score += 30;
      break;
    case 'medium':
      score += 20;
      break;
    case 'low':
      score += 10;
      break;
  }

  // Timeline scoring
  switch (lead.timeline) {
    case 'urgent':
      score += 25;
      break;
    case 'soon':
      score += 20;
      break;
    case 'future':
      score += 10;
      break;
  }

  // Project type scoring
  switch (lead.projectType) {
    case 'custom-development':
      score += 25;
      break;
    case 'ecommerce':
      score += 23;
      break;
    case 'mobile-app':
      score += 22;
      break;
    case 'website-redesign':
      score += 20;
      break;
    case 'maintenance':
      score += 15;
      break;
  }

  // Company size scoring
  switch (lead.companySize) {
    case 'enterprise':
      score += 20;
      break;
    case 'medium':
      score += 15;
      break;
    case 'small':
      score += 10;
      break;
  }

  return Math.min(score, 100);
};

export const getLeadPriority = (score: number): 'hot' | 'warm' | 'cold' => {
  if (score >= 80) return 'hot';
  if (score >= 60) return 'warm';
  return 'cold';
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'hot':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'warm':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cold':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'new':
      return 'bg-purple-100 text-purple-800';
    case 'qualified':
      return 'bg-blue-100 text-blue-800';
    case 'contacted':
      return 'bg-yellow-100 text-yellow-800';
    case 'proposal':
      return 'bg-orange-100 text-orange-800';
    case 'won':
      return 'bg-green-100 text-green-800';
    case 'lost':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const createLead = (formData: LeadFormData): Lead => {
  const lead: Lead = {
    id: crypto.randomUUID(),
    ...formData,
    status: 'new',
    score: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  lead.score = calculateLeadScore(lead);
  return lead;
};

export const saveLeads = (leads: Lead[]): void => {
  localStorage.setItem('leads', JSON.stringify(leads));
};

export const loadLeads = (): Lead[] => {
  const stored = localStorage.getItem('leads');
  return stored ? JSON.parse(stored) : [];
};

export const formatProjectType = (type: string): string => {
  return type.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const formatBudget = (budget: string): string => {
  switch (budget) {
    case 'low':
      return 'Under $5K';
    case 'medium':
      return '$5K - $15K';
    case 'high':
      return '$15K - $50K';
    case 'enterprise':
      return '$50K+';
    default:
      return budget;
  }
};

export const formatTimeline = (timeline: string): string => {
  switch (timeline) {
    case 'urgent':
      return 'ASAP (< 1 month)';
    case 'soon':
      return '1-3 months';
    case 'future':
      return '3+ months';
    default:
      return timeline;
  }
};
