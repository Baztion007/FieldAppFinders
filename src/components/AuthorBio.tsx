import React from 'react';
import { BadgeCheck } from 'lucide-react';

interface AuthorBioProps {
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  expertiseTags?: string[];
}

export function AuthorBio({ name, role, bio, avatarUrl, expertiseTags }: AuthorBioProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-4 my-10 shadow-sm print:hidden">
      <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0 flex items-center justify-center text-xl font-bold text-slate-500 dark:text-slate-400">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          name.charAt(0)
        )}
      </div>
      <div className="text-center sm:text-left flex-1">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-1.5">
          {name}
          <span title="Verified Reviewer" className="inline-flex">
            <BadgeCheck className="w-5 h-5 text-blue-500" aria-label="Verified Reviewer" />
          </span>
        </h4>
        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2 font-medium">{role}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{bio}</p>
        {expertiseTags && expertiseTags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {expertiseTags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-slate-600 dark:text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
