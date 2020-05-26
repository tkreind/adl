import { Geo } from './Geo';
/**
 * @since 2.3
 */
export interface Place {
    /**
     * @since 2.3
     */
    contained_within: Array<string> & MinimumElements<1>;
    /**
     * @since 2.3
     */
    country: string;
    /**
     * @since 2.3
     */
    country_code: string & RegularExpression<"^[A-Z]{2}$">;
    /**
     * @since 2.3
     */
    full_name?: string;
    /**
     * @since 2.3
     */
    geo: Geo;
    /**
     * @since 2.3
     */
    id?: string;
    /** @since 2.3 */
    name: string;
    /**
     * @since 2.3
     */
    place_type: PlaceType;
}
