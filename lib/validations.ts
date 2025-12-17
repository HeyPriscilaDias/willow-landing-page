import { z } from "zod";

export const proposalFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  jobTitle: z.string().min(2, "Job title is required"),
  schoolName: z.string().min(2, "School/District name is required"),
  schoolSize: z.enum(["1-500", "501-1000", "1001-5000", "5000+"], {
    required_error: "Please select a school size",
  }),
  state: z.string().min(2, "State is required"),
  interests: z.string().optional(),
  message: z.string().optional(),
});

export type ProposalFormData = z.infer<typeof proposalFormSchema>;

export const curriculumSampleSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

export type CurriculumSampleData = z.infer<typeof curriculumSampleSchema>;
