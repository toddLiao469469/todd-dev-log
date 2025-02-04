export const prerender = true;
import type { LayoutLoad } from './$types';
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit"

injectSpeedInsights()

export const load: LayoutLoad = async ({ url }) => {
  return {
    props: {
      path: url.pathname,
    },
  };
};
