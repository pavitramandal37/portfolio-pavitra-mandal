'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/data/site-config';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: isScrolled
          ? 'var(--nav-bg)'
          : 'linear-gradient(to bottom, rgba(14,14,14,0.55) 0%, rgba(14,14,14,0.2) 60%, transparent 100%)',
        backdropFilter: isScrolled ? 'blur(14px)' : 'none',
        boxShadow: isScrolled ? '0 1px 0 var(--border)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span
              className="text-2xl font-bold transition-colors duration-300"
              style={{ color: isScrolled ? 'var(--foreground)' : '#F4F1EA' }}
            >
              P<span style={{ color: '#E4572E' }}>.</span>
            </span>
            <span
              className="hidden sm:inline text-lg font-semibold transition-colors duration-300"
              style={{ color: isScrolled ? 'var(--foreground-muted)' : 'rgba(244,241,234,0.7)' }}
            >
              Pavitra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium transition-all duration-200"
                style={
                  !isScrolled
                    ? {
                        color: isActive(item.href) ? '#E4572E' : 'rgba(244,241,234,0.88)',
                        textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                      }
                    : {
                        color: isActive(item.href) ? 'var(--secondary)' : 'var(--foreground-muted)',
                        backgroundColor: isActive(item.href) ? 'var(--nav-active-bg)' : 'transparent',
                        borderRadius: '8px',
                      }
                }
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 transition-colors"
              style={{ color: isScrolled ? 'var(--foreground-muted)' : 'rgba(244,241,234,0.88)' }}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className="py-4 space-y-1 mb-4 shadow-lg"
            style={{ backgroundColor: 'var(--nav-bg)', border: '1px solid var(--border)', backdropFilter: 'blur(14px)' }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-base font-medium transition-colors"
                style={{
                  color: isActive(item.href) ? 'var(--secondary)' : 'var(--foreground-muted)',
                  backgroundColor: isActive(item.href) ? 'var(--nav-active-bg)' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
