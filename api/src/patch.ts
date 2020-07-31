/* eslint-disable @typescript-eslint/naming-convention */
import {juggler, AnyObject, DefaultCrudRepository} from '@loopback/repository';

import {BaseModel} from './models';

export function patchPersistedModel(): void {
  const patchProto: AnyObject = DefaultCrudRepository.prototype;
  patchProto.definePersistedModel = function definePersistedModel(
    entityClass: typeof BaseModel, // BaseModel extends Model and has hiddenProps and hiddenRelations static properties
  ): typeof juggler.PersistedModel {
    const {dataSource} = this;
    const {definition} = entityClass;
    // To handle circular reference back to the same model,
    // we create a placeholder model that will be replaced by real one later
    dataSource.getModel(definition.name, true /* forceCreate */);

    // We need to convert property definitions from PropertyDefinition
    // to plain data object because of a juggler limitation
    const properties: {[name: string]: object} = {};

    // We need to convert PropertyDefinition into the definition that
    // the juggler understands
    Object.entries(definition.properties).forEach(([key, value]) => {
      // always clone value so that we do not modify the original model definition
      // ensures that model definitions can be reused with multiple datasources
      if (value.type === 'array' || value.type === Array) {
        value = {
          ...value,
          type: [value.itemType && this.resolvePropertyType(value.itemType)],
        };
        delete value.itemType;
      } else {
        value = {...value, type: this.resolvePropertyType(value.type)};
      }
      properties[key] = {...value};
    });
    const modelClass = dataSource.createModel(definition.name, properties, {
      // settings that users can override
      strict: true,
      // user-defined settings
      ...definition.settings,
      __relations__: definition.relations,
      __hiddenProps__: entityClass.hiddenProps ?? [],
      __hiddenRelations__: entityClass.hiddenRelations ?? [],
      // settings enforced by the framework
      strictDelete: false,
    });
    // console.log(modelClass);
    modelClass.attachTo(dataSource);
    return modelClass;
  };
}

export default patchPersistedModel;
