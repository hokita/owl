/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  fragment ReviewFields on Review {\n    id\n    year\n    month\n    week\n    notes {\n      ...NoteFields\n    }\n  }\n": types.ReviewFieldsFragmentDoc,
    "\n  fragment NoteFields on Note {\n    id\n    type\n    content\n  }\n": types.NoteFieldsFragmentDoc,
    "\n  mutation CreateReview($input: CreateReviewInput!) {\n    createReview(input: $input) {\n      id\n      year\n      month\n      week\n      created_at\n      updated_at\n    }\n  }\n": types.CreateReviewDocument,
    "\n  mutation CreateNote($input: CreateNoteInput!) {\n    createNote(input: $input) {\n      id\n      review_id\n      content\n      type\n      created_at\n      updated_at\n    }\n  }\n": types.CreateNoteDocument,
    "\n  mutation DeleteNote($id: ID!) {\n    deleteNote(id: $id) {\n      id\n      content\n      type\n      created_at\n      updated_at\n    }\n  }\n": types.DeleteNoteDocument,
    "\n  query GetWeekReview($year: Int!, $month: Int!, $week: Int!) {\n    weekReview(year: $year, month: $month, week: $week) {\n      ...ReviewFields\n    }\n  }\n": types.GetWeekReviewDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ReviewFields on Review {\n    id\n    year\n    month\n    week\n    notes {\n      ...NoteFields\n    }\n  }\n"): (typeof documents)["\n  fragment ReviewFields on Review {\n    id\n    year\n    month\n    week\n    notes {\n      ...NoteFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NoteFields on Note {\n    id\n    type\n    content\n  }\n"): (typeof documents)["\n  fragment NoteFields on Note {\n    id\n    type\n    content\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateReview($input: CreateReviewInput!) {\n    createReview(input: $input) {\n      id\n      year\n      month\n      week\n      created_at\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  mutation CreateReview($input: CreateReviewInput!) {\n    createReview(input: $input) {\n      id\n      year\n      month\n      week\n      created_at\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateNote($input: CreateNoteInput!) {\n    createNote(input: $input) {\n      id\n      review_id\n      content\n      type\n      created_at\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  mutation CreateNote($input: CreateNoteInput!) {\n    createNote(input: $input) {\n      id\n      review_id\n      content\n      type\n      created_at\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteNote($id: ID!) {\n    deleteNote(id: $id) {\n      id\n      content\n      type\n      created_at\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteNote($id: ID!) {\n    deleteNote(id: $id) {\n      id\n      content\n      type\n      created_at\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWeekReview($year: Int!, $month: Int!, $week: Int!) {\n    weekReview(year: $year, month: $month, week: $week) {\n      ...ReviewFields\n    }\n  }\n"): (typeof documents)["\n  query GetWeekReview($year: Int!, $month: Int!, $week: Int!) {\n    weekReview(year: $year, month: $month, week: $week) {\n      ...ReviewFields\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;