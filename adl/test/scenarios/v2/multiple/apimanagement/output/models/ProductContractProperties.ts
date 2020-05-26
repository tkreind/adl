import { ProductEntityBaseParameters } from './ProductEntityBaseParameters';
/** @since 2019-12-01 */
export interface ProductContractProperties extends ProductEntityBaseParameters {
    /** @since 2019-12-01 */
    displayName?: string & MaxLength<300> & MinLength<1>;
}
