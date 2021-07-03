const visit = require("unist-util-visit");

module.exports = (options) =>
{
	function extractGroups(line)
	{
		const match = line.match(/youtube (.*?) title (.*?)image (.*?) alt (.*?) placement(.*?) end/);
		if (match == null) return { youtube: null, title: null, image: null, alt: null, placement: null, };

		const youtube = match[1].trim();
		const title = match[2].trim();
		const image = match[3].trim();
		const alt = match[4].trim();
		const placement  = match[5].trim();

		return { youtube, title, image, alt, placement, };
	}

	function attributesAreValid(youtube, image, alt, node)
	{
		// When a youtube video has not been provided, render an error.
		if (youtube == "undefined" || youtube.length == 0)
		{
			node.type = "html";
			node.value = `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> You must specify a YouTube video.</p>`;
			return false;
		}

		// When an image has not been provided, render an error.
		if (image == "undefined" || image.length == 0)
		{
			node.type = "html";
			node.value = `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> You must specify an image.</p>`;
			return false;
		}

		// When an alt has not been provided, render an error.
		if (alt == "undefined" || alt.length == 0)
		{
			node.type = "html";
			node.value = `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> You must specify a label for the link (e.g. Watch EM 2021 on YouTube).</p>`;
			return false;
		}

		return true;
	}

	return tree =>
	{
		visit(tree, "inlineCode", node =>
		{
			if (node.value.startsWith("youtube"))
			{
				// Get matches.
				const matches = node.value.match(/youtube (.*?) title (.*?)image (.*?) alt (.*?) placement(.*?) end/g);

				// When the markdown has been incorrectly formatted, render an error.
				if (matches == null)
				{
					node.type = "html";
					node.value = `<p><span style="color: red; font-weight: bold;">remark-youtube-placeholder Error:</span> The markdown is not correctly formatted.</p>`;
					return;
				}
				
				// Figure out how to align the placeholder/s.
				// Regardless of whether there is more than one placeholder, grab the first placement value.
				const placement = extractGroups(matches[0]).placement;

				let alignmentCss = "", imageCss = "", titleCss = "", overlayHtml = "";
				let imageSize = { width: 0, height: 0, };
				let imageHtml = "";
				let layoutCss = "";
				if (options != undefined)
				{
					// Figure out how to align the video.
					alignmentCss = options.cssClassToCenterPlaceholder;
					if (placement == "Left") alignmentCss = options.cssClassToLeftAlignPlaceholder;
					if (placement == "Right") alignmentCss = options.cssClassToRightAlignPlaceholder;
					if (alignmentCss == undefined) alignmentCss = "";

					// Figure out whether to apply css to image.
					imageCss = options.imageCss != undefined ? options.imageCss : "";

					// Figure out whether to apply css to title.
					titleCss = options.titleCss != undefined ? options.titleCss : "";

					// Figure out whether to show an overlay.
					overlayHtml = options.overlayHtml != undefined ? options.overlayHtml : "";

					layoutCss = layoutCss != undefined ? options.layoutCss : "";
				}

				let youtubeHTML = "";
				if (matches.length > 1) youtubeHTML += `<div class="${layoutCss}">`;
				for(const line of matches)
				{
					const { youtube, title, image, alt, } = extractGroups(line);
					if (!attributesAreValid(youtube, image, alt, node)) return;

					if (options != undefined)
					{
						// Figure out whether to apply css to image.
						if (options.imageSize != undefined)
						{
							imageSize = options.imageSize;
							imageHtml = `<img src="${image}" style="margin-top: 0 !important; margin-bottom: 0 !important; width: ${imageSize.width}px; height: ${imageSize.height}px;" class="${imageCss}" width="${imageSize.width}" height="${imageSize.height}" role="presentation" alt="">`;
						}
						else
							imageHtml = `<img src="${image}" style="margin-top: 0 !important; margin-bottom: 0 !important;" class="${imageCss}" role="presentation" alt="">`;
					}
					else
					{
						imageHtml = `<img src="${image}" style="margin-top: 0 !important; margin-bottom: 0 !important;" class="${imageCss}" role="presentation" alt="">`;
					}

					let titleHtml = "";
					if (title != null && title != "undefined" && title.length > 0)
						titleHtml = `<div style="position: absolute; top: 0; left: 0; right: 0;"><p class="${titleCss}" style="margin-top: 0 !important; margin-bottom: 0 !important;">${title}</p></div>`;

					youtubeHTML += `<a style="position: relative;" href="${youtube}" target="_blank"><span style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px); width: 1px !important; height: 1px !important; padding: 0 !important; border: 0 !important; overflow: hidden; white-space: nowrap;">${alt}</span>${imageHtml}${overlayHtml}${titleHtml}</a>`;
				}
				if (matches.length > 1) youtubeHTML += `</div>`;

				// Update the node.
				node.type = "html";
				node.value = `<div class="${alignmentCss}">${youtubeHTML}</div>`;
			}
		});
	};
};
