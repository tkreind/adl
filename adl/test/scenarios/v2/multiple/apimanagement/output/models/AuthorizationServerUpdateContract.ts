import { Resource } from './Resource';
import { AuthorizationServerUpdateContractProperties } from './AuthorizationServerUpdateContractProperties';
/**
 * @description External OAuth authorization server settings.
 * @since 2019-12-01
 */
export interface AuthorizationServerUpdateContract extends Resource {
    /**
     * @description Properties of the External OAuth authorization server update Contract.
     * @since 2019-12-01
     */
    properties: AuthorizationServerUpdateContractProperties;
}
