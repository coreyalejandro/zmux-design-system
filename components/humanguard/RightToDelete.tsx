"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, AlertTriangle, Check, Loader2 } from "lucide-react";

// =============================================================================
// RIGHT TO DELETE - TLC Article II (Human Guard) Compliant
// Implements I3: Consent Safety - Users can withdraw consent and delete data
// =============================================================================

export interface DataCategory {
  id: string;
  name: string;
  description: string;
  itemCount?: number;
  canDelete: boolean;
  deletionDelay?: string;
}

export interface RightToDeleteProps {
  dataCategories: DataCategory[];
  onDelete: (categoryIds: string[]) => Promise<void>;
  onCancel?: () => void;
  confirmationPhrase?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function RightToDelete({
  dataCategories,
  onDelete,
  onCancel,
  confirmationPhrase = "DELETE",
  title = "Delete Your Data",
  description = "You have the right to delete your data at any time.",
  className,
}: RightToDeleteProps) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [confirmation, setConfirmation] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const deletableCategories = dataCategories.filter((c) => c.canDelete);
  const isConfirmed = confirmation.toUpperCase() === confirmationPhrase;
  const canDelete = selected.size > 0 && isConfirmed && !isDeleting;

  const handleToggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selected.size === deletableCategories.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(deletableCategories.map((c) => c.id)));
    }
  };

  const handleDelete = async () => {
    if (!canDelete) return;

    setIsDeleting(true);
    setError(null);

    try {
      await onDelete(Array.from(selected));
      setIsComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deletion failed. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isComplete) {
    return (
      <GlassCard className={cn("max-w-md w-full", className)}>
        <div className="text-center py-6">
          <div className="inline-flex p-3 rounded-full bg-green-500/10 mb-4">
            <Check className="w-6 h-6 text-green-600" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Data Deleted</h2>
          <p className="text-sm text-muted-foreground">
            Your selected data has been scheduled for deletion.
          </p>
          {onCancel && (
            <Button variant="outline" onClick={onCancel} className="mt-4">
              Close
            </Button>
          )}
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard
      className={cn("max-w-lg w-full", className)}
      role="dialog"
      aria-labelledby="delete-title"
      aria-describedby="delete-description"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="p-2 rounded-full bg-destructive/10">
          <Trash2 className="w-5 h-5 text-destructive" aria-hidden="true" />
        </div>
        <div>
          <h2 id="delete-title" className="text-lg font-semibold text-foreground">
            {title}
          </h2>
          <p id="delete-description" className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {/* Warning */}
      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-6">
        <div className="flex items-center gap-2 text-amber-600">
          <AlertTriangle className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm font-medium">This action cannot be undone</span>
        </div>
        <p className="text-xs text-amber-600/80 mt-1 ml-6">
          Once deleted, your data cannot be recovered.
        </p>
      </div>

      {/* Select All */}
      {deletableCategories.length > 1 && (
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
          <Checkbox
            id="select-all"
            checked={selected.size === deletableCategories.length}
            onCheckedChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
            Select all deletable data
          </label>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-3 mb-6" role="group" aria-label="Data categories to delete">
        {dataCategories.map((category) => (
          <div
            key={category.id}
            className={cn(
              "p-3 rounded-lg border transition-colors",
              category.canDelete
                ? selected.has(category.id)
                  ? "border-destructive/50 bg-destructive/5"
                  : "border-border hover:border-muted-foreground/30"
                : "border-border bg-muted/30 opacity-60"
            )}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                id={`category-${category.id}`}
                checked={selected.has(category.id)}
                onCheckedChange={() => handleToggle(category.id)}
                disabled={!category.canDelete}
                className="mt-0.5"
              />
              <div className="flex-1">
                <label
                  htmlFor={`category-${category.id}`}
                  className={cn(
                    "text-sm font-medium block",
                    category.canDelete ? "cursor-pointer" : "cursor-not-allowed"
                  )}
                >
                  {category.name}
                  {category.itemCount !== undefined && (
                    <span className="text-muted-foreground ml-2">
                      ({category.itemCount} items)
                    </span>
                  )}
                </label>
                <p className="text-xs text-muted-foreground mt-0.5">{category.description}</p>
                {category.deletionDelay && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Deletion delay: {category.deletionDelay}
                  </p>
                )}
                {!category.canDelete && (
                  <p className="text-xs text-amber-600 mt-1">
                    This data is required and cannot be deleted
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation */}
      {selected.size > 0 && (
        <div className="mb-6">
          <label htmlFor="confirmation" className="text-sm font-medium text-foreground block mb-2">
            Type <span className="font-mono text-destructive">{confirmationPhrase}</span> to confirm
          </label>
          <Input
            id="confirmation"
            type="text"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder={confirmationPhrase}
            className="font-mono"
            aria-describedby="confirmation-hint"
          />
          <p id="confirmation-hint" className="text-xs text-muted-foreground mt-1">
            This confirms you understand this action is permanent
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg mb-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
        )}
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={!canDelete}
          className="ml-auto"
        >
          {isDeleting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
              Deleting...
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4 mr-2" aria-hidden="true" />
              Delete {selected.size} {selected.size === 1 ? "category" : "categories"}
            </>
          )}
        </Button>
      </div>
    </GlassCard>
  );
}

export default RightToDelete;
