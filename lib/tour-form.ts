/**
 * Shared state shape for the Book-a-Tour form. Kept in a plain module (not the
 * "use server" action file, which may only export async functions) so both the
 * client form and the server action can import it.
 */
export type TourFormState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level validation messages, keyed by input name. */
  errors: Record<string, string>;
  /** Submitted values, echoed back so the form repopulates after an error. */
  values: Record<string, string>;
};

export const initialTourState: TourFormState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};
