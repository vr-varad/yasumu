'use client';

import { useMounted } from '@/hooks/use-mounted';
import { Yasumu } from '@/lib/yasumu';
import { useGraphqlStore } from '@/stores/graphql/graphql.store';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.css';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { Input } from '../ui/input';

export function GraphQLEditor() {
  const { url, setUrl, query, setQuery } = useGraphqlStore();
  const { theme } = useTheme();
  const mounted = useMounted();

  const fetcher = useMemo(() => {
    return async (params: unknown) => {
      if (!url) throw new Error('No URL provided');

      const res = await Yasumu.fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(params),
        credentials: 'same-origin',
      });

      return res.json();
    };
  }, [url]);

  if (!mounted) return null;

  return (
    <div className="pl-4 space-y-4">
      <Input value={url} onChange={(v) => setUrl(v.target.value)} />
      <GraphiQL
        fetcher={fetcher}
        forcedTheme={theme as 'light'}
        isHeadersEditorEnabled
        query={query || ''}
        onEditQuery={(value) => setQuery(value)}
        disableTabs
        className="min-h-[calc(100vh-6rem)] border rounded-sm"
      />
    </div>
  );
}
