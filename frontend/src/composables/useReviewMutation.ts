import { useMutation } from "@vue/apollo-composable";
import type {
  CreateNoteMutation,
  CreateNoteMutationVariables,
  CreateReviewMutation,
  CreateReviewMutationVariables,
  DeleteNoteMutation,
  DeleteNoteMutationVariables,
} from "@/gql/graphql";
import { CreateReview, CreateNote, DeleteNote } from "@/graphql/mutations";

const useReviewMutation = () => {
  const {
    mutate: createNote,
    onDone: onCreateNoteDone,
    onError: onCreateNoteError,
    error: createNoteError,
  } = useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNote);

  const {
    mutate: deleteNote,
    onDone: onDeleteNoteDone,
    onError: onDeleteNoteError,
    error: deleteNoteError,
  } = useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNote);

  const {
    mutate: create,
    onDone: onCreateDone,
    onError: onCreateError,
    error: createError,
  } = useMutation<CreateReviewMutation, CreateReviewMutationVariables>(
    CreateReview,
  );

  return {
    // Review
    create,
    onCreateDone,
    onCreateError,
    createError,
    // Notes
    createNote,
    onCreateNoteDone,
    onCreateNoteError,
    createNoteError,
    deleteNote,
    onDeleteNoteDone,
    onDeleteNoteError,
    deleteNoteError,
  };
};

export default useReviewMutation;
