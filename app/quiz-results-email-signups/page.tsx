"use client";

import { useState } from "react";
import { Lock, Eye, EyeSlash, ArrowRight, DownloadSimple } from "phosphor-react";

interface QuizEmail {
  id: string;
  email: string;
  personality_type_id: string | null;
  created_at: string;
}

export default function QuizResultsEmailSignupsPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emails, setEmails] = useState<QuizEmail[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/quiz-emails-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Authentication failed");
        setIsLoading(false);
        return;
      }

      setEmails(data.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPersonalityType = (id: string | null) => {
    if (!id) return "—";
    // Convert "Artistic_Emotional-Stability" to "Artistic / Emotional Stability"
    return id
      .replace(/_/g, " / ")
      .replace(/-/g, " ");
  };

  const handleExportCSV = () => {
    const headers = ["Email", "Personality Type", "Date Signed Up"];
    const rows = emails.map((email) => [
      email.email,
      email.personality_type_id || "",
      formatDate(email.created_at),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `quiz-emails-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Password entry view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#062F29] flex items-center justify-center">
                <Lock size={32} className="text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-center text-heading mb-2">
              Quiz Email Signups
            </h1>
            <p className="text-neutral-500 text-center mb-6">
              Enter the password to view signups
            </p>

            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter password"
                  className={`w-full px-4 py-3 pr-12 rounded-xl border ${
                    error ? "border-red-400" : "border-neutral-300"
                  } focus:outline-none focus:border-[#062F29] transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading || !password}
                className="w-full mt-4 px-6 py-3 bg-[#062F29] hover:bg-[#0A4A42] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  "Loading..."
                ) : (
                  <>
                    View Signups
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated view with table
  return (
    <div className="min-h-screen bg-[#F5F5F3]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M20 4C11.164 4 4 11.164 4 20s7.164 16 16 16 16-7.164 16-16S28.836 4 20 4z" fill="#062F29"/>
                  <path d="M20 8c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8z" fill="#F5F5F3"/>
                  <path d="M20 12c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="#062F29"/>
                </svg>
              </div>
              <h1 className="font-semibold text-lg text-heading">
                Quiz Email Signups
              </h1>
            </div>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-[#062F29] hover:bg-[#0A4A42] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <DownloadSimple size={18} />
              Export CSV
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-8">
        {/* Stats */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-sm text-neutral-500">Total Signups</p>
              <p className="text-3xl font-semibold text-heading">{emails.length}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl overflow-hidden border border-neutral-200">
          {emails.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-neutral-500">No email signups yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                      Personality Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                      Date Signed Up
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((email, index) => (
                    <tr
                      key={email.id}
                      className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-neutral-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-heading font-medium">
                        {email.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        {formatPersonalityType(email.personality_type_id)}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-500">
                        {formatDate(email.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
