"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Building2,
  Newspaper,
  User,
  HelpCircle,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ============================================================================
// SOURCE CITATION - EpistemicGuard Article IV (Auditability)
// Proper attribution and citation display
// ============================================================================

export type SourceType = "peer-reviewed" | "institutional" | "news" | "user-generated" | "unknown";

export interface SourceCitationProps {
  title: string;
  type: SourceType;
  authors?: string[];
  publication?: string;
  date?: string;
  url?: string;
  doi?: string;
  accessDate?: string;
  snippet?: string;
  className?: string;
}

const typeIcons: Record<SourceType, React.ReactNode> = {
  "peer-reviewed": <BookOpen className="w-4 h-4" />,
  institutional: <Building2 className="w-4 h-4" />,
  news: <Newspaper className="w-4 h-4" />,
  "user-generated": <User className="w-4 h-4" />,
  unknown: <HelpCircle className="w-4 h-4" />,
};

const typeColors: Record<SourceType, string> = {
  "peer-reviewed": "text-clinical-teal bg-clinical-teal/10",
  institutional: "text-soul-gold bg-soul-gold/10",
  news: "text-terracotta bg-terracotta/10",
  "user-generated": "text-muted-foreground bg-muted",
  unknown: "text-muted-foreground bg-muted",
};

const typeLabels: Record<SourceType, string> = {
  "peer-reviewed": "Peer-Reviewed",
  institutional: "Institutional",
  news: "News Media",
  "user-generated": "User Content",
  unknown: "Unknown Source",
};

export function SourceCitation({
  title,
  type,
  authors,
  publication,
  date,
  url,
  doi,
  accessDate,
  snippet,
  className,
}: SourceCitationProps) {
  const [copied, setCopied] = React.useState(false);

  const formatAuthors = (authorList: string[]) => {
    if (authorList.length === 0) return "";
    if (authorList.length === 1) return authorList[0];
    if (authorList.length === 2) return `${authorList[0]} & ${authorList[1]}`;
    return `${authorList[0]} et al.`;
  };

  const generateCitation = () => {
    const parts: string[] = [];
    if (authors && authors.length > 0) parts.push(formatAuthors(authors));
    if (date) parts.push(`(${date})`);
    parts.push(title);
    if (publication) parts.push(publication);
    if (doi) parts.push(`DOI: ${doi}`);
    if (url) parts.push(`Retrieved from ${url}`);
    return parts.join(". ");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateCitation());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg border border-border bg-background/50",
        className
      )}
      role="article"
      aria-label={`Source: ${title}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium",
              typeColors[type]
            )}
          >
            {typeIcons[type]}
            {typeLabels[type]}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy citation"}
        >
          {copied ? (
            <Check className="w-4 h-4 text-clinical-teal" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Title */}
      <h4 className="font-medium text-foreground mb-1">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-clinical-teal hover:underline inline-flex items-center gap-1"
          >
            {title}
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        ) : (
          title
        )}
      </h4>

      {/* Authors & Publication */}
      <div className="text-sm text-muted-foreground">
        {authors && authors.length > 0 && (
          <span>{formatAuthors(authors)}</span>
        )}
        {publication && (
          <>
            {authors && authors.length > 0 && <span> • </span>}
            <span className="italic">{publication}</span>
          </>
        )}
        {date && (
          <>
            <span> • </span>
            <span>{date}</span>
          </>
        )}
      </div>

      {/* DOI */}
      {doi && (
        <div className="mt-1 text-xs text-muted-foreground">
          DOI:{" "}
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-clinical-teal hover:underline"
          >
            {doi}
          </a>
        </div>
      )}

      {/* Snippet */}
      {snippet && (
        <blockquote className="mt-3 pl-3 border-l-2 border-border text-sm text-muted-foreground italic">
          &ldquo;{snippet}&rdquo;
        </blockquote>
      )}

      {/* Access Date */}
      {accessDate && (
        <p className="mt-2 text-xs text-muted-foreground">
          Accessed: {accessDate}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// SOURCE LIST - Collection of citations
// ============================================================================

export interface SourceListProps {
  sources: SourceCitationProps[];
  title?: string;
  className?: string;
}

export function SourceList({ sources, title = "Sources", className }: SourceListProps) {
  if (sources.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
        <BookOpen className="w-4 h-4" aria-hidden="true" />
        {title} ({sources.length})
      </h3>
      <div className="space-y-3" role="list">
        {sources.map((source, index) => (
          <SourceCitation key={index} {...source} />
        ))}
      </div>
    </div>
  );
}
