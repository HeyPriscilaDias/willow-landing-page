"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { X, CheckCircle } from "phosphor-react";
import { proposalFormSchema, type ProposalFormData } from "@/lib/validations";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface ProposalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProposalForm({ isOpen, onClose }: ProposalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
  });

  const onSubmit = async (data: ProposalFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Check if Supabase is configured
      if (!supabase) {
        // For demo purposes, just log the data and show success
        console.log("Form submitted (Supabase not configured):", data);
        setIsSuccess(true);
        reset();

        // Close modal after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
        return;
      }

      // Insert data into Supabase
      const { error: supabaseError } = await supabase
        .from("proposal_requests")
        .insert([
          {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone,
            job_title: data.jobTitle,
            school_name: data.schoolName,
            school_size: data.schoolSize,
            state: data.state,
            interests: data.interests,
            message: data.message,
            created_at: new Date().toISOString(),
          },
        ]);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setIsSuccess(true);
      reset();

      // Close modal after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit proposal request"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-card shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-card">
          <h2 className="font-heading text-2xl font-semibold text-heading">
            Request a Proposal
          </h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors"
          >
            <X size={24} weight="regular" />
          </button>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-3 text-status-good">
              <CheckCircle size={24} weight="fill" className="text-status-good" />
              <div>
                <p className="font-semibold">Thank you for your interest!</p>
                <p className="text-sm text-secondary">
                  We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-primary">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Name Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-primary mb-2"
              >
                First Name *
              </label>
              <input
                {...register("firstName")}
                type="text"
                id="firstName"
                className={cn(
                  "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors",
                  errors.firstName ? "border-gray-400" : "border-gray-300"
                )}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-secondary">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-primary mb-2"
              >
                Last Name *
              </label>
              <input
                {...register("lastName")}
                type="text"
                id="lastName"
                className={cn(
                  "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors",
                  errors.lastName ? "border-gray-400" : "border-gray-300"
                )}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-secondary">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary mb-2"
              >
                Email *
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className={cn(
                  "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors",
                  errors.email ? "border-gray-400" : "border-gray-300"
                )}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-secondary">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-primary mb-2"
              >
                Phone *
              </label>
              <input
                {...register("phone")}
                type="tel"
                id="phone"
                className={cn(
                  "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors",
                  errors.phone ? "border-gray-400" : "border-gray-300"
                )}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-secondary">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Job Title */}
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-primary mb-2"
            >
              Job Title *
            </label>
            <input
              {...register("jobTitle")}
              type="text"
              id="jobTitle"
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors",
                errors.jobTitle ? "border-gray-400" : "border-gray-300"
              )}
            />
            {errors.jobTitle && (
              <p className="mt-1 text-sm text-secondary">
                {errors.jobTitle.message}
              </p>
            )}
          </div>

          {/* School Info */}
          <div>
            <label
              htmlFor="schoolName"
              className="block text-sm font-medium text-primary mb-2"
            >
              School/District Name *
            </label>
            <input
              {...register("schoolName")}
              type="text"
              id="schoolName"
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors",
                errors.schoolName ? "border-gray-400" : "border-gray-300"
              )}
            />
            {errors.schoolName && (
              <p className="mt-1 text-sm text-secondary">
                {errors.schoolName.message}
              </p>
            )}
          </div>

          {/* School Size & State */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="schoolSize"
                className="block text-sm font-medium text-primary mb-2"
              >
                School Size *
              </label>
              <select
                {...register("schoolSize")}
                id="schoolSize"
                className={cn(
                  "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors",
                  errors.schoolSize ? "border-gray-400" : "border-gray-300"
                )}
              >
                <option value="">Select size</option>
                <option value="1-500">1-500 students</option>
                <option value="501-1000">501-1,000 students</option>
                <option value="1001-5000">1,001-5,000 students</option>
                <option value="5000+">5,000+ students</option>
              </select>
              {errors.schoolSize && (
                <p className="mt-1 text-sm text-secondary">
                  {errors.schoolSize.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-primary mb-2"
              >
                State *
              </label>
              <input
                {...register("state")}
                type="text"
                id="state"
                className={cn(
                  "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors",
                  errors.state ? "border-gray-400" : "border-gray-300"
                )}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-secondary">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          {/* Interests */}
          <div>
            <label
              htmlFor="interests"
              className="block text-sm font-medium text-primary mb-2"
            >
              Areas of Interest (Optional)
            </label>
            <input
              {...register("interests")}
              type="text"
              id="interests"
              placeholder="e.g., Career curriculum, Professional development, Platform access"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-primary mb-2"
            >
              Additional Message (Optional)
            </label>
            <textarea
              {...register("message")}
              id="message"
              rows={4}
              placeholder="Tell us more about your needs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit request"}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
