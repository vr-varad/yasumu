import { InvalidLocationError } from '@/common/errors/InvalidLocationError.js';
import type { YasumuWorkspace } from '../YasumuWorkspace.js';
import { INDEX_FILE_NAME } from './constants.js';

export interface IndexParams {
  location: string;
  id: string;
}

export type Index = Record<string, string>;

export class YasumuIndexerService {
  public constructor(public readonly workspace: YasumuWorkspace) {}

  /**
   * Create an index for a location. If the index already exists, it will be updated.
   * @param options The options for creating the index.
   */
  public async createIndex(options: IndexParams) {
    const index = await this.getIndexFile(options.location);

    index[options.id] = options.location;

    return this.saveIndex(options.location, index);
  }

  /**
   * Delete an index for a location.
   * @param options The options for deleting the index.
   */
  public async deleteIndex(options: IndexParams) {
    const index = await this.getIndexFile(options.location);

    delete index[options.id];

    return this.saveIndex(options.location, index);
  }

  /**
   * Find the location of an ID in an index.
   * @param location The location of the index.
   * @param id The ID to find.
   * @returns The location of the ID, or `null` if not found.
   */
  public async findIndex(location: string, id: string): Promise<string | null> {
    const index = await this.getIndexFile(location);

    return index[id] ?? null;
  }

  /**
   * The index of a location.
   * @param location The location of the index, or a file path within the index.
   * @returns The index of the location.
   */
  public async resolveIndexPath(location: string): Promise<string> {
    const path = this.workspace.yasumu.path;
    let targetLocation = location;

    const [isDir, isFile] = await Promise.all([
      this.workspace.yasumu.fs.readDir(location).then(
        () => true,
        () => false,
      ),
      this.workspace.yasumu.fs.readFile(location).then(
        () => true,
        () => false,
      ),
    ]);

    if (!isDir && !isFile) {
      throw new InvalidLocationError(location);
    }

    if (isFile) {
      targetLocation = await path.dirname(location);
    }

    return targetLocation;
  }

  /**
   * Resolves the index file for a location.
   * @param location The location of the index.
   * @returns The index file.
   */
  public async getIndexFile(location: string): Promise<Index> {
    const path = this.workspace.yasumu.path;
    const targetLocation = await this.resolveIndexPath(location);
    const indexPath = await path.join(targetLocation, INDEX_FILE_NAME);
    const json = await this.workspace.yasumu.fs.readTextFile(indexPath);

    return JSON.parse(json);
  }

  /**
   * Save an index to a location.
   * @param location The location of the index.
   * @param index The index to save.
   */
  public async saveIndex(location: string, index: Index): Promise<void> {
    const path = this.workspace.yasumu.path;
    const targetLocation = await this.resolveIndexPath(location);
    const indexPath = await path.join(targetLocation, INDEX_FILE_NAME);

    return this.workspace.yasumu.fs.writeTextFile(indexPath, JSON.stringify(index));
  }
}