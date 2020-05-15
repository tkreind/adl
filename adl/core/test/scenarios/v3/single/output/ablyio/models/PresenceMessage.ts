import { Extras } from './Extras';
export interface PresenceMessage {
    /**
     * 
     * @description The event signified by a PresenceMessage.
     */
    readonly action: any;
    /**
     * 
     * @description The client ID of the publisher of this presence update.
     */
    clientId: any;
    /**
     * 
     * @description The connection ID of the publisher of this presence update.
     */
    connectionId: any;
    /**
     * 
     * @description The presence update payload, if provided.
     */
    data: any;
    /**
     * 
     * @description This will typically be empty as all presence updates received from Ably are automatically decoded client-side using this value. However, if the message encoding cannot be processed, this attribute will contain the remaining transformations not applied to the data payload.
     */
    encoding: any;
    extras: Extras;
    /**
     * 
     * @description Unique ID assigned by Ably to this presence update.
     */
    readonly id: any;
    /**
     * 
     * @description Timestamp when the presence update was received by Ably, as milliseconds since the epoch.
     */
    readonly timestamp: any;
}
