export interface Radio {
  id: number;
  name: string; 
  url: string;
  recent_date: string | null;
}

export interface RadioResponse {
  radios: Radio[];
} 