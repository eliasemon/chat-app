import { promises as fs } from 'fs';
import path from 'path';
import { Router } from 'express';
import logger from '@/utils/logger';

const apiDir = path.resolve(__dirname, '..');
function checkInvalidCharacters(fileName, filePath) {
  // List of invalid characters for route
  const invalidCharacters = [
    ' ',
    '"',
    '<',
    '>',
    '#',
    '%',
    '{',
    '}',
    '|',
    '\\',
    '?',
    '/',
    '^',
    '+',
    '[',
    ']',
    ')',
    '(',
    '`',
  ];

  // Check if the URL contains any of the invalid characters
  invalidCharacters.forEach((char) => {
    if (fileName.includes(char)) {
      throw new Error(`Invalid character found: '${char}' in the ${filePath}.`);
    }
  });

  // If no invalid characters are found
  return 'No invalid characters found.';
}

export async function addRoutesFromFolders(
  router: Router,
  routesPath: string,
): Promise<void> {
  const absoluteRoutesPath = path.resolve(apiDir, routesPath);
  let totalRoutes: number = 0;

  async function traverseDirectory(
    currentPath: string,
    baseRoute: string,
  ): Promise<void> {
    const items = await fs.readdir(currentPath, { withFileTypes: true });

    const routeFile = items.find(
      (item) =>
        (item.name === 'route.ts' || item.name === 'route.js') && item.isFile(),
    );

    const middlewareFile = items.find(
      (item) =>
        (item.name === 'middleware.ts' || item.name === 'middleware.js') &&
        item.isFile(),
    );

    try {
      // Handle middleware if present
      if (middlewareFile) {
        const middlewareHandler = (
          await import(path.join(currentPath, middlewareFile.name))
        ).default;

        if (middlewareHandler) {
          router.use(baseRoute, middlewareHandler);
          logger.info(
            `Middleware ${baseRoute} added with ${middlewareFile.name}`,
          );
        } else {
          throw new Error(
            `Error adding middleware ${path.join(currentPath, middlewareFile.name)}: middleware not found or has no default export`,
          );
        }
      }

      // Handle route if present
      if (routeFile) {
        const routeHandler = (
          await import(path.join(currentPath, routeFile.name))
        ).default;

        if (routeHandler) {
          router.use(baseRoute, routeHandler);
          logger.info(`Route ${baseRoute} added with ${routeFile.name}`);
          totalRoutes += 1;
        } else {
          throw new Error(
            `Error adding route ${path.join(currentPath, routeFile.name)}: route not found or has no default export`,
          );
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        logger.error(`Error adding route ${baseRoute}: \n ${error.message}`);

      throw error;
    }

    // Recursively traverse directories
    await Promise.all(
      items.map(async (item) => {
        if (item.isDirectory()) {
          const itemPath = path.join(currentPath, item.name);
          checkInvalidCharacters(item.name, itemPath);
          await traverseDirectory(itemPath, `${baseRoute}/${item.name}`);
        }
      }),
    );
  }

  await traverseDirectory(absoluteRoutesPath, '');

  // Log the results
  if (totalRoutes > 0) {
    logger.info(`${totalRoutes} routes have been added`);
    logger.info('Routes added successfully');
  } else {
    logger.info('No routes have been added');
  }
}
