import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PROCEDURE,
  LIST_PROCEDURES,
  UPSERT_PROCEDURES,
} from "./queries";
import IProcedure, { IProcedureItemQL } from "../models/IProcedure";

export const useUpsertProcedures = () => {
  const [upsertProcedures] = useMutation(UPSERT_PROCEDURES);
  return upsertProcedures;
};

export const useCreateProcedure = () => {
  const [createProcedure] = useMutation(CREATE_PROCEDURE);

  return createProcedure;
};

export const useProcedures = () => {
  const { loading, data, refetch } = useQuery<{
    listProcedures: { items: IProcedure[] };
  }>(LIST_PROCEDURES);

  const results =
    data?.listProcedures?.items?.map((procedure: IProcedureItemQL) => {
      const { __typename, ...rest } = procedure;

      return rest;
    }) || [];

  return { data: results, loading, refetch };
};
