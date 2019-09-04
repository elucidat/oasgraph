/**
 * Type definitions for the objects created during preprocessing for every
 * operation in the OAS.
 */
import { Oas3, LinkObject, ParameterObject, ServerObject, SchemaObject } from './oas3';
import { GraphQLScalarType, GraphQLObjectType, GraphQLInputObjectType, GraphQLList, GraphQLEnumType, GraphQLUnionType } from 'graphql';
import * as GraphQLJSON from 'graphql-type-json';
export declare type DataDefinition = {
    preferredName: string;
    schema: SchemaObject;
    targetGraphQLType: string;
    links: {
        [key: string]: LinkObject;
    };
    /**
     * Data definitions of subschemas in the schema
     *
     * I.e. If the dataDef is a list type, the subDefinition is a reference to the
     * list item type
     *
     * Or if the dataDef is an object type, the subDefinitions are references to
     * the field types
     *
     * Or if the dataDef is a union type, the subDefinitions are references to
     * the member types
     */
    subDefinitions: DataDefinition | {
        [fieldName: string]: DataDefinition;
    } | DataDefinition[];
    graphQLTypeName: string;
    graphQLInputObjectTypeName: string;
    graphQLType?: GraphQLObjectType | GraphQLList<any> | GraphQLUnionType | GraphQLEnumType | GraphQLScalarType | GraphQLJSON;
    graphQLInputObjectType?: GraphQLInputObjectType | GraphQLList<any>;
};
export declare type Operation = {
    /**
     * Identifier of the operation - may be created by concatenating method & path
     */
    operationId: string;
    /**
     * A combination of the operation method and path (and the title of the OAS
     * where the operation originates from if multiple OASs are provided) in the
     * form of:
     *
     * {title of OAS (if applicable)} {method in ALL_CAPS} {path}
     *
     * Used for documentation and logging
     */
    operationString: string;
    /**
     * Human-readable description of the operation
     */
    description: string;
    /**
     * URL path of this operation
     */
    path: string;
    /**
     * HTTP method for this operation
     */
    method: string;
    /**
     * Content-type of the request payload
     */
    payloadContentType?: string;
    /**
     * Information about the request payload (if any)
     */
    payloadDefinition?: DataDefinition;
    /**
     * Determines wheter request payload is required for the request
     */
    payloadRequired: boolean;
    /**
     * Content-type of the request payload
     */
    responseContentType?: string;
    /**
     * Information about the response payload
     */
    responseDefinition: DataDefinition;
    /**
     * List of parameters of the operation
     */
    parameters: ParameterObject[];
    /**
     * List of keys of security schemes required by this operation
     *
     * NOTE: Keys are sanitized
     * NOTE: Does not contain OAuth 2.0-related security schemes
     */
    securityRequirements: string[];
    /**
     * (Local) server definitions of the operation.
     */
    servers: ServerObject[];
    /**
     * Whether this operation should be placed in an authentication viewer\
     * (cannot be true if "viewer" option passed to OpenAPI-to-GraphQL is false).
     */
    inViewer: boolean;
    /**
     * Whether this operation is a mutation (or a query).
     */
    isMutation: boolean;
    /**
     * The success HTTP code, 200-299, destined to become a GraphQL object type
     */
    statusCode: string;
    /**
     * The OAS which this operation originated from
     */
    oas: Oas3;
};
