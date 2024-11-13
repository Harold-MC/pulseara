interface IProcedure {
  id: string;
  name: string;
  code: number;
  reclaimed: number;
  difference: number;
  authorized: number;
}

export interface IProcedureItemQL extends IProcedure {
  __typename?: string;
}

export default IProcedure;
