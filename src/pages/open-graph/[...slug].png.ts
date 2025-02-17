/* From: https://github.com/saicaca/fuwari/pull/80 */

import type { APIContext, ImageMetadata, InferGetStaticPropsType } from "astro";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { getCollection } from 'astro:content';
import { Resvg } from "@resvg/resvg-js";
import { siteConfig } from '@/config';

/* TTF, OTF and WOFF, this import may not compatible with all static pages services (?) */
import Roboto300 from "node_modules/@fontsource/roboto/files/roboto-latin-300-normal.woff";
import Roboto700 from "node_modules/@fontsource/roboto/files/roboto-latin-700-normal.woff";
import NotoSansTCMedium from "../../../public/NotoSansTC-Medium.ttf"



const ogOptions: SatoriOptions = {
	width: 1200,
	height: 630,
	// debug: true,
	fonts: [
		{
			name: "Roboto",
			data: Buffer.from(NotoSansTCMedium),
			weight: 400,
			style: "normal",
		},
		{
			name: "Roboto",
			data: Buffer.from(NotoSansTCMedium),
			weight: 700,
			style: "normal",
		},
	],
};

const markup = (title: string, published: Date, description?: string, category?: string, tags?: string[]) =>
  /* Satori uses tailwind! Create or view a desing using https://og-playground.vercel.app/ */
	html`
    <div tw="flex flex-col w-full h-full bg-zinc-900">
    <div tw="flex w-full h-full p-8">
      <div tw="flex flex-col w-full">
        {/* Header with category/tag */}
        <div tw="flex items-center mb-4">
          <div tw="h-6 w-6 rounded-full bg-emerald-600 mr-3" />
          <span tw="text-emerald-500 font-medium">Todd's Dev Logs</span>
        </div>
        
        {/* Main content */}
        <div tw="flex flex-col flex-1 justify-center">
          <h1 tw="text-5xl font-bold text-zinc-100 mb-3 tracking-tight">
            ${title}
          </h1>
          <p tw="text-2xl text-zinc-400 font-normal">
            ${description}
          </p>
        </div>

        {/* Footer metadata */}
        <div tw="flex items-center text-zinc-500 text-sm">
          <span tw="flex items-center">
            <span tw="mr-2">•</span>
            ${published}
          </span>
        </div>
      </div>
    </div>
  </div>
  `;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

/**
 * Route for dynamic Open Graph images.
 * This function will generate Open Graph images only if enabled in `config.ts`. 
 *
 * @returns {Promise<object>} An object containing the GET, getStaticPaths methods for astro.
 */
async function getOpenGraphData() {
  if (siteConfig.postOGImageDynamic) {
    return {
      GET: async function GET(context: APIContext) {
        const {title, description, published, category, tags } = context.props as Props;
        const svg = await satori(markup(title, published, description, category, tags), ogOptions);
        const png = new Resvg(svg).render().asPng();

        return new Response(png, {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
      getStaticPaths: async function getStaticPaths() {
        const posts = await getCollection("posts");
        const result = posts.filter(({ data }) => !data.draft)
          .map((post) => ({
            params: { slug: post.slug },
            props: {
              title: post.data.title,
              description: post.data.description,
              published: post.data.published,
              category: post.data.category,
              tags: post.data.tags,
            },
          }));
        return result
      }
    }
  } else {
    return { getStaticPaths: {}, GET: {} } ;
  }
}

export const { getStaticPaths, GET } = await getOpenGraphData();