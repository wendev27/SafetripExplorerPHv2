import Link from "next/link";
import { MapPin, Mail, Phone, Github, Twitter, Facebook } from "lucide-react";

/**
 * Footer Component
 *
 * Displays site information, links, and social media
 * Responsive design with organized sections
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container-responsive section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">SafeTrip PH</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your ultimate guide to exploring the beautiful tourist spots
              across the Philippines. Discover, plan, and book your next adventure.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/spots"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Browse Spots
              </Link>
              <Link
                href="/about"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2">
              <Link
                href="/help"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Help Center
              </Link>
              <Link
                href="/privacy"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/safety"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Safety Guidelines
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@safetrip.ph</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+63 123 456 7890</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Manila, Philippines</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SafeTrip Explorer PH. Created by BSIT Students.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Mark Wendell M. Aquino</span>
            <span>•</span>
            <span>Jello Moreno</span>
            <span>•</span>
            <span>Princess Nicole Mercado</span>
            <span>•</span>
            <span>Prinze Muyo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
