import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type NavItem = {
  title: string;
  slug: string;
};

type PrevNextNavProps = {
  prev: NavItem | null;
  next: NavItem | null;
  basePath: string;
  label?: string;
};

export const PrevNextNav = ({ prev, next, basePath, label = 'Post' }: PrevNextNavProps) => {
  if (!prev && !next) return null;

  return (
    <nav className="mt-12 pt-8 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`${basePath}/${prev.slug}`}
          className="group flex flex-col items-start p-4 rounded-sm border border-zinc-800/80 bg-transparent hover:bg-black/5 hover:border-zinc-800 transition-all duration-200"
        >
          <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Previous {label}
          </span>
          <span className="mt-1.5 text-sm font-semibold text-zinc-200 group-hover:text-white line-clamp-1">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`${basePath}/${next.slug}`}
          className="group flex flex-col items-end text-right p-4 rounded-sm border border-zinc-800/80 bg-transparent hover:bg-black/5 hover:border-zinc-800 transition-all duration-200 sm:col-start-2"
        >
          <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
            Next {label}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="mt-1.5 text-sm font-semibold text-zinc-200 group-hover:text-white line-clamp-1">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
};

export function getPrevNextItems<T extends { title?: string | null; slug?: string | { current?: string } | null }>(
  items: T[],
  currentSlug: string
) {
  if (!items || items.length === 0) {
    return { prev: null, next: null };
  }

  const getItemSlug = (item: T) => {
    if (!item.slug) return '';
    return typeof item.slug === 'string' ? item.slug : item.slug.current || '';
  };

  const currentIndex = items.findIndex((item) => getItemSlug(item) === currentSlug);

  const prev =
    currentIndex > 0
      ? {
          title: items[currentIndex - 1].title || '',
          slug: getItemSlug(items[currentIndex - 1]),
        }
      : null;

  const next =
    currentIndex >= 0 && currentIndex < items.length - 1
      ? {
          title: items[currentIndex + 1].title || '',
          slug: getItemSlug(items[currentIndex + 1]),
        }
      : null;

  return { prev, next };
}
