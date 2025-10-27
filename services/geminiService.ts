import { GoogleGenAI, Type } from "@google/genai";
import type { ScheduleResponse } from '../types';

// FIX: Initialize GoogleGenAI with API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

interface GenerateScheduleParams {
  patients: string[];
  doctors: string[];
  rooms: string[];
  timeSlots: number;
}

export const generateScheduleAndCode = async (params: GenerateScheduleParams): Promise<ScheduleResponse> => {
  const { patients, doctors, rooms, timeSlots } = params;

  const prompt = `
    You are an expert in hospital scheduling and Python programming.
    Your task is to create an optimal, conflict-free schedule for hospital appointments.

    Here are the resources:
    - Patients: ${patients.join(', ')}
    - Doctors: ${doctors.join(', ')}
    - Rooms: ${rooms.join(', ')}
    - Available Time Slots: 1 to ${timeSlots}

    Constraints:
    1. Each patient must have exactly one appointment.
    2. A doctor can only be in one room at any given time slot.
    3. A room can only be occupied by one doctor and one patient at any given time slot.
    4. A patient can only have one appointment at any given time slot.

    Please provide a response in JSON format. The JSON object should contain one key:
    - "schedule": An array of appointment objects. Each object should have 'patient', 'doctor', 'room', and 'timeSlot' properties.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro', // Using a powerful model for complex reasoning and code generation.
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          schedule: {
            type: Type.ARRAY,
            description: "The generated conflict-free schedule.",
            items: {
              type: Type.OBJECT,
              properties: {
                patient: { type: Type.STRING, description: "Name of the patient." },
                doctor: { type: Type.STRING, description: "Name of the doctor." },
                room: { type: Type.STRING, description: "Room number." },
                timeSlot: { type: Type.INTEGER, description: "The scheduled time slot." },
              },
              required: ["patient", "doctor", "room", "timeSlot"],
            },
          },
        },
        required: ["schedule"],
      },
    },
  });

  const text = response.text.trim();
  // The response text is a JSON string, parse it.
  if (!text) {
    throw new Error("Received an empty response from the API.");
  }
  
  try {
    const result: ScheduleResponse = JSON.parse(text);
    return result;
  } catch (e) {
    console.error("Failed to parse JSON response:", text);
    throw new Error("Failed to parse the schedule from the API response.");
  }
};
