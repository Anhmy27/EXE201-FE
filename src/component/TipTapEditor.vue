<template>
    <div class="w-full mx-auto">
        <SetLinkModal v-if="showModal" @close="closeModal" @set-link="handleSetLink" />
        <div class="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg">

            <div>
                <div v-if="!isComment" class="border-b border-gray-300 dark:border-gray-600"
                    :class="{ 'rounded-t-lg sticky top-14 z-10 bg-white dark:bg-gray-900': !isComment }">
                    <div v-if="menuItems" :id="tiptapId" class="flex flex-wrap gap-2 p-2">
                        <!-- Dropdown for Headings -->
                        <select v-if="!isComment" @change="setHeading($event)"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0"
                                :selected="!editor?.isActive('heading', { level: 1 }) && !editor?.isActive('heading', { level: 2 }) && !editor?.isActive('heading', { level: 3 })">
                                Normal Text</option>
                            <option value="1" :selected="editor?.isActive('heading', { level: 1 })">Heading 1</option>
                            <option value="2" :selected="editor?.isActive('heading', { level: 2 })">Heading 2</option>
                            <option value="3" :selected="editor?.isActive('heading', { level: 3 })">Heading 3</option>
                            <option value="4" :selected="editor?.isActive('heading', { level: 4 })">Heading 4</option>
                            <option value="5" :selected="editor?.isActive('heading', { level: 5 })">Heading 5</option>
                        </select>

                        <button v-for="item in menuItems" :key="item.icon" @click="item.action"
                            class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                            :class="{ 'bg-gray-200 dark:bg-gray-700': editor?.isActive(item.title) }"
                            :title="item.title">
                            <component :is="item.icon" class="w-5 h-5" />
                        </button>
                        <div @click="handleClickOutside">
                            <button @click="toggleEmojiPicker"
                                class="emoji-picker-button hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">😊</button>
                            <EmojiPicker v-if="emojiPickerSelected" class="emoji-picker-container" :native="true"
                                @select="selectEmoji" />
                            <input type="file" ref="fileInput" @change="uploadImage" class="hidden" accept="image/*" />
                        </div>
                    </div>
                </div>
                <!-- BubbleMenu -->
                <BubbleMenu v-if="editor && !isComment" :editor="editor"
                    class="bg-white border border-gray-300 dark:bg-gray-900 dark:border-gray-700 shadow-md rounded flex space-x-2 p-1">
                    <button v-for="item in bubbleMenuItems" :key="item.icon" @click="item.action"
                        class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                        :class="{ 'bg-gray-200 dark:bg-gray-700': editor?.isActive(item.title) }" :title="item.title">
                        <component :is="item.icon" class="w-5 h-5 " />
                    </button>
                </BubbleMenu>
                <!-- Comparison Section -->
                <div class="flex flex-col mb-1">
                    <editor-content :editor="editor" class="prose dark:prose-invert max-w-none p-4" :class="{
                        'h-28 overflow-y-auto overflow-hidden': isComment,
                        'h-full min-h-[200px]': !isComment,
                    }" />
                    <div class="flex" :class="{ 'justify-between': isComment, 'justify-end': !isComment }">
                        <div v-if="menuItems && isComment" :id="tiptapId" class="flex flex-wrap gap-1 md:gap-2">
                            <button v-for="item in menuItems" :key="item.icon" @click="item.action"
                                class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                                :class="{ 'bg-gray-200 dark:bg-gray-700': editor?.isActive(item.title) }"
                                :title="item.title">
                                <component :is="item.icon" class="w-5 h-5" />
                            </button>
                            <div @click="handleClickOutside" class="flex items-center justify-center">
                                <button @click="toggleEmojiPicker"
                                    class="p-1 emoji-picker-button hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center">😊</button>
                                <EmojiPicker v-if="emojiPickerSelected" class="emoji-picker-container" :native="true"
                                    @select="selectEmoji" />
                                <input type="file" ref="fileInput" @change="uploadImage" class="hidden"
                                    accept="image/*" />
                            </div>
                        </div>
                        <button class="px-4 py-2 mr-1 text-xs md:text-base text-white bg-submit rounded-full"
                            @click="$emit('onPublish', editor.storage.markdown.getMarkdown())">
                            {{ props.buttonTitle }}
                        </button>
                    </div>
                </div>

            </div>
        </div>
        <div class="flex space-x-2 mt-4">

        </div>
    </div>
</template>

<script setup>
import SetLinkModal from './SetLinkModal.vue';
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { BubbleMenu, Editor, EditorContent } from '@tiptap/vue-3'
import ResizeImage from 'tiptap-extension-resize-image'
import { Markdown } from 'tiptap-markdown'
import { onBeforeUnmount, onMounted, ref, createApp, computed } from 'vue'
// import TagTopic from "@/components/TagTopic.vue";
import EmojiPicker from "vue3-emoji-picker";
import 'vue3-emoji-picker/css';
import Link from '@tiptap/extension-link';
import { debounce } from "lodash";
import { getPreviewUrl } from "@/utils/extensions";
import {
    Bold,
    Image as ImageIcon,
    Italic,
    List,
    ListOrdered,
    BookOpen as MarkdownExportIcon,
    Redo,
    Undo,
    Link as LinkIcon,
    Unlink
} from 'lucide-vue-next'

import apiServices from '@/services/api.services'
// import Mention from '@tiptap/extension-mention';
// import tippy from 'tippy.js';
import { Plugin } from 'prosemirror-state';
// import MentionList from './MentionList.vue';

const props = defineProps({
    buttonTitle: { type: String, default: 'Publish' },
    content: { type: String, default: null },
    isImageHandled: { type: Boolean, default: false },
    postData: Object,
    isSetLink: { type: Boolean, default: false },
    isComment: { type: Boolean, default: false },
    tiptapId: { type: String, default: null },
    textPlaceholder: { type: String, default: 'Write something …' },
});

const editor = ref(null)
const emojiPickerSelected = ref(false)
const showModal = ref(false);
const url = ref('');
const text_search = ref('')
const commentAIGen = ref('');
const isLoading = ref(false);
const toggleEmojiPicker = () => {
    emojiPickerSelected.value = !emojiPickerSelected.value
}

const selectEmoji = (emoji) => {
    editor.value.chain().focus().insertContent(emoji.i).run()
}

const closeDropdown = () => {
    emojiPickerSelected.value = false;
};

const handleClickOutside = (event) => {
    const emojiButton = event.target.closest('.emoji-picker-button');
    const emojiPicker = event.target.closest('.emoji-picker-container');
    if (!emojiButton && !emojiPicker) {
        closeDropdown();
    }
};

const menuItems = ref([])
const bubbleMenuItems = ref([])
// const markdownOutput = ref(null)
// const editorJsonContent = ref(null)
// const editorHtmlContent = ref(null)

const fileInput = ref(null)

const ProcessUploadImage = async (file) => {
    let filesize = ((file.size / 1024) / 1024).toFixed(4); // get the filesize in MB
    if (filesize < 10) { // check image under 10MB
        let result = await apiServices.uploadOneFile(file)
        editor.value.chain().focus().setImage({ src: getPreviewUrl(result?.data?.file_path) }).run()
    } else {
        window.alert("Images need to be less than 10mb in size.");
    }
}

const uploadImage = async (event) => {
    const file = event.target.files[0]
    ProcessUploadImage(file)
}


const setHeading = (event) => {
    const level = parseInt(event.target.value)
    if (level === 0) {
        editor.value.chain().focus().setParagraph().run()
    } else {
        editor.value.chain().focus().toggleHeading({ level }).run()
    }
}

const setTextAlign = (event) => {
    const align = event.target.value
    editor.value.chain().focus().setTextAlign(align).run()
}

const uploadPasteImage = (event) => {
    if (!props.isImageHandled) {
        return false
    }

    const files = Array.from(event.clipboardData?.files || []);
    if (files.length === 0) {
        return false;
    } else {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            ProcessUploadImage(file)
        }
        return true;
    }
}

const handlePasteFile = (event) => {
    const files = Array.from(event.clipboardData?.files || []);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.indexOf("image") === 0) {
            let filesize = ((file.size / 1024) / 1024).toFixed(4); // get the filesize in MB
            if (filesize < 10) { // check image under 10MB
                const reader = new FileReader()
                reader.onload = (e) => {
                    const image = e.target.result
                    editor.value.chain().focus().setImage({ src: image, style: '"width: 250; height: auto; cursor: pointer;"' }).run()
                }
                reader.readAsDataURL(file)
            } else {
                window.alert("Images need to be less than 10mb in size.");
            }
            return true; // handled
        }
    }
    return false; // not handled use default behaviour
}

const CustomLink = Link.extend({
    addKeyboardShortcuts() {
        return {
            Backspace: () => {
                const { from, to } = this.editor.state.selection;

                if (from !== to) {
                    this.editor.commands.unsetLink();
                    return false;
                }

                const pos = from - 1;
                if (pos >= 0) {
                    this.editor.commands.setTextSelection({ from: pos, to: pos + 1 });
                    this.editor.commands.unsetLink();
                    this.editor.commands.setTextSelection(from);
                }
                return false;
            },
            Delete: () => {
                const { from, to } = this.editor.state.selection;

                if (from !== to) {
                    this.editor.commands.unsetLink();
                    return false;
                }

                const pos = from;
                if (pos < this.editor.state.doc.content.size) {
                    this.editor.commands.setTextSelection({ from: pos, to: pos + 1 });
                    this.editor.commands.unsetLink();
                    this.editor.commands.setTextSelection(from);
                }
                return false;
            }
        }
    },
    renderHTML({ HTMLAttributes }) {
        const href = HTMLAttributes.href || '';

        if (href.startsWith('/profile')) {
            HTMLAttributes.class = 'bg-blue-100 dark:bg-gray-700 rounded text-black dark:text-white no-underline';
        }

        return ['a', {
            ...HTMLAttributes,
            target: '_blank',
            rel: 'noopener noreferrer nofollow',
            onClick: (event) => {
                if (event.ctrlKey) {
                    event.preventDefault();
                    window.open(href, '_blank');
                }
            }
        }, 0];
    },
    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handleDOMEvents: {
                        input: (view, event) => {
                            const { editor } = this;
                            const state = editor.state;

                            const { from, to } = state.selection;

                            state.doc.nodesBetween(from, to, (node, pos) => {
                                if (node.marks) {
                                    const linkMark = node.marks.find(mark => mark.type.name === 'link');
                                    if (linkMark) {
                                        const linkFrom = pos;
                                        const linkTo = pos + node.nodeSize;

                                        editor.chain().focus().setTextSelection({ from: linkFrom, to: linkTo }).unsetLink().run();
                                        editor.chain().setTextSelection({ from, to }).run();
                                    }
                                }
                            });
                        },
                    },
                    handlePaste(view, event, slice) {
                        const text = event.clipboardData.getData('text/plain');
                        if (text) {
                            const transaction = view.state.tr.replaceSelectionWith(
                                view.state.schema.text(text)
                            );
                            view.dispatch(transaction);
                            return true;
                        }

                        return false;
                    },
                },
            }),
        ];
    },
})

// const debouncedFetchUsers = debounce(async (query, updateItems) => {
//     if (!query) {
//         updateItems([]); // Clear suggestions if there's no query
//         return;
//     }

//     text_search.value = query.query;
//     const response = await apiServices.getFilterTagUser(query.query);

//     // Update items with the fetched user data
//     const items = response.results.map(user => ({
//         username: user.username,
//         label: user.email,
//     }));

//     updateItems(items);
// }, 300);

// const mentionExtension = Mention.configure({
//     HTMLAttributes: {
//         class: 'bg-blue-100 dark:bg-gray-700 rounded text-black dark:text-white',
//     },
//     suggestion: {
//         char: '@',
//         items: query => {
//             return new Promise(resolve => {
//                 debouncedFetchUsers(query, resolve);
//             });
//         },
//         render: () => {
//             let component;
//             let popup;

//             return {
//                 onStart: props => {
//                     if (popup) {
//                         popup.destroy();
//                         popup = null;
//                     }

//                     if (!component) {
//                         component = document.createElement('div');
//                     }

//                     if (props.items && props.items.length > 0) {
//                         const app = createApp(MentionList, {
//                             items: props.items,
//                             onSelect: (item) => {
//                                 const markdownLink = `[${item.label}](/profile/${item.username})`;
//                                 props.editor
//                                     .chain()
//                                     .focus()
//                                     .insertContentAt(props.range, markdownLink)
//                                     .unsetMark('link')
//                                     .run();

//                                 if (popup) {
//                                     popup.destroy();
//                                     popup = null;
//                                 }
//                             }
//                         });

//                         app.mount(component);

//                         popup = tippy('body', {
//                             getReferenceClientRect: props.clientRect,
//                             appendTo: () => document.body,
//                             content: component,
//                             showOnCreate: true,
//                             interactive: true,
//                             trigger: 'manual',
//                             placement: 'top-start',
//                             arrow: false,
//                         })[0]; // Access the first instance
//                     }
//                 },
//                 onUpdate: props => {
//                     if (!component) {
//                         component = document.createElement('div');
//                     } else {
//                         while (component.firstChild) {
//                             component.removeChild(component.firstChild);
//                         }
//                     }

//                     if (props.items && props.items.length > 0) {
//                         const app = createApp(MentionList, {
//                             items: props.items,
//                             onSelect: (item) => {
//                                 const markdownLink = `[${item.label}](/profile/${item.username})`;
//                                 props.editor
//                                     .chain()
//                                     .focus()
//                                     .insertContentAt(props.range, markdownLink)
//                                     .unsetMark('link')
//                                     .run();

//                                 if (popup) {
//                                     popup.destroy();
//                                     popup = null;
//                                 }
//                             }
//                         });

//                         app.mount(component);

//                         if (!popup) {
//                             popup = tippy('body', {
//                                 getReferenceClientRect: props.clientRect,
//                                 appendTo: () => document.body,
//                                 content: component,
//                                 showOnCreate: true,
//                                 interactive: true,
//                                 trigger: 'manual',
//                                 placement: 'top-start',
//                                 arrow: false,
//                             })[0]; // Access the first instance
//                         } else {
//                             popup.setProps({
//                                 getReferenceClientRect: props.clientRect,
//                             });
//                         }
//                     } else if (popup) {
//                         popup.destroy();
//                         popup = null;
//                     }
//                 },
//                 onExit: () => {
//                     if (popup && popup.destroy) {
//                         popup.destroy();
//                     }
//                     popup = null;
//                     component = null;
//                 },
//             };
//         },
//     },
// });


let tiptapExtensions = [
    StarterKit,
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Markdown.configure({
        html: false,                  // Allow HTML input/output
        transformPastedText: true,  // Allow to paste markdown text in the editor
        transformCopiedText: false,  // Copied text is transformed to markdown
    })
    ,
    Placeholder.configure({
        placeholder: props.textPlaceholder,
    }),
    CustomLink.configure({
        openOnClick: false,
    }),
    // mentionExtension
]
// Function to open the modal
function addLink() {
    showModal.value = true;
}

// Function to close the modal
function closeModal() {
    showModal.value = false;
}

// Handle the link submission from the modal
function handleSetLink(newUrl) {
    url.value = newUrl;
    showModal.value = false;

    if (url.value) {
        const { from, to } = editor.value.state.selection;
        const selectedText = editor.value.state.doc.textBetween(from, to, ' ');

        if (selectedText.trim().length > 0 && from !== to) {
            editor.value.chain()
                .setLink({ href: url.value, target: '_blank' })
                .setTextSelection(to)
                .unsetMark('link')
                .run();
        }
    }
}
function pushRemovelinkToBubbleMenu() {
    bubbleMenuItems.value = bubbleMenuItems.value.filter(item => item.title !== 'Remove Link');

    const { from, to } = editor.value.state.selection;
    const state = editor.value.state;
    const linkMarkType = editor.value.schema.marks.link;
    let hasValidLink = false;

    state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.marks) {
            node.marks.forEach(mark => {
                if (mark.type === linkMarkType) {
                    const href = mark.attrs.href;
                    if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
                        hasValidLink = true;
                    }
                }
            });
        }
    });

    if (hasValidLink && props.isSetLink) {
        bubbleMenuItems.value.push({
            icon: Unlink,
            action: () => removeLink(),
            isActive: () => editor.value.isActive('link'),
            title: 'Remove Link',
        });
    }
}

function removeLink() {
    editor.value.chain().focus().unsetLink().run();
}

const copied = ref(false)


const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(commentAIGen.value)
        copied.value = true
        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch (err) {
        console.error('Failed to copy text: ', err)
    }
}

const scrollIntoView = () => {
    if (!props.isComment) return
    const element = document.getElementById(props.tiptapId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (editor.value && editor.value.commands) {
            editor.value.commands.focus();
        }
    }
}
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    if (props.isImageHandled) {
        tiptapExtensions.push(
            // Image
            ResizeImage.configure({
                inline: true,
                allowBase64: true,
            }),
        )
    }
    editor.value = new Editor({
        // content: '<p>Start typing your content here...</p>',
        editable: true,
        extensions: tiptapExtensions,
        editorProps: {
            handlePaste: function (view, event, slice) {
                // return handlePasteFile(event)
                // return false to use default behaviour
                return uploadPasteImage(event)
            },
        },
        onUpdate({ editor }) {
            // The content has changed.
            // markdownOutput.value = editor.storage.markdown.getMarkdown()
            // editorJsonContent.value = editor.getJSON()
            // editorHtmlContent.value = editor.getHTML()
            // console.log('onUpdate')
            // console.log(markdownOutput.value)
            // console.log(editorJsonContent.value)
            // console.log(editorHtmlContent.value)
            // console.log(editor.getText())
        },
        onSelectionUpdate({ editor }) {
            pushRemovelinkToBubbleMenu();
            // The selection has changed.
            // markdownOutput.value = editor.storage.markdown.getMarkdown()
            // editorJsonContent.value = editor.getJSON()
            // editorHtmlContent.value = editor.getHTML()
            // console.log('onSelectionUpdate')
            // console.log(markdownOutput.value)
            // console.log(editorJsonContent.value)
            // console.log(editorHtmlContent.value)
        },
        // onFocus({ editor }) {
        //     console.log(editor)
        // }
    })
    editor.value.commands.setContent(props.content)
    scrollIntoView();

    menuItems.value = [
        {
            icon: Bold,
            action: () => editor.value.chain().focus().toggleBold().run(),
            isActive: () => editor.value.isActive('bold'),
            title: 'bold',
        },
        {
            icon: Italic,
            action: () => editor.value.chain().focus().toggleItalic().run(),
            isActive: () => editor.value.isActive('italic'),
            title: 'italic',
        },
    ]

    if (!props.isComment) {
        menuItems.value.push({
            icon: List,
            action: () => editor.value.chain().focus().toggleBulletList().run(),
            isActive: () => editor.value.isActive('bulletList'),
            title: 'bulletList',
        })
        menuItems.value.push({
            icon: ListOrdered,
            action: () => editor.value.chain().focus().toggleOrderedList().run(),
            isActive: () => editor.value.isActive('orderedList'),
            title: 'orderedList',
        })

        menuItems.value.push({
            icon: Undo,
            action: () => editor.value.chain().focus().undo().run(),
            title: 'Undo',
        })
        menuItems.value.push({
            icon: Redo,
            action: () => editor.value.chain().focus().redo().run(),
            title: 'Redo',
        })
    }

    if (props.buttonTitle && props.isImageHandled) {
        menuItems.value.push({
            icon: ImageIcon,
            action: () => fileInput.value.click(),
            title: 'Insert image',
        })
    }

    bubbleMenuItems.value = [
        {
            icon: Bold,
            action: () => editor.value.chain().focus().toggleBold().run(),
            isActive: () => editor.value.isActive('bold'),
            title: 'bold',
        },
        {
            icon: Italic,
            action: () => editor.value.chain().focus().toggleItalic().run(),
            isActive: () => editor.value.isActive('italic'),
            title: 'italic',
        }
    ]
    if (props.isSetLink) {
        menuItems.value.push(
            {
                icon: LinkIcon,
                action: () => addLink(),
                isActive: () => editor.value.isActive('link'),
                title: 'Link',
            }
        )
        bubbleMenuItems.value.push(
            {
                icon: LinkIcon,
                action: () => addLink(),
                isActive: () => editor.value.isActive('link'),
                title: 'Link',
            }
        )
    }
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
    editor.value.destroy()
})
</script>


<style>
.ProseMirror:focus {
    outline: none;
}

.tiptap p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}

.emoji-picker-container {
    position: absolute;
    z-index: 10;
}

.emoji-picker-button {
    cursor: pointer;
    padding-top: 10px;
}

@media (max-width: 768px) {
    .emoji-picker-container {
        position: absolute;
        z-index: 10;
        right: 0;
    }
}
</style>