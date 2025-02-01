import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GetWeekReview } from "@/graphql/queries";
import { useFragment } from "@/gql/fragment-masking";
import { ReviewFields, NoteFields } from "@/graphql/fragments";
import type { ReviewFieldsFragment, NoteFieldsFragment } from "@/gql/graphql";

const useReviewQuery = (year: number, month: number, week: number) => {
  // Graphql
  const { result, refetch } = useQuery(GetWeekReview, {
    year: year,
    month: month,
    week: week,
  });

  const review = computed((): ReviewFieldsFragment | undefined =>
    useFragment(ReviewFields, result.value?.weekReview ?? undefined),
  );

  const notes = computed(
    (): NoteFieldsFragment[] =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      review.value?.notes.map((note: any) => useFragment(NoteFields, note)) ??
      [],
  );

  // Filter notes by type
  const useNotesByType = (
    notes: ComputedRef<NoteFieldsFragment[]>,
    type: string,
  ) => {
    return computed((): NoteFieldsFragment[] => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return notes.value.filter((note: any) => note.type === type);
    });
  };

  const eventNotes = useNotesByType(notes, "event");
  const learnNotes = useNotesByType(notes, "learn");
  const nextNotes = useNotesByType(notes, "next");

  return {
    // Review
    review,
    refetch,
    // Notes
    eventNotes,
    learnNotes,
    nextNotes,
  };
};

export default useReviewQuery;
