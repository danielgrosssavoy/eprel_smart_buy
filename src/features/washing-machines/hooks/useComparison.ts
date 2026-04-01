import { useState, useCallback } from 'react';

const MAX_COMPARE = 3;

export function useComparison() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleCompare = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < MAX_COMPARE) {
        next.add(id);
      }
      return next;
    });
  }, []);

  const clearComparison = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isSelected = useCallback((id: string) => selectedIds.has(id), [selectedIds]);
  const isFull = selectedIds.size >= MAX_COMPARE;
  const count = selectedIds.size;

  return { selectedIds, toggleCompare, clearComparison, isSelected, isFull, count };
}
