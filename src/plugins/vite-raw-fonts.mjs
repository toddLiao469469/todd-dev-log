/* From: https://github.com/saicaca/fuwari/pull/80 */

/**
 * Returns a Vite plugin configuration object for handling raw fonts.
 * @param {string[]} ext An array of file extensions to handle.
 * @returns {import('vite').Plugin} The Vite plugin configuration object.
 */
export function rawFonts(ext) {
	return {
		name: "vite-plugin-raw-fonts",
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore:next-line
		transform(_, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}
