export interface IResults {
  url: string;
  name: string;
}

export interface IPokes {
  count: number;
  next: string | null;
  previous: null | string;
  results: IResults;
}

export interface IPokesInfo {
  sprites: { other: { dream_world: string } };
}
