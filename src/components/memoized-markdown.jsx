import { marked } from 'marked';
import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

const MemoizedMarkdownBlock = memo(({ content }) => (
    <ReactMarkdown>{content}</ReactMarkdown>
));

export const MemoizedMarkdown = memo(({ content, id }) => {
    const blocks = useMemo(() => marked.lexer(content).map(token => token.raw), [content]);

    return blocks.map((block, index) => (
        <MemoizedMarkdownBlock key={`${id}-block_${index}`} content={block} />
    ));
});
