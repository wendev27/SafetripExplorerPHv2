"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Login Page Component
 *
 * User authentication page with email/password login
 * Includes form validation, loading states, and error handling
 *
 * Features:
 * - Email and password authentication
 * - Form validation and error messages
 * - Loading states during authentication
 * - Password visibility toggle
 * - Responsive design
 * - Redirect after successful login
 */

export default function LoginPage() {
  // Form state management
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // UI state management
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate form
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
      }

      // Attempt sign in
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false, // Don't redirect automatically
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Get updated session and redirect based on user role
        const session = await getSession();
        if (session?.user?.role === "admin" || session?.user?.role === "superadmin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'radial-gradient(circle at top left, #fff8ec, #F7F3EA)',
      fontFamily: '"Source Sans 3", "Segoe UI", system-ui, -apple-system'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="w-full bg-white rounded-3xl shadow-lg p-8" style={{
          boxShadow: '0 15px 35px rgba(18, 53, 91, 0.15)'
        }}>
          {/* Brand Section */}
          <div className="brand" style={{
            fontWeight: '800',
            fontSize: '1.4rem',
            color: '#12355B',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div className="icon" style={{
              color: '#8B5E3C',
              fontSize: '1.8rem'
            }}>
              🏖️
            </div>
            <span>SafeTrip PH</span>
          </div>

          {/* Header */}
          <div className="left">
            <h1 style={{
              fontSize: '1.9rem',
              marginBottom: '8px',
              color: '#12355B'
            }}>
              Welcome Back
            </h1>
            <p style={{
              color: '#6B6B6B',
              marginBottom: '20px',
              maxWidth: '26rem',
              lineHeight: '1.5'
            }}>
              Sign in to your SafeTrip account to continue exploring amazing destinations
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {/* Email Field */}
            <div className="field" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <label htmlFor="email" style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#12355B',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Mail style={{ color: '#8B5E3C', width: '20px' }} />
                Email Address
              </label>
              <div className="input-container" style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Mail style={{
                  position: 'absolute',
                  left: '14px',
                  color: '#6B6B6B',
                  fontSize: '1.1rem',
                  pointerEvents: 'none'
                }} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 45px',
                    borderRadius: '10px',
                    border: '1px solid rgba(18, 53, 91, 0.18)',
                    background: '#FAFBFA',
                    fontSize: '0.95rem',
                    color: '#222222',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8B5E3C';
                    e.target.style.boxShadow = '0 0 0 2px rgba(139, 94, 60, 0.18)';
                    e.target.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(18, 53, 91, 0.18)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = '#FAFBFA';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="field" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <label htmlFor="password" style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#12355B',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Lock style={{ color: '#8B5E3C', width: '20px' }} />
                Password
              </label>
              <div className="input-container" style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Lock style={{
                  position: 'absolute',
                  left: '14px',
                  color: '#6B6B6B',
                  fontSize: '1.1rem',
                  pointerEvents: 'none'
                }} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '12px 45px 12px 45px',
                    borderRadius: '10px',
                    border: '1px solid rgba(18, 53, 91, 0.18)',
                    background: '#FAFBFA',
                    fontSize: '0.95rem',
                    color: '#222222',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8B5E3C';
                    e.target.style.boxShadow = '0 0 0 2px rgba(139, 94, 60, 0.18)';
                    e.target.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(18, 53, 91, 0.18)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = '#FAFBFA';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    border: 'none',
                    background: 'none',
                    color: '#6B6B6B',
                    cursor: 'pointer',
                    fontSize: '1.1rem'
                  }}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error danger" style={{
                marginTop: '6px',
                fontSize: '0.85rem',
                minHeight: '1em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: '#C0392B'
              }}>
                <AlertCircle style={{ fontSize: '0.9rem' }} />
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="actions" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '12px'
            }}>
              <button
                type="submit"
                disabled={isLoading}
                className="primary-btn"
                style={{
                  border: 'none',
                  borderRadius: '999px',
                  padding: '12px 16px',
                  background: '#12355B',
                  color: '#fff',
                  fontWeight: '700',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  opacity: isLoading ? '0.7' : '1'
                }}
              >
                {isLoading && (
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #fff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                )}
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Toggle Auth */}
          <div className="toggle-auth" style={{
            fontSize: '0.9rem',
            marginTop: '16px',
            color: '#6B6B6B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px'
          }}>
            Don't have an account?
            <Link
              href="/auth/register"
              style={{
                color: '#8B5E3C',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Create one here
            </Link>
          </div>

          {/* ---------- TEST ACCOUNTS SECTION ---------- */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: '#FAFBFA',
            borderRadius: '12px',
            fontSize: '0.85rem'
          }}>
            <h2 style={{
              fontWeight: '600',
              marginBottom: '12px',
              textAlign: 'center',
              color: '#12355B'
            }}>
              Test Accounts
            </h2>

            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontWeight: '500', color: '#12355B' }}>User</p>
              <p style={{ color: '#6B6B6B' }}>Email: w@w.com</p>
              <p style={{ color: '#6B6B6B' }}>Password: wendell</p>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontWeight: '500', color: '#12355B' }}>Admin</p>
              <p style={{ color: '#6B6B6B' }}>Email: tryvercel@tryvercel.com</p>
              <p style={{ color: '#6B6B6B' }}>Password: tryvercel</p>
            </div>

            <div>
              <p style={{ fontWeight: '500', color: '#12355B' }}>Super Admin</p>
              <p style={{ color: '#6B6B6B' }}>Email: sadmin@s.com</p>
              <p style={{ color: '#6B6B6B' }}>Password: sadmin</p>
            </div>
          </div>
          {/* ----------------------------------------- */}
        </div>
      </motion.div>
    </div>
  );
}
