const visit = require("unist-util-visit");

module.exports = (options) =>
{
	return tree =>
	{
		visit(tree, "inlineCode", node =>
		{
			if (node.value.startsWith("youtube"))
			{
				// Get groups from match.
				const groups = node.value.match(/youtube (.*?) title (.*?)image (.*?) alt (.*?) placement(.*?) end/);

				// When the markdown has been incorrectly formatted, render an error.
				if (groups == null)
				{
					node.type = "html";
					node.value = `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> The markdown is not correctly formatted.</p>`;
					return;
				}

				// Extract groups.
				const youtube = groups[1].trim();
				const title = groups[2].trim();
				const image = groups[3].trim();
				const alt = groups[4].trim();
				const placement  = groups[5].trim();

				// When a youtube video has not been provided, render an error.
				if (youtube == "undefined" || youtube.length == 0)
				{
					node.type = "html";
					node.value = `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> You must specify a YouTube video.</p>`;
					return;
				}

				// When an image has not been provided, render an error.
				if (image == "undefined" || image.length == 0)
				{
					node.type = "html";
					node.value = `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> You must specify an image.</p>`;
					return;
				}

				// When an alt has not been provided, render an error.
				if (alt == "undefined" || alt.length == 0)
				{
					node.type = "html";
					node.value = `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> You must specify a label for the link (e.g. Watch EM 2021 on YouTube).</p>`;
					return;
				}

				let alignmentCss = "", imageCss = "", titleCss = "", overlayHtml = "";
				let imageSize = { width: 0, height: 0, };
				let imageHtml = "";
				if (options != undefined)
				{
					// Figure out how to align the video.
					alignmentCss = options.cssClassToCenterPlaceholder;
					if (placement == "Left") alignmentCss = options.cssClassToLeftAlignPlaceholder;
					if (placement == "Right") alignmentCss = options.cssClassToRightAlignPlaceholder;
					if (alignmentCss == undefined) alignmentCss = "";

					// Figure out whether to apply css to image.
					imageCss = options.imageCss != undefined ? options.imageCss : "";

					// Figure out whether to apply css to image.
					if (options.imageSize != undefined)
					{
						imageSize = options.imageSize;
						imageHtml = `<img src="${image}" style="margin-top: 0 !important; margin-bottom: 0 !important; width: ${imageSize.width}px; height: ${imageSize.height}px;" class="${imageCss}" width="${imageSize.width}" height="${imageSize.height}" role="presentation" alt="">`;
					}
					else
						imageHtml = `<img src="${image}" style="margin-top: 0 !important; margin-bottom: 0 !important;" class="${imageCss}" role="presentation" alt="">`;

					// Figure out whether to apply css to title.
					if (options.titleCss !== undefined) titleCss = options.titleCss;

					// Figure out whether to show an overlay.
					if (options.overlayHtml !== undefined) overlayHtml = options.overlayHtml;
				}
				else
				{
					imageHtml = `<img src="${image}" style="margin-top: 0 !important; margin-bottom: 0 !important;" class="${imageCss}" role="presentation" alt="">`;
				}

				let titleHtml = "";
				if (title != "undefined" && title.length > 0)
					titleHtml = `<div style="position: absolute; top: 0; left: 0; right: 0;"><p class="${titleCss}" style="margin-top: 0 !important; margin-bottom: 0 !important;">${title}</p></div>`;

				// Update the node.
				node.type = "html";
				node.value = `<div class="${alignmentCss}"><a style="position: relative;" href="${youtube}" target="_blank"><span style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px); width: 1px !important; height: 1px !important; padding: 0 !important; border: 0 !important; overflow: hidden; white-space: nowrap;">${alt}</span>${imageHtml}${overlayHtml}${titleHtml}</a></div>`;
			}
		});
	};
};
