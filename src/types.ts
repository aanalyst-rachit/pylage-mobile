export type ViewMode =
  | 'overview'
  | 'dashboard'
  | 'admin'
  | 'landing'
  | 'forms'
  | 'data-feedback'
  | 'navigation'
  | 'explorer'
  | 'architecture';

export interface ComponentDemo {
  id: string;
  name: string;
  category: 'Layout' | 'Typography' | 'Forms' | 'Navigation' | 'Feedback' | 'Media';
  description: string;
  pythonSnippet: string;
}

export interface TableRowData {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'Pending' | 'Inactive';
  lastActive: string;
}
