 
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
};

export type CreateNoteInput = {
  content: Scalars["String"]["input"];
  review_id: Scalars["ID"]["input"];
  type: Scalars["String"]["input"];
};

export type CreateReviewInput = {
  month: InputMaybe<Scalars["Int"]["input"]>;
  notes: Array<CreateReviewNoteInput>;
  week: InputMaybe<Scalars["Int"]["input"]>;
  year: Scalars["Int"]["input"];
};

export type CreateReviewNoteInput = {
  content: Scalars["String"]["input"];
  type: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createNote: Note;
  createReview: Review;
  deleteNote: Note;
};

export type MutationCreateNoteArgs = {
  input: CreateNoteInput;
};

export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};

export type MutationDeleteNoteArgs = {
  id: Scalars["ID"]["input"];
};

export type Note = {
  __typename?: "Note";
  content: Scalars["String"]["output"];
  created_at: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  review_id: Scalars["ID"]["output"];
  type: Scalars["String"]["output"];
  updated_at: Scalars["DateTime"]["output"];
};

export type Query = {
  __typename?: "Query";
  review: Maybe<Review>;
  weekReview: Maybe<Review>;
};

export type QueryWeekReviewArgs = {
  month: Scalars["Int"]["input"];
  week: Scalars["Int"]["input"];
  year: Scalars["Int"]["input"];
};

export type Review = {
  __typename?: "Review";
  created_at: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  month: Scalars["Int"]["output"];
  notes: Array<Note>;
  updated_at: Scalars["DateTime"]["output"];
  week: Scalars["Int"]["output"];
  year: Scalars["Int"]["output"];
};

export type ReviewFieldsFragment = {
  __typename?: "Review";
  id: string;
  year: number;
  month: number;
  week: number;
  notes: Array<
    { __typename?: "Note" } & {
      " $fragmentRefs"?: { NoteFieldsFragment: NoteFieldsFragment };
    }
  >;
} & { " $fragmentName"?: "ReviewFieldsFragment" };

export type NoteFieldsFragment = {
  __typename?: "Note";
  id: string;
  type: string;
  content: string;
} & { " $fragmentName"?: "NoteFieldsFragment" };

export type CreateReviewMutationVariables = Exact<{
  input: CreateReviewInput;
}>;

export type CreateReviewMutation = {
  __typename?: "Mutation";
  createReview: {
    __typename?: "Review";
    id: string;
    year: number;
    month: number;
    week: number;
    created_at: string;
    updated_at: string;
  };
};

export type CreateNoteMutationVariables = Exact<{
  input: CreateNoteInput;
}>;

export type CreateNoteMutation = {
  __typename?: "Mutation";
  createNote: {
    __typename?: "Note";
    id: string;
    review_id: string;
    content: string;
    type: string;
    created_at: string;
    updated_at: string;
  };
};

export type DeleteNoteMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteNoteMutation = {
  __typename?: "Mutation";
  deleteNote: {
    __typename?: "Note";
    id: string;
    content: string;
    type: string;
    created_at: string;
    updated_at: string;
  };
};

export type GetWeekReviewQueryVariables = Exact<{
  year: Scalars["Int"]["input"];
  month: Scalars["Int"]["input"];
  week: Scalars["Int"]["input"];
}>;

export type GetWeekReviewQuery = {
  __typename?: "Query";
  weekReview:
    | ({ __typename?: "Review" } & {
        " $fragmentRefs"?: { ReviewFieldsFragment: ReviewFieldsFragment };
      })
    | null;
};

export const NoteFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "NoteFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Note" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "content" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NoteFieldsFragment, unknown>;
export const ReviewFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReviewFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Review" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "year" } },
          { kind: "Field", name: { kind: "Name", value: "month" } },
          { kind: "Field", name: { kind: "Name", value: "week" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "notes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "NoteFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "NoteFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Note" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "content" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReviewFieldsFragment, unknown>;
export const CreateReviewDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateReview" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateReviewInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createReview" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
                { kind: "Field", name: { kind: "Name", value: "month" } },
                { kind: "Field", name: { kind: "Name", value: "week" } },
                { kind: "Field", name: { kind: "Name", value: "created_at" } },
                { kind: "Field", name: { kind: "Name", value: "updated_at" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateReviewMutation,
  CreateReviewMutationVariables
>;
export const CreateNoteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateNote" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateNoteInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createNote" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "review_id" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "created_at" } },
                { kind: "Field", name: { kind: "Name", value: "updated_at" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateNoteMutation, CreateNoteMutationVariables>;
export const DeleteNoteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteNote" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteNote" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "created_at" } },
                { kind: "Field", name: { kind: "Name", value: "updated_at" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteNoteMutation, DeleteNoteMutationVariables>;
export const GetWeekReviewDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetWeekReview" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "year" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "month" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "week" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "weekReview" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "year" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "year" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "month" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "month" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "week" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "week" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReviewFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "NoteFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Note" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "content" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReviewFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Review" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "year" } },
          { kind: "Field", name: { kind: "Name", value: "month" } },
          { kind: "Field", name: { kind: "Name", value: "week" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "notes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "NoteFields" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetWeekReviewQuery, GetWeekReviewQueryVariables>;
