// Import remark to parse markdown.
const remark = require("remark");

// Import our plugin.
const plugin = require("./index");

// Setup shared data.
const processorWithCss = remark().use(plugin, {
    cssClassToCenterPlaceholder: "w-full flex justify-center mb-6",
    cssClassToLeftAlignPlaceholder: "w-full flex justify-start mb-6",
    cssClassToRightAlignPlaceholder: "w-full flex justify-end mb-6",
    imageCss: "shadow-md",
    imageSize: { width: 800, height: 450, },
    titleCss: "pl-5 pt-3 text-white text-xl font-medium text-opacity-90",
    overlayHtml: `<div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"><svg class="w-12 h-12 text-white transform hover:scale-105 hover:text-red-600 transition duration-150" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.821 52.821" xml:space="preserve"><path d="M51.82 19.074C50.332 13.73 46.855 8.91 42.212 5.885 37.292 2.68 30.86 1.717 25.106 1.588 17.071 1.404 6.893 4.49 2.94 12.152c-.329.637.64 1.184.969.547C6.71 7.269 13.4 4.133 19.172 3.105c6.209-1.104 12.998-.236 18.873 1.955 6.134 2.287 10.393 7.537 12.486 13.611 2.33 6.758 1.04 13.488-2.679 19.424C40.174 50.347 21.33 54.324 9.87 45.038c-5.25-4.254-8.674-9.945-8.74-16.752-.039-4.012.743-8.492 2.746-12.012.621-1.09 1.455-2.024 2.396-2.867.014-.219.03-.436.045-.652a1.28 1.28 0 0 1-.25-.475c-.005-.021-.004-.037-.009-.059-.572.481-1.126.986-1.65 1.529-2.291 2.371-3.194 5.66-3.832 8.801-1.268 6.24-.515 12.074 3.063 17.346 3.063 4.514 7.787 8.715 13.131 10.182 6.42 1.762 13.123 1.613 19.198-1.108 2.749-1.23 5.729-2.438 8.039-4.424 2.833-2.438 4.961-5.881 6.679-9.156 2.619-4.992 2.617-10.994 1.134-16.317z"></path><path d="M17.736 31.85c.103 1.15.121 3.08 1.325 3.598a.923.923 0 0 0 .167.174c1.198.902 2.868-.504 3.876-1.109 2.797-1.674 12.586-8.037 14.039-10.277a.469.469 0 0 0-.046-.609.523.523 0 0 0-.258-.428c-1.622-.992-8.87-4.297-10.89-5.045-1.044-.389-5.593-2.34-6.212-2.355-2.373-1.525-2.021 5.525-2.033 6.152-.065 3.284-.26 6.623.032 9.899zm3.224-6.817a.518.518 0 0 0-.217.182c-.004-.299-.009-.596-.011-.891.096.055.197.104.298.154-.021.182-.046.368-.07.555zm.207 4.662c.063-.248.151-.498.257-.748 1.583-.371 3.088-1.146 4.634-1.645.754-.207 1.509-.414 2.259-.633-2.336 1.095-4.722 2.071-7.15 3.026zm3.42-3.933c-.18.082-.362.162-.539.25a3.529 3.529 0 0 0-.483-.244c.34-.01.681-.014 1.022-.006zm-.479-1.477c.023-.014.048-.025.074-.037a9.92 9.92 0 0 0 1.944.24c.459.055.918.113 1.378.166-.044.016-.088.029-.133.045-.97-.101-2.141-.211-3.263-.414zm4.766-1.179a65.658 65.658 0 0 1-2.291-.854c-1.265-.502-2.525-.859-3.846-1.17a3.048 3.048 0 0 1-1.052-.465c2.49.391 4.886 1.354 7.189 2.489zm-5.978-.848a23.189 23.189 0 0 0-2.278-.105c-.026-.297-.056-.592-.085-.889.748.521 1.527.783 2.363.994z"></path></svg></div>`,
});

const processorWithoutCss = remark().use(plugin);

const base = [
    "to-replace",
    "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    "It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC.",
    "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
    "",
].join("\n");

// Tests.
test("error is rendered, when markdown is incorrectly formatted", () =>
{
    let inputString = base.replace("to-replace", "\`youtube https://www.youtube.com/watch?v=Dry4P_hg-Ws image https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg alt Watch marine biologist plays subnautica on YouTube placement Center end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> The markdown is not correctly formatted.</p>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("error is rendered, when youtube video isn't specified", () =>
{
    let inputString = base.replace("to-replace", "\`youtube  title image https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg alt Watch marine biologist plays subnautica on YouTube placement Center end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> You must specify a YouTube video.</p>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("error is rendered, when youtube video is undefined", () =>
{
    let inputString = base.replace("to-replace", "\`youtube undefined title image https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg alt Watch marine biologist plays subnautica on YouTube placement Center end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> You must specify a YouTube video.</p>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("error is rendered, when image isn't specified", () =>
{
    let inputString = base.replace("to-replace", "\`youtube https://www.youtube.com/watch?v=Dry4P_hg-Ws title image  alt Watch marine biologist plays subnautica on YouTube placement Center end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> You must specify an image.</p>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("error is rendered, when image is undefined", () =>
{
    let inputString = base.replace("to-replace", "\`youtube https://www.youtube.com/watch?v=Dry4P_hg-Ws title image undefined alt Watch marine biologist plays subnautica on YouTube placement Center end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> You must specify an image.</p>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("error is rendered, when alt isn't specified", () =>
{
    let inputString = base.replace("to-replace", "\`youtube https://www.youtube.com/watch?v=Dry4P_hg-Ws title image https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg alt  placement Center end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> You must specify a label for the link (e.g. Watch EM 2021 on YouTube).</p>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("error is rendered, when alt is undefined", () =>
{
    let inputString = base.replace("to-replace", "\`youtube https://www.youtube.com/watch?v=Dry4P_hg-Ws title image https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg alt undefined placement Center end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> You must specify a label for the link (e.g. Watch EM 2021 on YouTube).</p>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("css classes are applied, when the css options have been provided", () =>
{
    let inputString = base.replace("to-replace", "\`youtube https://www.youtube.com/watch?v=Dry4P_hg-Ws title image https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg alt Watch marine biologist plays subnautica on YouTube placement Left end\`");
    let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-start mb-6"><a style="position: relative;" href="https://www.youtube.com/watch?v=Dry4P_hg-Ws" target="_blank"><span style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px); width: 1px !important; height: 1px !important; padding: 0 !important; border: 0 !important; overflow: hidden; white-space: nowrap;">Watch marine biologist plays subnautica on YouTube</span><img src="https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg" style="margin-top: 0 !important; margin-bottom: 0 !important;" class="shadow-md" width="800" height="450" role="presentation" alt=""><div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"><svg class="w-12 h-12 text-white transform hover:scale-105 hover:text-red-600 transition duration-150" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.821 52.821" xml:space="preserve"><path d="M51.82 19.074C50.332 13.73 46.855 8.91 42.212 5.885 37.292 2.68 30.86 1.717 25.106 1.588 17.071 1.404 6.893 4.49 2.94 12.152c-.329.637.64 1.184.969.547C6.71 7.269 13.4 4.133 19.172 3.105c6.209-1.104 12.998-.236 18.873 1.955 6.134 2.287 10.393 7.537 12.486 13.611 2.33 6.758 1.04 13.488-2.679 19.424C40.174 50.347 21.33 54.324 9.87 45.038c-5.25-4.254-8.674-9.945-8.74-16.752-.039-4.012.743-8.492 2.746-12.012.621-1.09 1.455-2.024 2.396-2.867.014-.219.03-.436.045-.652a1.28 1.28 0 0 1-.25-.475c-.005-.021-.004-.037-.009-.059-.572.481-1.126.986-1.65 1.529-2.291 2.371-3.194 5.66-3.832 8.801-1.268 6.24-.515 12.074 3.063 17.346 3.063 4.514 7.787 8.715 13.131 10.182 6.42 1.762 13.123 1.613 19.198-1.108 2.749-1.23 5.729-2.438 8.039-4.424 2.833-2.438 4.961-5.881 6.679-9.156 2.619-4.992 2.617-10.994 1.134-16.317z"></path><path d="M17.736 31.85c.103 1.15.121 3.08 1.325 3.598a.923.923 0 0 0 .167.174c1.198.902 2.868-.504 3.876-1.109 2.797-1.674 12.586-8.037 14.039-10.277a.469.469 0 0 0-.046-.609.523.523 0 0 0-.258-.428c-1.622-.992-8.87-4.297-10.89-5.045-1.044-.389-5.593-2.34-6.212-2.355-2.373-1.525-2.021 5.525-2.033 6.152-.065 3.284-.26 6.623.032 9.899zm3.224-6.817a.518.518 0 0 0-.217.182c-.004-.299-.009-.596-.011-.891.096.055.197.104.298.154-.021.182-.046.368-.07.555zm.207 4.662c.063-.248.151-.498.257-.748 1.583-.371 3.088-1.146 4.634-1.645.754-.207 1.509-.414 2.259-.633-2.336 1.095-4.722 2.071-7.15 3.026zm3.42-3.933c-.18.082-.362.162-.539.25a3.529 3.529 0 0 0-.483-.244c.34-.01.681-.014 1.022-.006zm-.479-1.477c.023-.014.048-.025.074-.037a9.92 9.92 0 0 0 1.944.24c.459.055.918.113 1.378.166-.044.016-.088.029-.133.045-.97-.101-2.141-.211-3.263-.414zm4.766-1.179a65.658 65.658 0 0 1-2.291-.854c-1.265-.502-2.525-.859-3.846-1.17a3.048 3.048 0 0 1-1.052-.465c2.49.391 4.886 1.354 7.189 2.489zm-5.978-.848a23.189 23.189 0 0 0-2.278-.105c-.026-.297-.056-.592-.085-.889.748.521 1.527.783 2.363.994z"></path></svg></div></a></div>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("css classes aren't applied, when the css options haven't been provided", () =>
{
    let inputString = base.replace("to-replace", "\`youtube https://www.youtube.com/watch?v=Dry4P_hg-Ws title image https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg alt Watch marine biologist plays subnautica on YouTube placement Left end\`");
    let expectedResult = base.replace("to-replace", `<div class=""><a style="position: relative;" href="https://www.youtube.com/watch?v=Dry4P_hg-Ws" target="_blank"><span style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px); width: 1px !important; height: 1px !important; padding: 0 !important; border: 0 !important; overflow: hidden; white-space: nowrap;">Watch marine biologist plays subnautica on YouTube</span><img src="https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg" style="margin-top: 0 !important; margin-bottom: 0 !important;" class="" role="presentation" alt=""></a></div>`);

    const result = processorWithoutCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("placeholder is centered", () =>
{
    let inputString = base.replace("to-replace", "\`youtube https://www.youtube.com/watch?v=Dry4P_hg-Ws title image https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg alt Watch marine biologist plays subnautica on YouTube placement Center end\`");
    let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-center mb-6"><a style="position: relative;" href="https://www.youtube.com/watch?v=Dry4P_hg-Ws" target="_blank"><span style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px); width: 1px !important; height: 1px !important; padding: 0 !important; border: 0 !important; overflow: hidden; white-space: nowrap;">Watch marine biologist plays subnautica on YouTube</span><img src="https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg" style="margin-top: 0 !important; margin-bottom: 0 !important;" class="shadow-md" width="800" height="450" role="presentation" alt=""><div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"><svg class="w-12 h-12 text-white transform hover:scale-105 hover:text-red-600 transition duration-150" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.821 52.821" xml:space="preserve"><path d="M51.82 19.074C50.332 13.73 46.855 8.91 42.212 5.885 37.292 2.68 30.86 1.717 25.106 1.588 17.071 1.404 6.893 4.49 2.94 12.152c-.329.637.64 1.184.969.547C6.71 7.269 13.4 4.133 19.172 3.105c6.209-1.104 12.998-.236 18.873 1.955 6.134 2.287 10.393 7.537 12.486 13.611 2.33 6.758 1.04 13.488-2.679 19.424C40.174 50.347 21.33 54.324 9.87 45.038c-5.25-4.254-8.674-9.945-8.74-16.752-.039-4.012.743-8.492 2.746-12.012.621-1.09 1.455-2.024 2.396-2.867.014-.219.03-.436.045-.652a1.28 1.28 0 0 1-.25-.475c-.005-.021-.004-.037-.009-.059-.572.481-1.126.986-1.65 1.529-2.291 2.371-3.194 5.66-3.832 8.801-1.268 6.24-.515 12.074 3.063 17.346 3.063 4.514 7.787 8.715 13.131 10.182 6.42 1.762 13.123 1.613 19.198-1.108 2.749-1.23 5.729-2.438 8.039-4.424 2.833-2.438 4.961-5.881 6.679-9.156 2.619-4.992 2.617-10.994 1.134-16.317z"></path><path d="M17.736 31.85c.103 1.15.121 3.08 1.325 3.598a.923.923 0 0 0 .167.174c1.198.902 2.868-.504 3.876-1.109 2.797-1.674 12.586-8.037 14.039-10.277a.469.469 0 0 0-.046-.609.523.523 0 0 0-.258-.428c-1.622-.992-8.87-4.297-10.89-5.045-1.044-.389-5.593-2.34-6.212-2.355-2.373-1.525-2.021 5.525-2.033 6.152-.065 3.284-.26 6.623.032 9.899zm3.224-6.817a.518.518 0 0 0-.217.182c-.004-.299-.009-.596-.011-.891.096.055.197.104.298.154-.021.182-.046.368-.07.555zm.207 4.662c.063-.248.151-.498.257-.748 1.583-.371 3.088-1.146 4.634-1.645.754-.207 1.509-.414 2.259-.633-2.336 1.095-4.722 2.071-7.15 3.026zm3.42-3.933c-.18.082-.362.162-.539.25a3.529 3.529 0 0 0-.483-.244c.34-.01.681-.014 1.022-.006zm-.479-1.477c.023-.014.048-.025.074-.037a9.92 9.92 0 0 0 1.944.24c.459.055.918.113 1.378.166-.044.016-.088.029-.133.045-.97-.101-2.141-.211-3.263-.414zm4.766-1.179a65.658 65.658 0 0 1-2.291-.854c-1.265-.502-2.525-.859-3.846-1.17a3.048 3.048 0 0 1-1.052-.465c2.49.391 4.886 1.354 7.189 2.489zm-5.978-.848a23.189 23.189 0 0 0-2.278-.105c-.026-.297-.056-.592-.085-.889.748.521 1.527.783 2.363.994z"></path></svg></div></a></div>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("placeholder is left aligned", () =>
{
    let inputString = base.replace("to-replace", "\`youtube https://www.youtube.com/watch?v=Dry4P_hg-Ws title image https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg alt Watch marine biologist plays subnautica on YouTube placement Left end\`");
    let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-start mb-6"><a style="position: relative;" href="https://www.youtube.com/watch?v=Dry4P_hg-Ws" target="_blank"><span style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px); width: 1px !important; height: 1px !important; padding: 0 !important; border: 0 !important; overflow: hidden; white-space: nowrap;">Watch marine biologist plays subnautica on YouTube</span><img src="https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg" style="margin-top: 0 !important; margin-bottom: 0 !important;" class="shadow-md" width="800" height="450" role="presentation" alt=""><div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"><svg class="w-12 h-12 text-white transform hover:scale-105 hover:text-red-600 transition duration-150" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.821 52.821" xml:space="preserve"><path d="M51.82 19.074C50.332 13.73 46.855 8.91 42.212 5.885 37.292 2.68 30.86 1.717 25.106 1.588 17.071 1.404 6.893 4.49 2.94 12.152c-.329.637.64 1.184.969.547C6.71 7.269 13.4 4.133 19.172 3.105c6.209-1.104 12.998-.236 18.873 1.955 6.134 2.287 10.393 7.537 12.486 13.611 2.33 6.758 1.04 13.488-2.679 19.424C40.174 50.347 21.33 54.324 9.87 45.038c-5.25-4.254-8.674-9.945-8.74-16.752-.039-4.012.743-8.492 2.746-12.012.621-1.09 1.455-2.024 2.396-2.867.014-.219.03-.436.045-.652a1.28 1.28 0 0 1-.25-.475c-.005-.021-.004-.037-.009-.059-.572.481-1.126.986-1.65 1.529-2.291 2.371-3.194 5.66-3.832 8.801-1.268 6.24-.515 12.074 3.063 17.346 3.063 4.514 7.787 8.715 13.131 10.182 6.42 1.762 13.123 1.613 19.198-1.108 2.749-1.23 5.729-2.438 8.039-4.424 2.833-2.438 4.961-5.881 6.679-9.156 2.619-4.992 2.617-10.994 1.134-16.317z"></path><path d="M17.736 31.85c.103 1.15.121 3.08 1.325 3.598a.923.923 0 0 0 .167.174c1.198.902 2.868-.504 3.876-1.109 2.797-1.674 12.586-8.037 14.039-10.277a.469.469 0 0 0-.046-.609.523.523 0 0 0-.258-.428c-1.622-.992-8.87-4.297-10.89-5.045-1.044-.389-5.593-2.34-6.212-2.355-2.373-1.525-2.021 5.525-2.033 6.152-.065 3.284-.26 6.623.032 9.899zm3.224-6.817a.518.518 0 0 0-.217.182c-.004-.299-.009-.596-.011-.891.096.055.197.104.298.154-.021.182-.046.368-.07.555zm.207 4.662c.063-.248.151-.498.257-.748 1.583-.371 3.088-1.146 4.634-1.645.754-.207 1.509-.414 2.259-.633-2.336 1.095-4.722 2.071-7.15 3.026zm3.42-3.933c-.18.082-.362.162-.539.25a3.529 3.529 0 0 0-.483-.244c.34-.01.681-.014 1.022-.006zm-.479-1.477c.023-.014.048-.025.074-.037a9.92 9.92 0 0 0 1.944.24c.459.055.918.113 1.378.166-.044.016-.088.029-.133.045-.97-.101-2.141-.211-3.263-.414zm4.766-1.179a65.658 65.658 0 0 1-2.291-.854c-1.265-.502-2.525-.859-3.846-1.17a3.048 3.048 0 0 1-1.052-.465c2.49.391 4.886 1.354 7.189 2.489zm-5.978-.848a23.189 23.189 0 0 0-2.278-.105c-.026-.297-.056-.592-.085-.889.748.521 1.527.783 2.363.994z"></path></svg></div></a></div>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("placeholder is right aligned", () =>
{
    let inputString = base.replace("to-replace", "\`youtube https://www.youtube.com/watch?v=Dry4P_hg-Ws title image https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg alt Watch marine biologist plays subnautica on YouTube placement Right end\`");
    let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-end mb-6"><a style="position: relative;" href="https://www.youtube.com/watch?v=Dry4P_hg-Ws" target="_blank"><span style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px); width: 1px !important; height: 1px !important; padding: 0 !important; border: 0 !important; overflow: hidden; white-space: nowrap;">Watch marine biologist plays subnautica on YouTube</span><img src="https://i.ytimg.com/vi/Dry4P_hg-Ws/maxresdefault.jpg" style="margin-top: 0 !important; margin-bottom: 0 !important;" class="shadow-md" width="800" height="450" role="presentation" alt=""><div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"><svg class="w-12 h-12 text-white transform hover:scale-105 hover:text-red-600 transition duration-150" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.821 52.821" xml:space="preserve"><path d="M51.82 19.074C50.332 13.73 46.855 8.91 42.212 5.885 37.292 2.68 30.86 1.717 25.106 1.588 17.071 1.404 6.893 4.49 2.94 12.152c-.329.637.64 1.184.969.547C6.71 7.269 13.4 4.133 19.172 3.105c6.209-1.104 12.998-.236 18.873 1.955 6.134 2.287 10.393 7.537 12.486 13.611 2.33 6.758 1.04 13.488-2.679 19.424C40.174 50.347 21.33 54.324 9.87 45.038c-5.25-4.254-8.674-9.945-8.74-16.752-.039-4.012.743-8.492 2.746-12.012.621-1.09 1.455-2.024 2.396-2.867.014-.219.03-.436.045-.652a1.28 1.28 0 0 1-.25-.475c-.005-.021-.004-.037-.009-.059-.572.481-1.126.986-1.65 1.529-2.291 2.371-3.194 5.66-3.832 8.801-1.268 6.24-.515 12.074 3.063 17.346 3.063 4.514 7.787 8.715 13.131 10.182 6.42 1.762 13.123 1.613 19.198-1.108 2.749-1.23 5.729-2.438 8.039-4.424 2.833-2.438 4.961-5.881 6.679-9.156 2.619-4.992 2.617-10.994 1.134-16.317z"></path><path d="M17.736 31.85c.103 1.15.121 3.08 1.325 3.598a.923.923 0 0 0 .167.174c1.198.902 2.868-.504 3.876-1.109 2.797-1.674 12.586-8.037 14.039-10.277a.469.469 0 0 0-.046-.609.523.523 0 0 0-.258-.428c-1.622-.992-8.87-4.297-10.89-5.045-1.044-.389-5.593-2.34-6.212-2.355-2.373-1.525-2.021 5.525-2.033 6.152-.065 3.284-.26 6.623.032 9.899zm3.224-6.817a.518.518 0 0 0-.217.182c-.004-.299-.009-.596-.011-.891.096.055.197.104.298.154-.021.182-.046.368-.07.555zm.207 4.662c.063-.248.151-.498.257-.748 1.583-.371 3.088-1.146 4.634-1.645.754-.207 1.509-.414 2.259-.633-2.336 1.095-4.722 2.071-7.15 3.026zm3.42-3.933c-.18.082-.362.162-.539.25a3.529 3.529 0 0 0-.483-.244c.34-.01.681-.014 1.022-.006zm-.479-1.477c.023-.014.048-.025.074-.037a9.92 9.92 0 0 0 1.944.24c.459.055.918.113 1.378.166-.044.016-.088.029-.133.045-.97-.101-2.141-.211-3.263-.414zm4.766-1.179a65.658 65.658 0 0 1-2.291-.854c-1.265-.502-2.525-.859-3.846-1.17a3.048 3.048 0 0 1-1.052-.465c2.49.391 4.886 1.354 7.189 2.489zm-5.978-.848a23.189 23.189 0 0 0-2.278-.105c-.026-.297-.056-.592-.085-.889.748.521 1.527.783 2.363.994z"></path></svg></div></a></div>`);

    const result = processorWithCss.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});
