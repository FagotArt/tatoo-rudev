"use server";
import fs from "fs/promises";
import path from "path";

interface SaveAssetOptions {
  /**
   * If true, overwrites an existing file with the same name.
   * Default is false.
   * @default false
   */
  overwrite?: boolean;

  /**
   * Custom base filename to use, preserving the file's original extension.
   * If not provided, the original filename is used.
   * @default null
   */
  baseFileName?: any;

  /**
   * Custom subdirectory to use. If not provided, the file is saved in the user's main directory.
   * @default null
   */
  subDir?: any;
}

interface SaveAssetsOptions {
  /**
   * If true, skips saving a file if it fails to save.
   * Default is false.
   * @default false
   */
  skipFailure?: boolean;

  /**
   * If true, overwrites an existing file with the same name.
   * Default is false.
   * @default false
   */
  overwrite?: boolean;

  /**
   * Custom subdirectory to use. If not provided, the file is saved in the user's main directory.
   * @default null
   */
  subDir?: any;
}

interface SaveFileOptions {
  /**
   * If true, overwrites an existing file with the same name.
   * Default is false.
   * @default false
   */
  overwrite?: boolean;

  /**
   * Custom base filename to use, preserving the file's original extension.
   * If not provided, the original filename is used.
   * @default null
   */
  baseFileName?: any;

  /**
   * directory to use. If not provided, the file is saved in the public directory.
   * @default null
   */
  Dir?: any;
}

export const saveUserAsset = async (fileObject: any, user: any, options: SaveAssetOptions = { overwrite: false, baseFileName: null }) => {
  if (!fileObject || fileObject.type !== "file") {
    return { error: "Invalid file object" };
  }

  const buffer = Buffer.from(fileObject.file?.split(",")[1], "base64");

  const extension = path.extname(fileObject.fileName);
  let fileName = options.baseFileName ? `${options.baseFileName}${extension}` : fileObject.fileName?.replace(/\s+/g, "_");

  const subDir = options.subDir ?? "";
  const userAssetsDir = path.join("public", "assets", "users", user._id.toString(), subDir);

  try {
    await fs.mkdir(userAssetsDir, { recursive: true });

    let filePath = path.join(userAssetsDir, fileName);
    let fileNumber = 0;

    while ((await fs.stat(filePath).catch(() => false)) && !options.overwrite) {
      fileNumber++;
      fileName = fileName.replace(new RegExp(`${extension}$`), `_${fileNumber}${extension}`);
      filePath = path.join(userAssetsDir, fileName);
    }

    await fs.writeFile(filePath, buffer);
    return { url: `/${path.relative("public", filePath)}` };
  } catch (error: any) {
    return { error: error.message || "Something went wrong while saving the images" };
  }
};

export const saveUserAssets = async (fileObjects: any[], user: any, options: SaveAssetsOptions = { overwrite: false, skipFailure: false }) => {
  const urls = [];
  const errors = [];
  let i = -1;

  for (const fileObject of fileObjects) {
    i++;

    // Skip and keep the existing URL if the fileObject is a string
    if (typeof fileObject === "string") {
      urls.push(fileObject);
      continue;
    }

    const result = await saveUserAsset(fileObject, user, options);
    if (result.error) {
      if (!options.skipFailure) {
        // Stop and return the first error encountered
        return { error: result.error };
      }

      errors.push({ index: i, error: result.error });

      // If skipping failures, continue with the next files
      continue;
    }

    // Accumulate the URL if the file was saved successfully
    urls.push(result.url);
  }

  // Return the accumulated URLs
  return { urls, errors: errors.length ? errors : null };
};

export const saveFile = async (base64:any,filename:any,options:SaveFileOptions) => {
  const buffer = Buffer.from(base64?.split(",")[1], "base64");

  const extension = path.extname(filename);
  let fileName = options.baseFileName ? `${options.baseFileName}${extension}` : filename?.replace(/\s+/g, "_");

  const dir = options.Dir ?? "";
  // join the public directory with the dir provided
  const fileDir = path.join("public", dir);
  
  try {
    await fs.mkdir(fileDir, { recursive: true });

    let filePath = path.join(fileDir, fileName);
    let fileNumber = 0;

    while ((await fs.stat(filePath).catch(() => false)) && !options.overwrite) {
      fileNumber++;
      fileName = fileName.replace(new RegExp(`${extension}$`), `_${fileNumber}${extension}`);
      filePath = path.join(fileDir, fileName);
    }

    await fs.writeFile(filePath, buffer);
    return { url: `/${path.relative("public", filePath)}` };
  } catch (error: any) {
    return { error: error.message || "Something went wrong while saving the images" };
  } 
}
