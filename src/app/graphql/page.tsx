import { GraphQLEditor } from '@/components/graphql/graphql-editor';
import { AppView } from '@/components/layout/app-view';
import { Content } from '@/components/layout/content';

export default function Page() {
  return (
    <Content>
      <AppView tree={<h1>Files</h1>} editor={<GraphQLEditor />} lazy />
    </Content>
  );
}
