export interface Coordinator {
  ikhwan: string;
  akhwat: string;
}

export interface Department {
  id: number;
  name: string;
  coordinator: Coordinator;
}