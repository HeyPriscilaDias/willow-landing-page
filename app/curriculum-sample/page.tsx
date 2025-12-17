"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ArrowRight, Check } from "phosphor-react";
import { curriculumSampleSchema, type CurriculumSampleData } from "@/lib/validations";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Image from "next/image";

export default function CurriculumSamplePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CurriculumSampleData>({
    resolver: zodResolver(curriculumSampleSchema),
  });

  const onSubmit = async (data: CurriculumSampleData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Check if Supabase is configured
      if (!supabase) {
        // For demo purposes, just log the data and show success
        console.log("Form submitted (Supabase not configured):", data);
        setIsSuccess(true);
        reset();
        return;
      }

      // Insert data into Supabase
      const { error: supabaseError } = await supabase
        .from("curriculum_sample_requests")
        .insert([
          {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            created_at: new Date().toISOString(),
          },
        ]);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit curriculum sample request"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-heading leading-tight">
                  Discover our comprehensive career exploration curriculum
                </h1>
                <p className="text-lg text-secondary leading-relaxed">
                  Download a free curriculum sample to see how our structured approach guides students through self-discovery, career exploration, and postsecondary planning.
                </p>
              </div>

              {/* What's Included Section */}
              <div className="space-y-4">
                <h2 className="font-heading text-xl font-medium text-heading">
                  What&apos;s included:
                </h2>
                <ul className="space-y-3">
                  {[
                    "Overview of our curriculum framework and learning objectives",
                    "Sample lesson plans with detailed activities and assessments",
                    "Student engagement strategies and facilitation guides",
                    "Examples of career exploration tools and resources",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <Check size={20} weight="bold" className="text-[#062F29]" />
                      </div>
                      <span className="text-secondary leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right Column - Form Card */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                {/* Success Message */}
                {isSuccess && (
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} weight="fill" className="text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-900">
                          Thank you for your interest!
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                          Check your email for the curriculum sample. We&apos;ll also be in touch within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Form Header */}
                {!isSuccess && (
                  <div className="mb-8">
                    <h3 className="font-heading text-2xl font-medium text-heading mb-2">
                      Get your free curriculum sample
                    </h3>
                    <p className="text-secondary text-sm">
                      Fill out the form below and we&apos;ll send you a comprehensive sample of our curriculum materials.
                    </p>
                  </div>
                )}

                {/* Form */}
                {!isSuccess && (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        First name *
                      </label>
                      <input
                        {...register("firstName")}
                        type="text"
                        id="firstName"
                        placeholder="First name"
                        className={cn(
                          "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#062F29] focus:border-transparent transition-colors text-base",
                          errors.firstName ? "border-red-400" : "border-gray-300"
                        )}
                      />
                      {errors.firstName && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        Last name *
                      </label>
                      <input
                        {...register("lastName")}
                        type="text"
                        id="lastName"
                        placeholder="Last name"
                        className={cn(
                          "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#062F29] focus:border-transparent transition-colors text-base",
                          errors.lastName ? "border-red-400" : "border-gray-300"
                        )}
                      />
                      {errors.lastName && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        Email address *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        id="email"
                        placeholder="Email address"
                        className={cn(
                          "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#062F29] focus:border-transparent transition-colors text-base",
                          errors.email ? "border-red-400" : "border-gray-300"
                        )}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Privacy Policy */}
                    <p className="text-xs text-secondary leading-relaxed pt-2">
                      By submitting this form, you acknowledge our{" "}
                      <Link
                        href="/privacy"
                        className="text-content-link underline hover:text-[#025f80]"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and agree to receive email communications from us. You can unsubscribe at any time.
                    </p>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-[#E879F9] text-[#062F29] hover:bg-[#D946EF] text-base font-semibold"
                    >
                      {isSubmitting ? "Sending..." : "Download curriculum sample"}
                      {!isSubmitting && <ArrowRight size={16} weight="bold" />}
                    </Button>
                  </form>
                )}

                {/* Back to Home Link (shown after success) */}
                {isSuccess && (
                  <Link
                    href="/"
                    className="block w-full text-center py-3 text-content-link font-semibold hover:text-[#025f80] transition-colors"
                  >
                    Back to home
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
