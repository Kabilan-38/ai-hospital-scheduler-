export interface Appointment {
  patient: string;
  doctor: string;
  room: string;
  timeSlot: number;
}

export interface ScheduleResponse {
  schedule: Appointment[];
}
