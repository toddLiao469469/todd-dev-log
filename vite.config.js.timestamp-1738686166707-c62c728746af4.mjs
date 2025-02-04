// vite.config.js
import { sveltekit } from "file:///Users/liaozhirong/Desktop/todd-dev-log/node_modules/.pnpm/@sveltejs+kit@1.16.3_svelte@3.59.1_vite@4.3.5/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import Unocss from "file:///Users/liaozhirong/Desktop/todd-dev-log/node_modules/.pnpm/unocss@0.51.12_postcss@8.4.28_vite@4.3.5/node_modules/unocss/dist/vite.mjs";
import { presetTypography, presetIcons, presetUno } from "file:///Users/liaozhirong/Desktop/todd-dev-log/node_modules/.pnpm/unocss@0.51.12_postcss@8.4.28_vite@4.3.5/node_modules/unocss/dist/index.mjs";
import extractorSvelte from "file:///Users/liaozhirong/Desktop/todd-dev-log/node_modules/.pnpm/@unocss+extractor-svelte@0.51.12/node_modules/@unocss/extractor-svelte/dist/index.mjs";
import { presetScrollbar } from "file:///Users/liaozhirong/Desktop/todd-dev-log/node_modules/.pnpm/unocss-preset-scrollbar@0.2.1_unocss@0.51.12/node_modules/unocss-preset-scrollbar/dist/index.mjs";
import transformerDirective from "file:///Users/liaozhirong/Desktop/todd-dev-log/node_modules/.pnpm/@unocss+transformer-directives@0.51.12/node_modules/@unocss/transformer-directives/dist/index.mjs";
import transformerVariantGroup from "file:///Users/liaozhirong/Desktop/todd-dev-log/node_modules/.pnpm/@unocss+transformer-variant-group@0.51.12/node_modules/@unocss/transformer-variant-group/dist/index.mjs";
import transformerCompileClass from "file:///Users/liaozhirong/Desktop/todd-dev-log/node_modules/.pnpm/@unocss+transformer-compile-class@0.51.12/node_modules/@unocss/transformer-compile-class/dist/index.mjs";
import { imagetools } from "file:///Users/liaozhirong/Desktop/todd-dev-log/node_modules/.pnpm/vite-imagetools@5.0.3/node_modules/vite-imagetools/dist/index.js";
import path from "node:path";
import { partytownVite } from "file:///Users/liaozhirong/Desktop/todd-dev-log/node_modules/.pnpm/@builder.io+partytown@0.8.0/node_modules/@builder.io/partytown/utils/index.mjs";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
var __vite_injected_original_dirname = "/Users/liaozhirong/Desktop/todd-dev-log";
var __vite_injected_original_import_meta_url = "file:///Users/liaozhirong/Desktop/todd-dev-log/vite.config.js";
var pathMainPkg = fileURLToPath(new URL("package.json", __vite_injected_original_import_meta_url));
var jsonMainPkg = readFileSync(pathMainPkg, "utf8");
var pathQWERPkg = fileURLToPath(new URL("QWER/package.json", __vite_injected_original_import_meta_url));
var jsonQWERPkg = readFileSync(pathQWERPkg, "utf8");
var mainPkg = JSON.parse(jsonMainPkg);
var qwerPkg = JSON.parse(jsonQWERPkg);
var outputFolderPath = Object.keys(process.env).some((key) => key.includes("VERCEL")) ? ".vercel/output/static" : Object.keys(process.env).some((key) => key.includes("NETLIFY")) ? "build" : "static";
var config = {
  mode: process.env.MODE || "production",
  envPrefix: "QWER_",
  define: {
    __VERSION_MAIN__: mainPkg,
    __VERSION_QWER__: qwerPkg
  },
  plugins: [
    Unocss({
      extractors: [extractorSvelte()],
      presets: [
        presetUno(),
        presetScrollbar(),
        presetIcons(),
        presetTypography({
          cssExtend: {
            ":not(pre) > code::before,:not(pre) > code::after": {
              content: ""
            },
            pre: {
              "border-radius": 0,
              padding: 0,
              margin: 0
            }
          }
        })
      ],
      transformers: [transformerDirective(), transformerVariantGroup(), transformerCompileClass()],
      shortcuts: [
        {
          "title-link": "bg-gradient-to-t from-orange-500 to-orange-500 bg-no-repeat [background-position:0_88%] [background-size:0%_0.1em] focus:![background-size:100%_100%] hover:![background-size:100%_100%] group-hover:[background-size:100%_0.1em] motion-safe:transition-all motion-safe:duration-200"
        },
        [
          /^title-link-(.*)-(.*)-(.*)-(.*)$/,
          ([, f, fc, t, tc]) => `bg-gradient-to-t from-${f}-${fc} to-${t}-${tc} bg-no-repeat [background-position:0_88%] [background-size:0%_0.15em] focus:![background-size:100%_100%] hover:![background-size:100%_100%] group-hover:[background-size:100%_0.15em] motion-safe:transition-all motion-safe:duration-300`
        ]
      ]
    }),
    imagetools(),
    sveltekit(),
    partytownVite({
      dest: path.join(__vite_injected_original_dirname, outputFolderPath, "~partytown")
    })
  ],
  resolve: {
    alias: {
      $QWER: path.resolve(".", "QWER"),
      $generated: path.resolve(".", "src/generated"),
      $stores: path.resolve(".", "src/lib/stores"),
      $i18n: path.resolve(".", "src/i18n"),
      $config: path.resolve(".", "user/config"),
      $assets: path.resolve(".", "user/assets"),
      $custom: path.resolve(".", "user/custom"),
      $static: path.resolve(".", "static")
    }
  },
  server: {
    fs: {
      allow: [".."]
    }
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbGlhb3poaXJvbmcvRGVza3RvcC90b2RkLWRldi1sb2dcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9saWFvemhpcm9uZy9EZXNrdG9wL3RvZGQtZGV2LWxvZy92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbGlhb3poaXJvbmcvRGVza3RvcC90b2RkLWRldi1sb2cvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSc7XG5pbXBvcnQgeyBwcmVzZXRUeXBvZ3JhcGh5LCBwcmVzZXRJY29ucywgcHJlc2V0VW5vIH0gZnJvbSAndW5vY3NzJztcbmltcG9ydCBleHRyYWN0b3JTdmVsdGUgZnJvbSAnQHVub2Nzcy9leHRyYWN0b3Itc3ZlbHRlJztcbmltcG9ydCB7IHByZXNldFNjcm9sbGJhciB9IGZyb20gJ3Vub2Nzcy1wcmVzZXQtc2Nyb2xsYmFyJztcbmltcG9ydCB0cmFuc2Zvcm1lckRpcmVjdGl2ZSBmcm9tICdAdW5vY3NzL3RyYW5zZm9ybWVyLWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHRyYW5zZm9ybWVyVmFyaWFudEdyb3VwIGZyb20gJ0B1bm9jc3MvdHJhbnNmb3JtZXItdmFyaWFudC1ncm91cCc7XG5pbXBvcnQgdHJhbnNmb3JtZXJDb21waWxlQ2xhc3MgZnJvbSAnQHVub2Nzcy90cmFuc2Zvcm1lci1jb21waWxlLWNsYXNzJztcbmltcG9ydCB7IGltYWdldG9vbHMgfSBmcm9tICd2aXRlLWltYWdldG9vbHMnO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IHBhcnR5dG93blZpdGUgfSBmcm9tICdAYnVpbGRlci5pby9wYXJ0eXRvd24vdXRpbHMnO1xuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XG5jb25zdCBwYXRoTWFpblBrZyA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgncGFja2FnZS5qc29uJywgaW1wb3J0Lm1ldGEudXJsKSk7XG5jb25zdCBqc29uTWFpblBrZyA9IHJlYWRGaWxlU3luYyhwYXRoTWFpblBrZywgJ3V0ZjgnKTtcbmNvbnN0IHBhdGhRV0VSUGtnID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKCdRV0VSL3BhY2thZ2UuanNvbicsIGltcG9ydC5tZXRhLnVybCkpO1xuY29uc3QganNvblFXRVJQa2cgPSByZWFkRmlsZVN5bmMocGF0aFFXRVJQa2csICd1dGY4Jyk7XG5jb25zdCBtYWluUGtnID0gSlNPTi5wYXJzZShqc29uTWFpblBrZyk7XG5jb25zdCBxd2VyUGtnID0gSlNPTi5wYXJzZShqc29uUVdFUlBrZyk7XG5cbmNvbnN0IG91dHB1dEZvbGRlclBhdGggPSBPYmplY3Qua2V5cyhwcm9jZXNzLmVudikuc29tZSgoa2V5KSA9PiBrZXkuaW5jbHVkZXMoJ1ZFUkNFTCcpKVxuICA/ICcudmVyY2VsL291dHB1dC9zdGF0aWMnXG4gIDogT2JqZWN0LmtleXMocHJvY2Vzcy5lbnYpLnNvbWUoKGtleSkgPT4ga2V5LmluY2x1ZGVzKCdORVRMSUZZJykpXG4gID8gJ2J1aWxkJ1xuICA6ICdzdGF0aWMnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgndml0ZScpLlVzZXJDb25maWd9ICovXG5jb25zdCBjb25maWcgPSB7XG4gIG1vZGU6IHByb2Nlc3MuZW52Lk1PREUgfHwgJ3Byb2R1Y3Rpb24nLFxuICBlbnZQcmVmaXg6ICdRV0VSXycsXG4gIGRlZmluZToge1xuICAgIF9fVkVSU0lPTl9NQUlOX186IG1haW5Qa2csXG4gICAgX19WRVJTSU9OX1FXRVJfXzogcXdlclBrZyxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIFVub2Nzcyh7XG4gICAgICBleHRyYWN0b3JzOiBbZXh0cmFjdG9yU3ZlbHRlKCldLFxuICAgICAgcHJlc2V0czogW1xuICAgICAgICBwcmVzZXRVbm8oKSxcbiAgICAgICAgcHJlc2V0U2Nyb2xsYmFyKCksXG4gICAgICAgIHByZXNldEljb25zKCksXG4gICAgICAgIHByZXNldFR5cG9ncmFwaHkoe1xuICAgICAgICAgIGNzc0V4dGVuZDoge1xuICAgICAgICAgICAgJzpub3QocHJlKSA+IGNvZGU6OmJlZm9yZSw6bm90KHByZSkgPiBjb2RlOjphZnRlcic6IHtcbiAgICAgICAgICAgICAgY29udGVudDogJycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJlOiB7XG4gICAgICAgICAgICAgICdib3JkZXItcmFkaXVzJzogMCxcbiAgICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgICB0cmFuc2Zvcm1lcnM6IFt0cmFuc2Zvcm1lckRpcmVjdGl2ZSgpLCB0cmFuc2Zvcm1lclZhcmlhbnRHcm91cCgpLCB0cmFuc2Zvcm1lckNvbXBpbGVDbGFzcygpXSxcbiAgICAgIHNob3J0Y3V0czogW1xuICAgICAgICB7XG4gICAgICAgICAgJ3RpdGxlLWxpbmsnOlxuICAgICAgICAgICAgJ2JnLWdyYWRpZW50LXRvLXQgZnJvbS1vcmFuZ2UtNTAwIHRvLW9yYW5nZS01MDAgYmctbm8tcmVwZWF0IFtiYWNrZ3JvdW5kLXBvc2l0aW9uOjBfODglXSBbYmFja2dyb3VuZC1zaXplOjAlXzAuMWVtXSBmb2N1czohW2JhY2tncm91bmQtc2l6ZToxMDAlXzEwMCVdIGhvdmVyOiFbYmFja2dyb3VuZC1zaXplOjEwMCVfMTAwJV0gZ3JvdXAtaG92ZXI6W2JhY2tncm91bmQtc2l6ZToxMDAlXzAuMWVtXSBtb3Rpb24tc2FmZTp0cmFuc2l0aW9uLWFsbCBtb3Rpb24tc2FmZTpkdXJhdGlvbi0yMDAnLFxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgL150aXRsZS1saW5rLSguKiktKC4qKS0oLiopLSguKikkLyxcbiAgICAgICAgICAoWywgZiwgZmMsIHQsIHRjXSkgPT5cbiAgICAgICAgICAgIGBiZy1ncmFkaWVudC10by10IGZyb20tJHtmfS0ke2ZjfSB0by0ke3R9LSR7dGN9IGJnLW5vLXJlcGVhdCBbYmFja2dyb3VuZC1wb3NpdGlvbjowXzg4JV0gW2JhY2tncm91bmQtc2l6ZTowJV8wLjE1ZW1dIGZvY3VzOiFbYmFja2dyb3VuZC1zaXplOjEwMCVfMTAwJV0gaG92ZXI6IVtiYWNrZ3JvdW5kLXNpemU6MTAwJV8xMDAlXSBncm91cC1ob3ZlcjpbYmFja2dyb3VuZC1zaXplOjEwMCVfMC4xNWVtXSBtb3Rpb24tc2FmZTp0cmFuc2l0aW9uLWFsbCBtb3Rpb24tc2FmZTpkdXJhdGlvbi0zMDBgLFxuICAgICAgICBdLFxuICAgICAgXSxcbiAgICB9KSxcbiAgICBpbWFnZXRvb2xzKCksXG4gICAgc3ZlbHRla2l0KCksXG4gICAgcGFydHl0b3duVml0ZSh7XG4gICAgICBkZXN0OiBwYXRoLmpvaW4oX19kaXJuYW1lLCBvdXRwdXRGb2xkZXJQYXRoLCAnfnBhcnR5dG93bicpLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICRRV0VSOiBwYXRoLnJlc29sdmUoJy4nLCAnUVdFUicpLFxuICAgICAgJGdlbmVyYXRlZDogcGF0aC5yZXNvbHZlKCcuJywgJ3NyYy9nZW5lcmF0ZWQnKSxcbiAgICAgICRzdG9yZXM6IHBhdGgucmVzb2x2ZSgnLicsICdzcmMvbGliL3N0b3JlcycpLFxuICAgICAgJGkxOG46IHBhdGgucmVzb2x2ZSgnLicsICdzcmMvaTE4bicpLFxuICAgICAgJGNvbmZpZzogcGF0aC5yZXNvbHZlKCcuJywgJ3VzZXIvY29uZmlnJyksXG4gICAgICAkYXNzZXRzOiBwYXRoLnJlc29sdmUoJy4nLCAndXNlci9hc3NldHMnKSxcbiAgICAgICRjdXN0b206IHBhdGgucmVzb2x2ZSgnLicsICd1c2VyL2N1c3RvbScpLFxuICAgICAgJHN0YXRpYzogcGF0aC5yZXNvbHZlKCcuJywgJ3N0YXRpYycpLFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGZzOiB7XG4gICAgICBhbGxvdzogWycuLiddLFxuICAgIH0sXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVTLFNBQVMsaUJBQWlCO0FBQ2pVLE9BQU8sWUFBWTtBQUNuQixTQUFTLGtCQUFrQixhQUFhLGlCQUFpQjtBQUN6RCxPQUFPLHFCQUFxQjtBQUM1QixTQUFTLHVCQUF1QjtBQUNoQyxPQUFPLDBCQUEwQjtBQUNqQyxPQUFPLDZCQUE2QjtBQUNwQyxPQUFPLDZCQUE2QjtBQUNwQyxTQUFTLGtCQUFrQjtBQUMzQixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxxQkFBcUI7QUFaOUIsSUFBTSxtQ0FBbUM7QUFBNkksSUFBTSwyQ0FBMkM7QUFhdk8sSUFBTSxjQUFjLGNBQWMsSUFBSSxJQUFJLGdCQUFnQix3Q0FBZSxDQUFDO0FBQzFFLElBQU0sY0FBYyxhQUFhLGFBQWEsTUFBTTtBQUNwRCxJQUFNLGNBQWMsY0FBYyxJQUFJLElBQUkscUJBQXFCLHdDQUFlLENBQUM7QUFDL0UsSUFBTSxjQUFjLGFBQWEsYUFBYSxNQUFNO0FBQ3BELElBQU0sVUFBVSxLQUFLLE1BQU0sV0FBVztBQUN0QyxJQUFNLFVBQVUsS0FBSyxNQUFNLFdBQVc7QUFFdEMsSUFBTSxtQkFBbUIsT0FBTyxLQUFLLFFBQVEsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLElBQUksU0FBUyxRQUFRLENBQUMsSUFDbEYsMEJBQ0EsT0FBTyxLQUFLLFFBQVEsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLElBQUksU0FBUyxTQUFTLENBQUMsSUFDOUQsVUFDQTtBQUdKLElBQU0sU0FBUztBQUFBLEVBQ2IsTUFBTSxRQUFRLElBQUksUUFBUTtBQUFBLEVBQzFCLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxJQUNOLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxZQUFZLENBQUMsZ0JBQWdCLENBQUM7QUFBQSxNQUM5QixTQUFTO0FBQUEsUUFDUCxVQUFVO0FBQUEsUUFDVixnQkFBZ0I7QUFBQSxRQUNoQixZQUFZO0FBQUEsUUFDWixpQkFBaUI7QUFBQSxVQUNmLFdBQVc7QUFBQSxZQUNULG9EQUFvRDtBQUFBLGNBQ2xELFNBQVM7QUFBQSxZQUNYO0FBQUEsWUFDQSxLQUFLO0FBQUEsY0FDSCxpQkFBaUI7QUFBQSxjQUNqQixTQUFTO0FBQUEsY0FDVCxRQUFRO0FBQUEsWUFDVjtBQUFBLFVBQ0Y7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxjQUFjLENBQUMscUJBQXFCLEdBQUcsd0JBQXdCLEdBQUcsd0JBQXdCLENBQUM7QUFBQSxNQUMzRixXQUFXO0FBQUEsUUFDVDtBQUFBLFVBQ0UsY0FDRTtBQUFBLFFBQ0o7QUFBQSxRQUNBO0FBQUEsVUFDRTtBQUFBLFVBQ0EsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRSxNQUNkLHlCQUF5QixLQUFLLFNBQVMsS0FBSztBQUFBLFFBQ2hEO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLE1BQ1osTUFBTSxLQUFLLEtBQUssa0NBQVcsa0JBQWtCLFlBQVk7QUFBQSxJQUMzRCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsT0FBTyxLQUFLLFFBQVEsS0FBSyxNQUFNO0FBQUEsTUFDL0IsWUFBWSxLQUFLLFFBQVEsS0FBSyxlQUFlO0FBQUEsTUFDN0MsU0FBUyxLQUFLLFFBQVEsS0FBSyxnQkFBZ0I7QUFBQSxNQUMzQyxPQUFPLEtBQUssUUFBUSxLQUFLLFVBQVU7QUFBQSxNQUNuQyxTQUFTLEtBQUssUUFBUSxLQUFLLGFBQWE7QUFBQSxNQUN4QyxTQUFTLEtBQUssUUFBUSxLQUFLLGFBQWE7QUFBQSxNQUN4QyxTQUFTLEtBQUssUUFBUSxLQUFLLGFBQWE7QUFBQSxNQUN4QyxTQUFTLEtBQUssUUFBUSxLQUFLLFFBQVE7QUFBQSxJQUNyQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLE9BQU8sQ0FBQyxJQUFJO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
