import { gql } from "@apollo/client";

export const LIST_PROCEDURES = gql`
  query ListProcedures {
    listProcedures {
      items {
        id
        name
        code
        reclaimed
        difference
        authorized
      }
    }
  }
`;

export const CREATE_PROCEDURE = gql`
  mutation CreateProcedure($input: CreateProcedureInput!) {
    createProcedure(input: $input) {
      id
      name
      code
      reclaimed
      difference
      authorized
    }
  }
`;

// Mutación para actualizar un procedimiento
export const UPDATE_PROCEDURE = gql`
  mutation UpdateProcedure($input: UpdateProcedureInput!) {
    updateProcedure(input: $input) {
      id
      name
      code
      reclaimed
      difference
      authorized
    }
  }
`;

export const DELETE_PROCEDURE = gql`
  mutation DeleteProcedure($input: DeleteProcedureInput!) {
    deleteProcedure(input: $input) {
      id
    }
  }
`;

export const UPSERT_PROCEDURES = gql`
  mutation UpsertProcedures($procedures: [ProcedureInput!]!) {
    upsertProcedures(procedures: $procedures) {
      id
      name
      code
      reclaimed
      difference
      authorized
    }
  }
`;
