"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ArrowRight, Check } from "phosphor-react";
import { curriculumSampleSchema, type CurriculumSampleData } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";

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
      const response = await fetch("/api/curriculum-sample", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        console.error("API error:", result.error);
      }

      // Always show success so user can download
      setIsSuccess(true);
      reset();
    } catch (err) {
      // Log error but still show success
      console.error("Form submission error:", err);
      setIsSuccess(true);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F5F5F3] flex flex-col">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 pt-32 pb-16 md:pt-40 md:pb-24 flex-1 flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-heading leading-tight">
                  Get your free curriculum sample
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
                {/* Success State - Thank You & Download */}
                {isSuccess && (
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <CheckCircle size={64} weight="fill" className="text-green-600" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-heading text-2xl font-medium text-heading">
                        Thank you!
                      </h3>
                      <p className="text-secondary leading-relaxed">
                        Your curriculum sample is ready. Click the button below to download it.
                      </p>
                    </div>
                    <a
                      href="https://drive.google.com/drive/folders/1jWjwRg2F8WBGCDDvKjAMkN6Euvs2RSbc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full h-12 bg-[#062F29] text-white font-semibold rounded-lg hover:bg-[#0a4a42] transition-colors"
                    >
                      Get a curriculum sample
                      <ArrowRight size={16} weight="bold" />
                    </a>
                    <Link
                      href="/"
                      className="block text-content-link font-semibold hover:text-[#025f80] transition-colors"
                    >
                      Back to home
                    </Link>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm text-red-700">{error}</p>
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
                          "w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-[#062F29] focus:border-transparent transition-colors text-base",
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
                          "w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-[#062F29] focus:border-transparent transition-colors text-base",
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
                          "w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-[#062F29] focus:border-transparent transition-colors text-base",
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
                      variant="primary"
                      disabled={isSubmitting}
                      className="w-full h-12 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Submit"}
                      {!isSubmitting && <ArrowRight size={16} weight="bold" />}
                    </Button>
                  </form>
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
