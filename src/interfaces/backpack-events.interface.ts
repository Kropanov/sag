export interface BackpackEvents {
  [event: string]: unknown;
  [event: symbol]: unknown;
  slotSelected: number;
}
