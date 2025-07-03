<template>
	<div class="w-full break-words markdown-content">
		<template v-if="md">
			<div v-if="props.isHtml" class="w-full prose dark:prose-invert pr-4" v-html="truncateContent"
				@click="handleImageClick"></div>
			<div v-else class="w-full" :class="props.textClass" v-html="truncateContent" @click="handleImageClick">
			</div>
		</template>
		<button v-if="showMore && props.showMoreText" :class="props.showMoreClass" @click="$emit('showMore')">
			{{ isExpanded ? props.showLessText : props.showMoreText }}
		</button>

		<Picture v-if="imageUrl" :image-url="imageUrl" :is-visible="imageUrl !== null" @close="imageUrl = null">
		</Picture>
	</div>
</template>

<script setup>
import MarkdownIt from "markdown-it";
import MarkdownItAbbr from "markdown-it-abbr";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItDeflist from "markdown-it-deflist";
import { full as emoji } from "markdown-it-emoji";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItHighlightjs from "markdown-it-highlightjs";
import MarkdownItIns from "markdown-it-ins";
import MarkdownItMark from "markdown-it-mark";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItTasklists from "markdown-it-task-lists";
import MarkdownItTOC from "markdown-it-toc-done-right";

import truncate from "truncate-html";
import { ref, computed, onMounted, onUpdated } from "vue";
import Picture from './Picture.vue';

const props = defineProps({
	source: {
		type: String,
		default: "",
	},
	isTruncate: {
		type: Boolean,
		default: false,
	},
	truncateLength: {
		type: Number,
		default: 100,
	},
	isHtml: {
		type: Boolean,
		default: false,
	},
	// only work if isHtml is true
	textClass: {
		type: String,
		default: "text-sm",
	},
	// others settings
	anchor: {
		type: Object,
		default: () => ({}),
	},
	breaks: {
		type: Boolean,
		default: false,
	},
	emoji: {
		type: Object,
		default: () => ({}),
	},
	highlight: {
		type: Object,
		default: () => ({}),
	},
	langPrefix: {
		type: String,
		default: "language-",
	},
	linkify: {
		type: Boolean,
		default: false,
	},
	plugins: {
		type: Array,
		default: () => [],
	},
	quotes: {
		type: String,
		default: "“”‘’",
	},
	tasklists: {
		type: Object,
		default: () => ({}),
	},
	toc: {
		type: Object,
		default: () => ({}),
	},
	typographer: {
		type: Boolean,
		default: false,
	},
	xhtmlOut: {
		type: Boolean,
		default: false,
	},
	isExpanded: {
		type: Boolean,
		default: false,
	},
	isShowImage: {
		type: Boolean,
		default: true,
	},
	showMoreClass: {
		type: String,
		default: "text-sm text-gray-400 hover:underline",
	},
	showMoreText: {
		type: String,
		default: "Xem thêm",
	},
	showLessText: {
		type: String,
		default: "Rút gọn",
	},
});

const md = ref();
const showMore = ref(false);
const EXTRA_WORD_COUNT = 20;

const truncateContent = computed(() => {
	let truncated = md.value;
	// ref: https://www.npmjs.com/package/truncate-html
	if (props.isTruncate) {
		const stripHtml = md.value.replace(/<[^>]+>/g, '').trim();
		const words = stripHtml.split(/\s+/);
		if (words.length > props.truncateLength + EXTRA_WORD_COUNT) {
			truncated = truncate(md.value, props.truncateLength, {
				byWords: true,
				stripTags: false,
				ellipsis: '...',
				excludes: ['img'],
				reserveLastWord: true,
				keepWhitespaces: true
			});
			showMore.value = true;
		}
	}
	return truncated;
});


const showPicture = ref(false);
const imageUrl = ref(null);

const handleImageClick = (event) => {
	if (event.target.tagName === 'IMG') {
		const newUrl = event.target.src;
		if (newUrl) {
			imageUrl.value = newUrl;
			showPicture.value = true;
		}
	}
};

const handleClose = () => {
	showPicture.value = false;
	imageUrl.value = null;
};

const renderMarkdown = () => {
	let markdown = new MarkdownIt()
		.use(MarkdownItAbbr)
		.use(MarkdownItAnchor, props.anchor)
		.use(MarkdownItDeflist)
		.use(emoji, props.emoji)
		.use(MarkdownItFootnote)
		.use(MarkdownItHighlightjs, props.highlight)
		.use(MarkdownItIns)
		.use(MarkdownItMark)
		.use(MarkdownItSub)
		.use(MarkdownItSup)
		.use(MarkdownItTasklists, props.tasklists)
		.use(MarkdownItTOC, props.toc)
		.set({
			breaks: props.breaks,
			html: props.isHtml,
			langPrefix: props.langPrefix,
			linkify: props.linkify,
			quotes: props.quotes,
			typographer: props.typographer,
			xhtmlOut: props.xhtmlOut,
		});

	// Add custom rule for images to include lazy loading
	markdown.renderer.rules.image = function (tokens, idx, options, env, self) {
		const token = tokens[idx];
		const src = token.attrs[token.attrIndex('src')][1];
		const alt = token.content || '';
		let img_class = "lazy-img"
		if (props.isShowImage === false) {
			img_class = "hidden lazy-img"
		}
		return `<img data-src="${src}" alt="${alt}" class="${img_class}" />`;
	};

	markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
		const hrefIndex = tokens[idx].attrIndex('href');
		if (hrefIndex >= 0) {
			const href = tokens[idx].attrs[hrefIndex][1];

			// Check if href starts with http or https
			if (!href.startsWith('http') && !href.startsWith('https') && href.startsWith('/profile')) {
				// Add the class and inline style to remove underline
				tokens[idx].attrPush(['class', 'bg-blue-100 dark:bg-gray-700 rounded text-black dark:text-white no-underline']);
			}
		}
		return self.renderToken(tokens, idx, options);
	};

	md.value = markdown.render(props.source);
};

const lazyLoadImages = () => {
	const images = document.querySelectorAll('.lazy-img');

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const img = entry.target;

				// Set the image source immediately
				img.src = img.dataset.src;
				img.classList.add('fade-in');
				observer.unobserve(img);
			}
		});
	});

	images.forEach(img => observer.observe(img));
};

onMounted(() => {
	renderMarkdown();
	lazyLoadImages();
});

onUpdated(() => {
	renderMarkdown();
	lazyLoadImages();
});
</script>

<style scoped>
/* Override any other potential sources of margin */
:deep(p) {
	margin: 1.5px !important;
}
</style>