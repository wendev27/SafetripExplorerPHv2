"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Register Page Component
 *
 * User registration page with form validation
 * Creates new user accounts with role-based access
 */

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (formData.name.length < 2) return "Name must be at least 2 characters";
    if (!formData.email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email format";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      return "Password must contain uppercase, lowercase, and number";
    }
    if (formData.password !== formData.confirmPassword) return "Passwords don't match";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at top left, #fff8ec, #F7F3EA)',
        fontFamily: '"Source Sans 3", "Segoe UI", system-ui, -apple-system',
        padding: '16px'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%',
            background: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: '0 15px 35px rgba(18, 53, 91, 0.15)',
            padding: '32px'
          }}
        >
          <CheckCircle style={{
            width: '64px',
            height: '64px',
            color: '#27AE60',
            margin: '0 auto 16px'
          }} />
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#12355B',
            marginBottom: '8px'
          }}>
            Registration Successful!
          </h1>
          <p style={{ color: '#6B6B6B' }}>
            Redirecting to login page...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      background: 'radial-gradient(circle at top left, #fff8ec, #F7F3EA)',
      fontFamily: '"Source Sans 3", "Segoe UI", system-ui, -apple-system'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '480px' }}
      >
        <div style={{
          width: '100%',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 15px 35px rgba(18, 53, 91, 0.15)',
          padding: '32px 32px 36px'
        }}>
          {/* Brand Section */}
          <div style={{
            fontWeight: '800',
            fontSize: '1.4rem',
            color: '#12355B',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              color: '#8B5E3C',
              fontSize: '1.8rem'
            }}>
              🏖️
            </div>
            <span>SafeTrip PH</span>
          </div>

          {/* Header */}
          <div style={{
            marginBottom: '20px'
          }}>
            <h1 style={{
              fontSize: '1.9rem',
              marginBottom: '8px',
              color: '#12355B'
            }}>
              Create Account
            </h1>
            <p style={{
              color: '#6B6B6B',
              lineHeight: '1.5'
            }}>
              Join SafeTrip and start exploring amazing destinations in the Philippines
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {/* Name Field */}
            <div className="field" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <label htmlFor="name" style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#12355B',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <User style={{ color: '#8B5E3C', width: '20px' }} />
                Full Name
              </label>
              <div className="input-container" style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <User style={{
                  position: 'absolute',
                  left: '14px',
                  color: '#6B6B6B',
                  fontSize: '1.1rem',
                  pointerEvents: 'none'
                }} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
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
                  placeholder="Create a password"
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

            {/* Confirm Password Field */}
            <div className="field" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <label htmlFor="confirmPassword" style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#12355B',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Lock style={{ color: '#8B5E3C', width: '20px' }} />
                Confirm Password
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
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
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
                {isLoading ? 'Creating Account...' : 'Create Account'}
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
            Already have an account?
            <Link
              href="/auth/login"
              style={{
                color: '#8B5E3C',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Sign in here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
