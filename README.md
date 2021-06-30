# Remark Youtube Placeholder Plugin
[![Build](https://github.com/Healios/remark-youtube-placeholder/actions/workflows/node.js.yml/badge.svg)](https://github.com/Healios/remark-youtube-placeholder/actions/workflows/node.js.yml)

This is a plugin for [Remark](https://remark.js.org/), and allows you to embed youtube placeholders in [markdown](https://daringfireball.net/projects/markdown/) files, and in that way avoid cookies and accessability issues. This plugin can also be used with [Gridsome](https://gridsome.org/).

## Installation

```bash
npm i remark-youtube-placeholder --save-dev
# yarn add remark-youtube-placeholder --dev
```

## Configuration
### Image
You can provide css for the image via the **imageCss** option.

Example:
```js
imageCss: "shadow-md"
```

You can also provide a default size via the **imageSize** option.

Example:
```js
imageSize: { width: 800, height: 450, }
```

### Title
You can provide css for the title paragraph via the **titleCss** option.

Example:
```js
titleCss: "pl-5 pt-3 text-white text-xl font-medium text-opacity-90"
```

## Overlay
You can provide HTML to use as an overlay via the **overlayHtml** option.

Example (it renders a transparent black background with a play icon in the middle, that changes color and scale when hovered.):
```js
overlayHtml: `
    <div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <svg class="w-12 h-12 text-white transform hover:scale-105 hover:text-red-600 transition duration-150" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.821 52.821" xml:space="preserve"><path d="M51.82 19.074C50.332 13.73 46.855 8.91 42.212 5.885 37.292 2.68 30.86 1.717 25.106 1.588 17.071 1.404 6.893 4.49 2.94 12.152c-.329.637.64 1.184.969.547C6.71 7.269 13.4 4.133 19.172 3.105c6.209-1.104 12.998-.236 18.873 1.955 6.134 2.287 10.393 7.537 12.486 13.611 2.33 6.758 1.04 13.488-2.679 19.424C40.174 50.347 21.33 54.324 9.87 45.038c-5.25-4.254-8.674-9.945-8.74-16.752-.039-4.012.743-8.492 2.746-12.012.621-1.09 1.455-2.024 2.396-2.867.014-.219.03-.436.045-.652a1.28 1.28 0 0 1-.25-.475c-.005-.021-.004-.037-.009-.059-.572.481-1.126.986-1.65 1.529-2.291 2.371-3.194 5.66-3.832 8.801-1.268 6.24-.515 12.074 3.063 17.346 3.063 4.514 7.787 8.715 13.131 10.182 6.42 1.762 13.123 1.613 19.198-1.108 2.749-1.23 5.729-2.438 8.039-4.424 2.833-2.438 4.961-5.881 6.679-9.156 2.619-4.992 2.617-10.994 1.134-16.317z"/><path d="M17.736 31.85c.103 1.15.121 3.08 1.325 3.598a.923.923 0 0 0 .167.174c1.198.902 2.868-.504 3.876-1.109 2.797-1.674 12.586-8.037 14.039-10.277a.469.469 0 0 0-.046-.609.523.523 0 0 0-.258-.428c-1.622-.992-8.87-4.297-10.89-5.045-1.044-.389-5.593-2.34-6.212-2.355-2.373-1.525-2.021 5.525-2.033 6.152-.065 3.284-.26 6.623.032 9.899zm3.224-6.817a.518.518 0 0 0-.217.182c-.004-.299-.009-.596-.011-.891.096.055.197.104.298.154-.021.182-.046.368-.07.555zm.207 4.662c.063-.248.151-.498.257-.748 1.583-.371 3.088-1.146 4.634-1.645.754-.207 1.509-.414 2.259-.633-2.336 1.095-4.722 2.071-7.15 3.026zm3.42-3.933c-.18.082-.362.162-.539.25a3.529 3.529 0 0 0-.483-.244c.34-.01.681-.014 1.022-.006zm-.479-1.477c.023-.014.048-.025.074-.037a9.92 9.92 0 0 0 1.944.24c.459.055.918.113 1.378.166-.044.016-.088.029-.133.045-.97-.101-2.141-.211-3.263-.414zm4.766-1.179a65.658 65.658 0 0 1-2.291-.854c-1.265-.502-2.525-.859-3.846-1.17a3.048 3.048 0 0 1-1.052-.465c2.49.391 4.886 1.354 7.189 2.489zm-5.978-.848a23.189 23.189 0 0 0-2.278-.105c-.026-.297-.056-.592-.085-.889.748.521 1.527.783 2.363.994z"/></svg>
    </div>
`
```



### Alignment
If you want alignment to work, you'll have to supply css classes.

There's three options:
- **cssClassToCenterPlaceholder**

  Example value `w-full flex justify-center`

- **cssClassToLeftAlignPlaceholder**

  Example value `w-full flex justify-start`

- **cssClassToRightAlignPlaceholder**

  Example value `w-full flex justify-end`

Note: You can also add extra css, like bottom margin, to space things out nicely.

### Remark configuration:
```js
  const remark = require("remark");
  const youtube = require("remark-youtube-placeholder");

  const processor = remark().use(youtube, {
    cssClassToCenterPlaceholder: "w-full flex justify-center mb-6",
    cssClassToLeftAlignPlaceholder: "w-full flex justify-start mb-6",
    cssClassToRightAlignPlaceholder: "w-full flex justify-end mb-6",
    imageCss: "shadow-md",
    imageSize: { width: 800, height: 450, },
    titleCss: "pl-5 pt-3 text-white text-xl font-medium text-opacity-90",
    overlayHtml: `
        <div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <svg class="w-12 h-12 text-white transform hover:scale-105 hover:text-red-600 transition duration-150" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.821 52.821" xml:space="preserve"><path d="M51.82 19.074C50.332 13.73 46.855 8.91 42.212 5.885 37.292 2.68 30.86 1.717 25.106 1.588 17.071 1.404 6.893 4.49 2.94 12.152c-.329.637.64 1.184.969.547C6.71 7.269 13.4 4.133 19.172 3.105c6.209-1.104 12.998-.236 18.873 1.955 6.134 2.287 10.393 7.537 12.486 13.611 2.33 6.758 1.04 13.488-2.679 19.424C40.174 50.347 21.33 54.324 9.87 45.038c-5.25-4.254-8.674-9.945-8.74-16.752-.039-4.012.743-8.492 2.746-12.012.621-1.09 1.455-2.024 2.396-2.867.014-.219.03-.436.045-.652a1.28 1.28 0 0 1-.25-.475c-.005-.021-.004-.037-.009-.059-.572.481-1.126.986-1.65 1.529-2.291 2.371-3.194 5.66-3.832 8.801-1.268 6.24-.515 12.074 3.063 17.346 3.063 4.514 7.787 8.715 13.131 10.182 6.42 1.762 13.123 1.613 19.198-1.108 2.749-1.23 5.729-2.438 8.039-4.424 2.833-2.438 4.961-5.881 6.679-9.156 2.619-4.992 2.617-10.994 1.134-16.317z"/><path d="M17.736 31.85c.103 1.15.121 3.08 1.325 3.598a.923.923 0 0 0 .167.174c1.198.902 2.868-.504 3.876-1.109 2.797-1.674 12.586-8.037 14.039-10.277a.469.469 0 0 0-.046-.609.523.523 0 0 0-.258-.428c-1.622-.992-8.87-4.297-10.89-5.045-1.044-.389-5.593-2.34-6.212-2.355-2.373-1.525-2.021 5.525-2.033 6.152-.065 3.284-.26 6.623.032 9.899zm3.224-6.817a.518.518 0 0 0-.217.182c-.004-.299-.009-.596-.011-.891.096.055.197.104.298.154-.021.182-.046.368-.07.555zm.207 4.662c.063-.248.151-.498.257-.748 1.583-.371 3.088-1.146 4.634-1.645.754-.207 1.509-.414 2.259-.633-2.336 1.095-4.722 2.071-7.15 3.026zm3.42-3.933c-.18.082-.362.162-.539.25a3.529 3.529 0 0 0-.483-.244c.34-.01.681-.014 1.022-.006zm-.479-1.477c.023-.014.048-.025.074-.037a9.92 9.92 0 0 0 1.944.24c.459.055.918.113 1.378.166-.044.016-.088.029-.133.045-.97-.101-2.141-.211-3.263-.414zm4.766-1.179a65.658 65.658 0 0 1-2.291-.854c-1.265-.502-2.525-.859-3.846-1.17a3.048 3.048 0 0 1-1.052-.465c2.49.391 4.886 1.354 7.189 2.489zm-5.978-.848a23.189 23.189 0 0 0-2.278-.105c-.026-.297-.056-.592-.085-.889.748.521 1.527.783 2.363.994z"/></svg>
        </div>
    `,
  });
```


### Gridsome configuration:
```js
module.exports = {
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "blog/**/*.md",
        route: "/blog/:year/:month/:day/:slug",
        remark: {
          plugins: [
            [
              "gridsome-remark-youtube-placeholder",
              {
                cssClassToCenterPlaceholder: "w-full flex justify-center mb-6",
                cssClassToLeftAlignPlaceholder: "w-full flex justify-start mb-6",
                cssClassToRightAlignPlaceholder: "w-full flex justify-end mb-6",
                imageCss: "shadow-md",
                imageSize: { width: 800, height: 450, },
                titleCss: "pl-5 pt-3 text-white text-xl font-medium text-opacity-90",
                overlayHtml: `
                    <div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <svg class="w-12 h-12 text-white transform hover:scale-105 hover:text-red-600 transition duration-150" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.821 52.821" xml:space="preserve"><path d="M51.82 19.074C50.332 13.73 46.855 8.91 42.212 5.885 37.292 2.68 30.86 1.717 25.106 1.588 17.071 1.404 6.893 4.49 2.94 12.152c-.329.637.64 1.184.969.547C6.71 7.269 13.4 4.133 19.172 3.105c6.209-1.104 12.998-.236 18.873 1.955 6.134 2.287 10.393 7.537 12.486 13.611 2.33 6.758 1.04 13.488-2.679 19.424C40.174 50.347 21.33 54.324 9.87 45.038c-5.25-4.254-8.674-9.945-8.74-16.752-.039-4.012.743-8.492 2.746-12.012.621-1.09 1.455-2.024 2.396-2.867.014-.219.03-.436.045-.652a1.28 1.28 0 0 1-.25-.475c-.005-.021-.004-.037-.009-.059-.572.481-1.126.986-1.65 1.529-2.291 2.371-3.194 5.66-3.832 8.801-1.268 6.24-.515 12.074 3.063 17.346 3.063 4.514 7.787 8.715 13.131 10.182 6.42 1.762 13.123 1.613 19.198-1.108 2.749-1.23 5.729-2.438 8.039-4.424 2.833-2.438 4.961-5.881 6.679-9.156 2.619-4.992 2.617-10.994 1.134-16.317z"/><path d="M17.736 31.85c.103 1.15.121 3.08 1.325 3.598a.923.923 0 0 0 .167.174c1.198.902 2.868-.504 3.876-1.109 2.797-1.674 12.586-8.037 14.039-10.277a.469.469 0 0 0-.046-.609.523.523 0 0 0-.258-.428c-1.622-.992-8.87-4.297-10.89-5.045-1.044-.389-5.593-2.34-6.212-2.355-2.373-1.525-2.021 5.525-2.033 6.152-.065 3.284-.26 6.623.032 9.899zm3.224-6.817a.518.518 0 0 0-.217.182c-.004-.299-.009-.596-.011-.891.096.055.197.104.298.154-.021.182-.046.368-.07.555zm.207 4.662c.063-.248.151-.498.257-.748 1.583-.371 3.088-1.146 4.634-1.645.754-.207 1.509-.414 2.259-.633-2.336 1.095-4.722 2.071-7.15 3.026zm3.42-3.933c-.18.082-.362.162-.539.25a3.529 3.529 0 0 0-.483-.244c.34-.01.681-.014 1.022-.006zm-.479-1.477c.023-.014.048-.025.074-.037a9.92 9.92 0 0 0 1.944.24c.459.055.918.113 1.378.166-.044.016-.088.029-.133.045-.97-.101-2.141-.211-3.263-.414zm4.766-1.179a65.658 65.658 0 0 1-2.291-.854c-1.265-.502-2.525-.859-3.846-1.17a3.048 3.048 0 0 1-1.052-.465c2.49.391 4.886 1.354 7.189 2.489zm-5.978-.848a23.189 23.189 0 0 0-2.278-.105c-.026-.297-.056-.592-.085-.889.748.521 1.527.783 2.363.994z"/></svg>
                    </div>
                `,
              },
            ]
          ]
        }
      }
    }
  ]
}
```

## Usage in markdown

The markdown must consist of all the possible attributes (youtube, title, image, alt & placement), and you must enclose the markdown in backticks (\`). 

Format:
```markdown
`youtube [YOUTUBE_VIDEO_LINK] title [TITLE_TEXT] image [THUMBNAIL_LINK] alt [ALT_TEXT] placement [Left|Center|Right]`
```

Examples:

```markdown
`youtube https://www.youtube.com/watch?v=Dry4P_hg-Ws title image https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg alt Watch marine biologist plays subnautica on YouTube placement Center end\`

or

`youtube https://www.youtube.com/watch?v=Dry4P_hg-Ws title Marine biologist plays SUBNAUTICA BELOW ZERO image https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg alt Watch marine biologist plays subnautica on YouTube placement Center end\`

```

## Output

### Youtube placeholder

This is how the placeholder should appear on the screen (obviously without the white border):

<a href="https://www.youtube.com/watch?v=Dry4P_hg-Ws" target="_blank">
  <img src="Thumbnail example.gif" role="presentation" alt="">
</a>

### Generated HTML

```html
<div class="w-full flex justify-start"> <!-- whatever css you've provided in alignment options. -->

  <a style="position: relative;" href="https://www.youtube.com/watch?v=Dry4P_hg-Ws" target="_blank">
    <span style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px); width: 1px !important; height: 1px !important; padding: 0 !important; border: 0 !important; overflow: hidden; white-space: nowrap;">Go to youtube and watch video</span>

    <img src="https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg" style="margin-top: 0 !important; margin-bottom: 0 !important;" class="shadow-md" width="800" height="450" role="presentation" alt=""> <!-- class = whatever css you've provided via the imageCss option. -->

    <div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"> <!-- whatever html you've provided via the overlayHtml option. -->
      <svg class="w-12 h-12 text-white transform hover:scale-105 hover:text-red-600 transition duration-150" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.821 52.821" xml:space="preserve"><path d="M51.82 19.074C50.332 13.73 46.855 8.91 42.212 5.885 37.292 2.68 30.86 1.717 25.106 1.588 17.071 1.404 6.893 4.49 2.94 12.152c-.329.637.64 1.184.969.547C6.71 7.269 13.4 4.133 19.172 3.105c6.209-1.104 12.998-.236 18.873 1.955 6.134 2.287 10.393 7.537 12.486 13.611 2.33 6.758 1.04 13.488-2.679 19.424C40.174 50.347 21.33 54.324 9.87 45.038c-5.25-4.254-8.674-9.945-8.74-16.752-.039-4.012.743-8.492 2.746-12.012.621-1.09 1.455-2.024 2.396-2.867.014-.219.03-.436.045-.652a1.28 1.28 0 0 1-.25-.475c-.005-.021-.004-.037-.009-.059-.572.481-1.126.986-1.65 1.529-2.291 2.371-3.194 5.66-3.832 8.801-1.268 6.24-.515 12.074 3.063 17.346 3.063 4.514 7.787 8.715 13.131 10.182 6.42 1.762 13.123 1.613 19.198-1.108 2.749-1.23 5.729-2.438 8.039-4.424 2.833-2.438 4.961-5.881 6.679-9.156 2.619-4.992 2.617-10.994 1.134-16.317z"></path><path d="M17.736 31.85c.103 1.15.121 3.08 1.325 3.598a.923.923 0 0 0 .167.174c1.198.902 2.868-.504 3.876-1.109 2.797-1.674 12.586-8.037 14.039-10.277a.469.469 0 0 0-.046-.609.523.523 0 0 0-.258-.428c-1.622-.992-8.87-4.297-10.89-5.045-1.044-.389-5.593-2.34-6.212-2.355-2.373-1.525-2.021 5.525-2.033 6.152-.065 3.284-.26 6.623.032 9.899zm3.224-6.817a.518.518 0 0 0-.217.182c-.004-.299-.009-.596-.011-.891.096.055.197.104.298.154-.021.182-.046.368-.07.555zm.207 4.662c.063-.248.151-.498.257-.748 1.583-.371 3.088-1.146 4.634-1.645.754-.207 1.509-.414 2.259-.633-2.336 1.095-4.722 2.071-7.15 3.026zm3.42-3.933c-.18.082-.362.162-.539.25a3.529 3.529 0 0 0-.483-.244c.34-.01.681-.014 1.022-.006zm-.479-1.477c.023-.014.048-.025.074-.037a9.92 9.92 0 0 0 1.944.24c.459.055.918.113 1.378.166-.044.016-.088.029-.133.045-.97-.101-2.141-.211-3.263-.414zm4.766-1.179a65.658 65.658 0 0 1-2.291-.854c-1.265-.502-2.525-.859-3.846-1.17a3.048 3.048 0 0 1-1.052-.465c2.49.391 4.886 1.354 7.189 2.489zm-5.978-.848a23.189 23.189 0 0 0-2.278-.105c-.026-.297-.056-.592-.085-.889.748.521 1.527.783 2.363.994z"></path></svg>
    </div>

    <div style="position: absolute; top: 0; left: 0; right: 0;">
      <p class="pl-5 pt-3 text-white text-xl font-medium text-opacity-90" style="margin-top: 0 !important; margin-bottom: 0 !important;"> <!-- class = whatever css you've provided via the titleCss option. -->
        Marine biologist plays SUBNAUTICA BELOW ZERO
      </p>
    </div>

  </a>
</div>
```

### Errors
When the plugin detects errors, i.e. an incorrectly formatted youtube placeholder element, it will render a red fat error instead of a youtube placeholder.

<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> The markdown is not correctly formatted.</p>


## License

MIT
