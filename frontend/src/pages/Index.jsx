import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Calculator from '../components/Calculator';
import AuditLog from '../components/AuditLog';
import { Moon, Sun } from 'lucide-react';

export default function Index() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950 transition-colors">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculator Pro
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              with Audit Logging
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1  gap-8 mb-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
            </div>
            <Calculator />
          </section>
        </div>

        <section>
          <AuditLog />
        </section>
      </main>
    </div>
  );
}
