/**
 * File I/O module with Promises.
 * 
 * `promisify` function cannot work properly with overloads,
 * so we need to specify types manually.
 * 
 * @module
 */

import * as Fs from 'fs';
// import * as Path from 'path';
import promisify from 'ts-pfy';

// tslint:disable:unified-signatures

/**
 * Asynchronous file close.
 */
const close:
	/**
	 * Asynchronous file close.
	 * 
	 * @param fd File descriptor.
	 */
	( fd: number ) => Promise<void>
	= promisify( Fs.close );

/**
 * Asynchronous file open.
 * 
 * `flags` can be:
 * - `'r'` - Open file for reading. An exception occurs if the file
 *   does not exist.
 * - `'r+'` - Open file for reading and writing. An exception occurs
 *   if the file does not exist.
 * - `'rs+'` - Open file for reading and writing in synchronous mode.
 *   Instructs the operating system to bypass the local file system cache.
 * - `'w'` - Open file for writing. The file is created
 *   (if it does not exist) or truncated (if it exists).
 * - `'wx'` - Like 'w' but fails if path exists.
 * - `'w+'` - Open file for reading and writing. The file is created
 *   (if it does not exist) or truncated (if it exists).
 * - `'wx+'` - Like 'w+' but fails if path exists.
 * - `'a'` - Open file for appending. The file is created if it
 *   does not exist.
 * - `'ax'` - Like 'a' but fails if path exists.
 * - `'a+'` - Open file for reading and appending. The file is created
 *   if it does not exist.
 * - `'ax+'` - Like 'a+' but fails if path exists.
 */
const open:
	/**
	 * Asynchronous file open.
	 * 
	 * `flags` can be:
	 * - `'r'` - Open file for reading. An exception occurs if the file
	 *   does not exist.
	 * - `'r+'` - Open file for reading and writing. An exception occurs
	 *   if the file does not exist.
	 * - `'rs+'` - Open file for reading and writing in synchronous mode.
	 *   Instructs the operating system to bypass the local file system cache.
	 * - `'w'` - Open file for writing. The file is created
	 *   (if it does not exist) or truncated (if it exists).
	 * - `'wx'` - Like 'w' but fails if path exists.
	 * - `'w+'` - Open file for reading and writing. The file is created
	 *   (if it does not exist) or truncated (if it exists).
	 * - `'wx+'` - Like 'w+' but fails if path exists.
	 * - `'a'` - Open file for appending. The file is created if it
	 *   does not exist.
	 * - `'ax'` - Like 'a' but fails if path exists.
	 * - `'a+'` - Open file for reading and appending. The file is created
	 *   if it does not exist.
	 * - `'ax+'` - Like 'a+' but fails if path exists.
	 * 
	 * @param path File path.
	 * @param flags Flags to use (r, r+, rs+, w, wx, w+, wx+, a, ax, a+, ax+).
	 * @param mode Sets the file mode (permission and sticky bits), but only
	 *  if the file was created. It defaults to `0666`, readable and writable.
	 * @returns File descriptor.
	 */
	(
		path: string | Buffer,
		flags: string | number,
		mode?: number,
	) => Promise<number>
	= promisify( Fs.open );

/**
 * Asynchronously reads the entire contents of a file.
 */
const readFile: {
		/**
		 * Asynchronously reads the entire contents of a file.
		 * 
		 * @param filename File name or file descriptor.
		 * @returns Raw buffer.
		 */
		( filename: string ): Promise<Buffer>;
		/**
		 * Asynchronously reads the entire contents of a file.
		 * 
		 * @param filename File name or file descriptor.
		 * @param encoding File encoding (e.g. `'utf8'`).
		 * @returns String contents.
		 */
		( filename: string, encoding: string ): Promise<string>;
		/**
		 * Asynchronously reads the entire contents of a file.
		 * 
		 * @param filename File name or file descriptor.
		 * @param options Options, default: `{encoding: null, flag: 'r'}`.
		 * @returns String contents.
		 */
		( filename: string, options: { encoding?: string; flag?: string; } ): Promise<string>;
	}
	= promisify( Fs.readFile ) as any;

/**
 * Asynchronous rename – change the name or location of a file.
 */
const rename:
	/**
	 * Asynchronous rename – change the name or location of a file.
	 * 
	 * @param oldPath Original file path.
	 * @param newPath New file path.
	 */
	(
		oldPath: string,
		newPath: string,
	) => Promise<void>
	= promisify( Fs.rename );

/**
 * Get file status.
 */
const stat:
	/**
	 * Get file status.
	 * 
	 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	 */
	( path: Fs.PathLike ) => Promise<Fs.Stats>
	= promisify( Fs.stat );

/**
 * Write data to the file specified by File Descriptor.
 */
const write: {
		/**
		 * Write buffer to the file specified by File Descriptor.
		 * 
		 * @param fd File descriptor.
		 * @param buffer Data to write.
		 * @param offset Position in buffer to write from.
		 * @param length Length of the data to write from the buffer.
		 * @param position Refers to the offset from the beginning
		 *  of the file where this data should be written.
		 * @returns The number of bytes written.
		 */
		(
			fd: number,
			buffer: Buffer,
			offset?: number,
			length?: number,
			position?: number,
		): Promise<number>;
		/**
		 * Write string to the file specified by File Descriptor.
		 * 
		 * @param fd File descriptor.
		 * @param data Data to write.
		 * @param position Refers to the offset from the beginning
		 *  of the file where this data should be written.
		 * @param encoding The expected string encoding.
		 * @returns The number of bytes written.
		 */
		(
			fd: number,
			data: string,
			position?: number,
			encoding?: string,
		): Promise<number>;
	}
	= promisify( Fs.write );

/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 */
const writeFile:
	/**
	 * Asynchronously writes data to a file, replacing the file if it already exists.
	 * 
	 * @param filename File name or file descriptor.
	 * @param data Data to write (the `encoding` option is ignored if data is a buffer).
	 * @param options Options, default: `{encoding: 'utf8', mode: 0o666, flag: 'w'}`.
	 */
	(
		filename: string,
		data: string | Buffer,
		options?: { encoding?: string; mode?: number | string; flag?: string; } | string,
	) => Promise<void>
	= promisify( Fs.writeFile ) as any;

/**
 * Module
 */
export {
	close,
	open,
	readFile,
	rename,
	stat,
	write,
	writeFile,
};

export {
	PathLike,
	Stats,
} from 'fs';
