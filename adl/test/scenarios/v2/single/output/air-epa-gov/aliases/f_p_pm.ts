
/**
 * Percent Minority Population Limiter.  Enter a value to restrict results to facilities with a given percentage of minority population within 3-mile radius.
 * - NONE = 0%
 * - GT5 = greater than 5%
 * - GT10 = greater than 10%
 * - GT25 = greater than 25%
 * - GT50 = greater than 50%
 * - GT75 = greater than 75%
 */
export type f_p_pm = FormData<"NONE" | "GT5" | "GT10" | "GT25" | "GT50" | "GT75", "p_pm">;
