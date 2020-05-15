import { NamedValueEntityBaseParameters } from './NamedValueEntityBaseParameters';
/**
 * 
 * @description NamedValue Contract properties.
 */
export interface NamedValueUpdateParameterProperties extends NamedValueEntityBaseParameters {
    /**
     * 
     * @description Unique name of NamedValue. It may contain only letters, digits, period, dash, and underscore characters.
     */
    displayName: any;
    /**
     * 
     * @description Value of the NamedValue. Can contain policy expressions. It may not be empty or consist only of whitespace.
     */
    value: any;
}
