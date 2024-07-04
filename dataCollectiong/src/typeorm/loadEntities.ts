import fs from 'fs/promises';
import path from 'path';

import { EntitySchema } from 'typeorm';

export default async function loadEntities(): Promise<EntitySchema[]> {
  const entitiesDir = path.resolve(__dirname, '../typeorm/entity');
  const files = await fs.readdir(entitiesDir);

  const entities = await Promise.all(files.map(async file => {
    const filePath = path.join(entitiesDir, file);
    if (file.endsWith('.ts')) {
      const entityModule:Record<string, EntitySchema> = await import(filePath);
      const entity = Object.values(entityModule)[0] as EntitySchema;
      return entity;
    }
    throw new Error('check');
  }));
  return entities;
}
