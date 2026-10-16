'use client'
import { useTheme } from './Providers'

// iOS-style switch. The knob position comes from <html data-theme> in CSS,
// so it is correct on first paint even before React hydrates.
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`theme-switch ${className}`}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      <span className="theme-switch-knob" aria-hidden="true">
        <svg className="theme-icon-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        <svg className="theme-icon-moon" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      </span>
    </button>
  )
}
