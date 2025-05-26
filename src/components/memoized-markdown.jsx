import { memo } from 'react';
import ReactMarkdown from 'react-markdown';

export const MemoizedMarkdown = memo(({ content, id }) => {
    if (!content) {
        return null;
    }

    return (
        <div className="markdown-content">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
});

MemoizedMarkdown.displayName = 'MemoizedMarkdown';
