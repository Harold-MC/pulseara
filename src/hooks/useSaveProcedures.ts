import { useMutation } from "@apollo/client";
import {
  CREATE_PROCEDURE,
  UPDATE_PROCEDURE,
  DELETE_PROCEDURE,
} from "../network/queries";
import IProcedure from "../models/IProcedure";

// TODO: esta no es la mejor forma de como manejar el bulk de acciones del Crud. Lo ideal seria mandar toda la lista al backend
// y que el resolver se encargue de procesarla. Comenze a configurar un lambda function para dicho objetivo, pero debido algunos
// contratiempos de configuracion de la lambda y el limite de tiempo para la prueba, decidi completar temporalmente de esta forma.
export const useSaveProcedures = (originalList: IProcedure[]) => {
  const [createProcedure] = useMutation(CREATE_PROCEDURE);
  const [updateProcedure] = useMutation(UPDATE_PROCEDURE);
  const [deleteProcedure] = useMutation(DELETE_PROCEDURE);

  return async (modifiedList: Partial<IProcedure>[]) => {
    const getChanges = () => {
      const newProcedures = modifiedList.filter(
        (modifiedItem) =>
          !originalList.some((item) => item.id === modifiedItem.id)
      );

      const updatedProcedures = modifiedList.filter((modifiedItem) =>
        originalList.some(
          (item) =>
            item.id === modifiedItem.id &&
            (item.name !== modifiedItem.name ||
              item.code !== modifiedItem.code ||
              item.reclaimed !== modifiedItem.reclaimed ||
              item.difference !== modifiedItem.difference ||
              item.authorized !== modifiedItem.authorized)
        )
      );

      const deletedProcedures = originalList.filter(
        (originalItem) =>
          !modifiedList.some((item) => item.id === originalItem.id)
      );

      return { newProcedures, updatedProcedures, deletedProcedures };
    };

    try {
      const { newProcedures, updatedProcedures, deletedProcedures } =
        getChanges();

      for (const procedure of newProcedures) {
        await createProcedure({
          variables: { input: procedure },
        });
      }

      for (const procedure of updatedProcedures) {
        await updateProcedure({
          variables: { input: procedure },
        });
      }

      for (const procedure of deletedProcedures) {
        await deleteProcedure({
          variables: { input: { id: procedure.id } },
        });
      }

      console.log("Bulk save realizado con éxito");
    } catch (error) {
      console.error("Error guardando los procedimientos", error);
    }
  };
};
