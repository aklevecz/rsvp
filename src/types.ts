export enum Sections {
  INITIAL,
  INFO,
  CONFIRM,
  RECEIPT,
}

export interface SectionState {
  state: Sections;
}

export type UiState = {
  top: SectionState;
  prompt: SectionState;
  responses: SectionState;
};
