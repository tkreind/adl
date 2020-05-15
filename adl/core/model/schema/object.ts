import { isAnonymous, TargetMap, valueOf } from '@azure-tools/sourcemap';
import { Identifier, InterfaceDeclaration, PropertySignature } from 'ts-morph';
import { getPath, TypeDeclaration } from '../../support/typescript';
import { ApiModel } from '../api-model';
import { NamedElement, Schema, TSSchema } from './schema';

interface Collection<T> {
  push(value: T): void;
  remove(value: T): void;
  get(): Array<T>;
}

class CollectionImpl<TCollectionType,TOwner> implements Collection<TCollectionType> {
  constructor(owner: TOwner, public push: (value: TCollectionType) => void = (v: TCollectionType) => { /* nothing */ }, public remove: (value: TCollectionType) => void = (v: TCollectionType) => { /* nothing */}, public get: () => Array<TCollectionType> = () => []) {
    this.push = push.bind(owner);
    this.remove = remove.bind(owner);
    this.get = get.bind(owner);
  }
}

export interface ObjectSchema extends Schema {
  /** schemas that this object extends */
  readonly parents: Collection<TSSchema<TypeDeclaration>>;
  
  /** the collection of properties that are in this object */
  readonly properties: Collection<Property>;
  
  /**  maximum number of properties permitted */
  maxProperties?: number;

  /**  minimum number of properties permitted */
  minProperties?: number;

  /** the desired name when generating code */
  clientName?: string;

  createProperty(name: string, schema: Schema, initializer?: Partial<Property>): Property;
}

export class ObjectSchemaImpl extends TSSchema<InterfaceDeclaration> implements ObjectSchema {
  get targetMap(): TargetMap {
    return {
      ...super.targetMap,
      $: getPath(this.node)
    };
  }

  addParent(parent: TSSchema<TypeDeclaration> ) {
    // ensure we have an import to the type
    // and add it to the list
    const ref = this.getTypeReference(parent);
    

    this.node.addExtends(ref.getName()!);
  }
  removeParent(parent: TSSchema<TypeDeclaration>) {
    // remove the parent from the schema
    for( const base of this.node.getExtends() ) {
      // todo: how do we identify which base is the one we're removing.
      // have to debug this to find out.
      // if( /**??? */ ) {
      // this is the one, remove it
      // this.node.removeExtends(base);
      //  break;
      // }
    }

  }
  getParents(): Array<TSSchema<TypeDeclaration>> {
    // return a wrapper object for each typedecl
    return this.node.getBaseDeclarations().map( each => new TSSchema<TypeDeclaration>('',each)  );
  }

  constructor(node: InterfaceDeclaration) {
    super('object', node);
    this.parents = new CollectionImpl(this, this.addParent, this.removeParent, this.getParents);
    this.properties = new CollectionImpl(this);

  }
  parents: Collection<TSSchema<TypeDeclaration>>;
  properties: Collection<Property>;
 
  maxProperties?: number;
  minProperties?: number;
  clientName?: string;

  createProperty(name: string, schema: Schema, initializer?: Partial<Property>): Property {
    
    const result = new PropertyImpl(this.node.addProperty({
      //todo: do a better 'fix-the-bad-name' (ie, perks/codegen)
      name: valueOf(name).replace(/[^\w]+/g, '_'),
      type: schema instanceof TSSchema ? this.getTypeReference(schema).getName() : 'any',
    }));

    result.initialize(initializer);

    result.track({
      $: name,
      type: schema,
    });

    return result;

  }
}
let counter = 0;

export function createObjectSchema(api: ApiModel, name: Identifier, initializer?: Partial<ObjectSchema>): ObjectSchema {
  const file = api.getObjectSchemaFile( valueOf(name));
  const n = isAnonymous(name) ? `object_${counter++}` :<string><any> valueOf(name);
  const result= new ObjectSchemaImpl(file.addInterface({
    //todo: do a better 'fix-the-bad-name' (ie, perks/codegen)
    name: n.replace(/[^\w]+/g, '_'),
    isExported: true,
  }));

  result.initialize(initializer);
  
  result.track( {
    $: name, 
  });

  return result;
}

export interface Property extends PropertyImpl {

}

export class PropertyImpl extends NamedElement<PropertySignature> {
  /** indicates the properts is required */
  get required(): boolean {
    return this.node.hasQuestionToken();
  }
  set required(value: boolean) {
    this.node.setHasQuestionToken(value);
  }

  /**
   * Declares the property as "read only".  
   * A property MUST NOT be marked as both readOnly and writeOnly being true. 
   * Default value is false.
   */
  get readonly(): boolean {
    return this.node.isReadonly();
  }
  set readonly(value: boolean) {
    this.node.setIsReadonly(value);
  }

  /**
   * Declares the property as "write only". 
   * A property MUST NOT be marked as both readOnly and writeOnly being true. 
   * Default value is false.
   * 
   */
  get writeonly(): boolean {
    // todo: tear apart the property type looking for `& WriteOnly`
    return false;
  }
  set writeonly(value: boolean) {
    // todo: implement by adding a `& WriteOnly`
  }

  /**
   * the desired name when generating code.
   */
  get clientName(): string|undefined {
    return this.getDocTag('clientName');
  }
  set clientName(value: string|undefined) {
    // todo: implement by adding a `& WriteOnly`
    this.addDocTag('clientName', value);
  }

  constructor(node: PropertySignature) {
    super(node);
  }
  
}
