
export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export enum UrgencyLevel {
  LOW = 'Faible urgence',
  MODERATE = 'Urgence modérée',
  CRITICAL = 'Urgence critique',
  UNKNOWN = 'Non évalué'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  urgency: UrgencyLevel;
  date: number;
}
