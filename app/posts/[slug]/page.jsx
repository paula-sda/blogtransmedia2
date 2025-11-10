import { getPostData } from '../lib/markdown';
import { postsData } from '../lib/postsData';

export async function generateStaticParams() {
  return [
    { slug: 'post1' },
    { slug: 'post2' },
    { slug: 'post3' }
  ];
}

export default async function PostPage({ params }) {
  console.log('=== DEBUG START ===');
  console.log('Params:', params);
  
  const slug = params?.slug;
  console.log('Slug:', slug);
  
  if (!slug) {
    return <div>Error: Slug no definido</div>;
  }

  // Prueba cargar el post
  console.log('Intentando cargar post:', slug);
  const post = getPostData(slug);
  console.log('Post cargado:', post);
  
  if (!post) {
    return (
      <div>
        <h1>Post no encontrado: {slug}</h1>
        <p>El post no existe o hay un error al cargarlo.</p>
      </div>
    );
  }

  console.log('Post data:', post);
  console.log('=== DEBUG END ===');

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  );
}