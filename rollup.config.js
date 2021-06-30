import copy from "rollup-plugin-copy";

export default [
    {
        input: "index.js",
        external: ["unist-util-visit",],
        output: [
            { file: "dist/index.js", format: "cjs", },
            { file: "gridsome/index.js", format: "cjs", },
        ],
        plugins: [
            copy({
                targets: [
                    {
                        src: "README.md",
                        dest: "gridsome/",
                        transform: (contents) => contents.toString().replace("i remark-youtube-placeholder", "i gridsome-remark-youtube-placeholder")
                                                                    .replace("add remark-youtube-placeholder", "add gridsome-remark-youtube-placeholder"),
                    },
                ],
            }),
        ],
    },
];