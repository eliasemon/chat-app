import { promises as fs } from 'fs';
import path from 'path';
import { Router } from 'express';
import logger from '@/utils/logger';

const srcDir = path.resolve(__dirname, '..');

export async function addRoutesFromFolders(router: Router, routesPath: string): Promise<void> {


  const absoluteRoutesPath = path.resolve(srcDir, routesPath);
  let totalRoutes: number = 0;
  async function traverseDirectory(currentPath: string, baseRoute: string): Promise<void> {
    const items = await fs.readdir(currentPath, { withFileTypes: true });
    for (const item of items) {
      const itemPath = path.join(currentPath, item.name);
      if (item.isDirectory()) {
        await traverseDirectory(itemPath, `${baseRoute}/${item.name}`);
        // return;
      } else if (item.isFile() && (item.name === 'route.ts' || item.name === 'route.js')) {
        try {
          const routeHandler = (await import(itemPath)).default;
          router.use(baseRoute, routeHandler);
          logger.info(`Route ${baseRoute} added with ${item.name}`);
          totalRoutes++;
        } catch (err : any) {
          logger.error(`Error adding route ${baseRoute}: ${err.message}`);
        }
        // return
      }
    }
  }

  await traverseDirectory(absoluteRoutesPath, '');
  if(totalRoutes > 0){
    logger.info(`${totalRoutes} routes have been added`);
    logger.info('Routes added successfully');
  }else{
    logger.info(`No routes have been added`);
  }
}
